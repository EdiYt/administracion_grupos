const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/:nombre/grupos', profesoresController.obtenerGruposAsignados);
router.get('/:nombre/alumnos', profesoresController.obtenerAlumnosDeProfesor);
router.post('/calificaciones', profesoresController.registrarCalificaciones);
router.put('/calificaciones', profesoresController.actualizarCalificaciones);

module.exports = router;