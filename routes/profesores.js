const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/:nombre/grupos', profesoresController.obtenerGruposAsignados);

module.exports = router;