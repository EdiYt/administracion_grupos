const db = require('../config/db');

// Registrar calificaciones para un alumno en un grupo
exports.registrarCalificaciones = (req, res) => {
    const { primerParcial, segundoParcial, tercerParcial } = req.body;
    const { grupoId, alumnoId } = req.params;

    db.query(`
        INSERT INTO calificaciones (alumno_id, grupo_id, primerParcial, segundoParcial, tercerParcial)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE primerParcial = ?, segundoParcial = ?, tercerParcial = ?
    `, 
    [alumnoId, grupoId, primerParcial, segundoParcial, tercerParcial, primerParcial, segundoParcial, tercerParcial], 
    (err, result) => {
        if (err) return res.status(500).send('Error al registrar calificaciones');
        res.send('Calificaciones registradas correctamente');
    });
};

// Obtener las calificaciones de un alumno
exports.obtenerCalificacionesPorAlumno = (req, res) => {
    const alumnoId = req.params.alumnoId;

    db.query(`
        SELECT calificaciones.*, grupos.nombre AS grupoNombre, grupos.periodo
        FROM calificaciones
        JOIN grupos ON calificaciones.grupo_id = grupos.id
        WHERE calificaciones.alumno_id = ?
    `, [alumnoId], (err, results) => {
        if (err) return res.status(500).send('Error al obtener calificaciones');
        res.json(results);
    });
};