const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/:nombre/grupos', profesoresController.obtenerGruposAsignados);
router.put('/grupos/:grupoId/alumnos/:alumnoId/calificaciones', profesoresController.actualizarCalificaciones);

module.exports = router;
