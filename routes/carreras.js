const express = require('express');
const router = express.Router();
const carrerasController = require('../controllers/carrerasController');

router.get('/', carrerasController.obtenerCarreras);
router.post('/', carrerasController.crearCarrera);

module.exports = router;
