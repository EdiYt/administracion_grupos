const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/gruposController');

router.get('/', (req, res, next) => {
    console.log('GET /api/grupos/ accedido');
    gruposController.obtenerGrupos(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('POST /api/grupos/ accedido');
    gruposController.crearGrupo(req, res, next);
});

module.exports = router;