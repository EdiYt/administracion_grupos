const db = require('../config/db');

exports.crearAlumno = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO alumnos (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) return res.status(500).send('Error al crear alumno');
        res.send('Alumno creado exitosamente');
    });
};

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
