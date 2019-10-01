const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all departamentos
router.get('/departamentos/', (req, res) => {
  mysqlConnection.query('SELECT * FROM departamentos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET A departamentos
router.get('/departamentos/:id_depto', (req, res) => {
  const { id_depto } = req.params; 
  mysqlConnection.query('SELECT * FROM departamentos WHERE id_depto = ?', [id_depto], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE A departamentos
router.delete('/departamentos/:id_depto', (req, res) => {
  const { id_depto } = req.params; 
  console.log(id_depto);
  mysqlConnection.query('DELETE from departamentos WHERE id_depto = ?',[id_depto], (err, rows, fields) => {
    if (!err) {
      res.json('Departamento eliminado');
    } else {
      console.log(err);
    }
  });
});


// INSERT A departamentos
router.post('/departamentos',   (req=Request, res=Response) => {
  console.log(req.body);
  mysqlConnection.query('INSERT INTO departamentos SET ?', [req.body], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'departamento insertado'});
    } else {
      console.log(err);
    }
  });
 

});


router.put('/departamentos',(req, res) =>{
  console.log(req.body);
  console.log(req.params);
  mysqlConnection.query('UPDATE departamentos SET `nombre_depto`= ? WHERE `id_depto`= ?', [req.body.nombre_depto,req.body.id_depto], (err, rows, fields) =>{
    if(!err) {
      res.json({status: 'departamento actualizado'});
    } else {
      console.log(err);
    }
 });
});


module.exports = router;