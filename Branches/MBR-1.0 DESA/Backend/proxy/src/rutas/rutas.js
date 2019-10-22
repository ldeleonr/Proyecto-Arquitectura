const express = require('express');
const router = express.Router();
const request = require('request-promise');
const options = require('../controllers/controller');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// Obtener todas las aplicaciones
router.get('/apps', (req, res) => {
    request(options('enterprise/runtime-app-definitions', 'GET'))
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

// Creo una instancia que contiene un formulario al inicio
router.get('/startAppWithForm/:id', (req, res) => {
    request(options(`enterprise/process-definitions?latest=true&appDefinitionId=${req.params.id}`, 'GET'))
        .then(result => {
            request(options(`enterprise/process-definitions/${result.data[0].id}/start-form`, 'GET'))
                .then(resultApp => {
                    res.json(resultApp);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// Creo una instancia que no contiene un formulario al inicio
router.get('/startAppWithoutForm/:id', (req, res) => {
    request(options(`enterprise/process-definitions?latest=true&appDefinitionId=${req.params.id}`, 'GET'))
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

// Obtener siguiente tarea
router.post('/next-task', (req, res) => {
    console.log(req.body);
    request(options('enterprise/tasks/query', 'POST', req.body))
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

// Enviar info a un proceso
router.post('/send-process', (req, res) => {
    request(options('enterprise/process-instances', 'POST', req.body))
        .then(result => {
            res.json({ result: 'ok' });
        })
        .catch(err => console.log(err));
});

// Enviar info a una tarea
router.post('/send-task/:id', (req, res) => {
    request(options(`enterprise/task-forms/${req.params.id}`, 'POST', req.body))
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

// subir archivo
router.post('/upload', multipartMiddleware, (req, res) => {
    console.log(req.files.file);
    request(options('enterprise/content/raw', 'POST', null, req.files.file))
        .then(result => {
            res.json(result);
        })
        .catch(err => console.log(err));
});

module.exports = router;
