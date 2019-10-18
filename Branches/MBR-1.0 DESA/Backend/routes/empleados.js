const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all empleados
router.get('/empleados/', (req, res) => {
  mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET A puestos
router.get('/empleados/:cod_empleado', (req, res) => {
  const { cod_empleado } = req.params; 
  mysqlConnection.query('SELECT * FROM empleados WHERE cod_empleado = ?', [cod_empleado], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE A puestos
router.delete('/empleados/:cod_empleado', (req, res) => {
  const { cod_empleado } = req.params; 
  mysqlConnection.query('DELETE from empleados WHERE cod_empleado = ?',[cod_empleado], (err, rows, fields) => {
    if (!err) {
      res.json('empleados eliminado');
    } else {
      console.log(err);
    }
  });
});


// INSERT A puestos
router.post('/empleados',   (req, res) => {
  mysqlConnection.query('INSERT INTO empleados SET ?', [req.body], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'empleados insertado'});
    } else {
      console.log(err);
    }
  });
 

});

//UPDATE A puestos
router.put('/empleados',(req, res) =>{
  mysqlConnection.query('UPDATE empleados SET `dpi_emp`= ?,`nombre_empleado`= ?,`correo_empleado`= ?,`usuario_empleado`= ?,`password_empleado`= ?,`id_puesto`= ? WHERE `cod_empleado`= ?', [req.body.dpi_emp,req.body.nombre_empleado,req.body.correo_empleado,req.body.usuario_empleado,req.body.password_empleado,req.body.id_puesto,req.body.cod_empleado], (err, rows, fields) =>{
    if(!err) {
      res.json({status: 'empleado actualizado'});
    } else {
      console.log(err);
    }
 });
});


module.exports = router;