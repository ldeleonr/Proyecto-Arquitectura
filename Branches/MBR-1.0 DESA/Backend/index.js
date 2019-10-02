const express = require('express');
const morgan = require ('morgan');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({
  extended:true
}));
 app.use(morgan('dev'));

// Routes
app.use(require('./routes/departamentos.js'));
app.use(require('./routes/puestos.js'));
// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
