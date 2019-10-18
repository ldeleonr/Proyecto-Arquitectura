const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all puestos
router.get('/puestos/', (req, res) => {
  mysqlConnection.query('SELECT * FROM puestos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET A puestos
router.get('/puestos/:id_puesto', (req, res) => {
  const { id_puesto } = req.params; 
  mysqlConnection.query('SELECT * FROM puestos WHERE id_puesto = ?', [id_puesto], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE A puestos
router.delete('/puestos/:id_puesto', (req, res) => {
  const { id_puesto } = req.params; 
  mysqlConnection.query('DELETE from puestos WHERE id_puesto = ?',[id_puesto], (err, rows, fields) => {
    if (!err) {
      res.json('puesto eliminado');
    } else {
      console.log(err);
    }
  });
});


// INSERT A puestos
router.post('/puestos',   (req, res) => {
  mysqlConnection.query('INSERT INTO puestos SET ?', [req.body], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'puesto insertado'});
    } else {
      console.log(err);
    }
  });
 

});

//UPDATE A puestos
router.put('/puestos',(req, res) =>{
  mysqlConnection.query('UPDATE puestos SET `nom_puesto`= ?,`descripcion`= ?,`id_depto`= ? WHERE `id_puesto`= ?', [req.body.nom_puesto,req.body.descripcion,req.body.id_depto,req.body.id_puesto], (err, rows, fields) =>{
    if(!err) {
      res.json({status: 'puesto actualizado'});
    } else {
      console.log(err);
    }
 });
});


module.exports = router;