const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

router.get('/:id/calificaciones', alumnosController.obtenerCalificaciones);
router.post('/', alumnosController.crearAlumno);

module.exports = router;
