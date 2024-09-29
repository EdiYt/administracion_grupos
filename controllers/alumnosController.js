const db = require('../config/db');

// Obtener todos los alumnos
exports.obtenerAlumnos = (req, res) => {
    db.query('SELECT * FROM alumnos', (err, results) => {
        if (err) return res.status(500).send('Error al obtener alumnos');
        res.json(results);
    });
};

// Obtener un alumno por ID
exports.obtenerAlumnoPorId = (req, res) => {
    const alumnoId = req.params.id;
    db.query('SELECT * FROM alumnos WHERE id = ?', [alumnoId], (err, results) => {
        if (err) return res.status(500).send('Error al obtener alumno');
        if (results.length === 0) return res.status(404).send('Alumno no encontrado');
        res.json(results[0]);
    });
};

// Crear un alumno (ya existente)
exports.crearAlumno = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO alumnos (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) return res.status(500).send('Error al crear alumno');
        res.send('Alumno creado exitosamente');
    });
};

// Obtener calificaciones de un alumno (ya existente)
exports.obtenerCalificaciones = (req, res) => {
    const alumnoId = req.params.id;
    db.query(`
        SELECT calificaciones.*, grupos.nombre AS grupoNombre
        FROM calificaciones
        JOIN grupos ON calificaciones.grupo_id = grupos.id
        WHERE calificaciones.alumno_id = ?
    `, [alumnoId], (err, results) => {
        if (err) return res.status(500).send('Error al obtener calificaciones');
        res.json(results);
    });
};
