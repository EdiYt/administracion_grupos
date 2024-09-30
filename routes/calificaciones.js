const express = require('express');
const router = express.Router();
const calificacionesController = require('../controllers/calificacionesController');

// Registrar calificaciones para un alumno en un grupo
router.post('/grupo/:grupoId/alumno/:alumnoId', calificacionesController.registrarCalificaciones);

// Obtener calificaciones de un alumno específico
router.get('/alumno/:alumnoId', calificacionesController.obtenerCalificacionesPorAlumno);

// Obtener calificaciones de todos los alumnos de un grupo
router.get('/grupo/:grupoId', calificacionesController.obtenerCalificacionesPorGrupo);

module.exports = router;
