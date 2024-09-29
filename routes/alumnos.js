const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

// Obtener todos los alumnos
router.get('/', alumnosController.obtenerAlumnos);

// Obtener un alumno por ID
router.get('/:id', alumnosController.obtenerAlumnoPorId);

// Crear un alumno
router.post('/', alumnosController.crearAlumno);

// Obtener calificaciones de un alumno
router.get('/:id/calificaciones', alumnosController.obtenerCalificaciones);

module.exports = router;
