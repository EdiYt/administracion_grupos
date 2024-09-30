const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

// Rutas para obtener todos los alumnos y crear uno
router.get('/', alumnosController.obtenerAlumnos); // Endpoint para obtener todos los alumnos
router.post('/', alumnosController.crearAlumno); // Endpoint para crear un nuevo alumno
router.get('/:id/calificaciones', alumnosController.obtenerCalificaciones); // Endpoint para obtener calificaciones de un alumno

router.get('/', (req, res, next) => {
    console.log('GET /api/alumnos/ route hit');
    alumnosController.obtenerAlumnos(req, res, next);
});

module.exports = router;
