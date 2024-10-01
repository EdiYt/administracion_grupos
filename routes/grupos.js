const express = require('express');
const router = express.Router();
const gruposController = require('../controllers/gruposController');

// Ruta para obtener todos los grupos
router.get('/', gruposController.obtenerGrupos);

// Ruta para crear un grupo con alumnos
router.post('/crearGrupo', gruposController.crearGrupo);

// Ruta para obtener alumnos de un grupo específico
router.get('/:grupoId/alumnos', gruposController.obtenerAlumnosDeGrupo);


module.exports = router;