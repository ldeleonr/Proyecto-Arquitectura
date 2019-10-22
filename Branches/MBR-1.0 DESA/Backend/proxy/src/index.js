const express = require('express');
const app = express();
const rutas = require('./rutas/rutas.js');
const cors = require('cors');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use('/ruta', rutas);

app.listen(3000, () => {
    console.log('Servidor arriba!');
})