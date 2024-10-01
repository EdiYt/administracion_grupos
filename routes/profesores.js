const express = require('express');
const router = express.Router();
const profesoresController = require('../controllers/profesoresController');

router.get('/:nombre/grupos', profesoresController.obtenerGruposAsignados);
router.get('/:nombre/alumnos', profesoresController.obtenerAlumnosDeProfesor);

module.exports = router;