const db = require('../config/db');

exports.obtenerGruposAsignados = (req, res) => {
    const profesor = req.params.nombre;
    db.query('SELECT * FROM grupos WHERE profesor = ?', [profesor], (err, results) => {
        if (err) return res.status(500).send('Error en la consulta');
        res.json(results);
    });
};

exports.actualizarCalificaciones = (req, res) => {
    const { primerParcial, segundoParcial, tercerParcial } = req.body;
    const { grupoId, alumnoId } = req.params;

    db.query(`
        UPDATE calificaciones
        SET primerParcial = ?, segundoParcial = ?, tercerParcial = ?
        WHERE grupo_id = ? AND alumno_id = ?
    `, [primerParcial, segundoParcial, tercerParcial, grupoId, alumnoId], (err, result) => {
        if (err) return res.status(500).send('Error al actualizar calificaciones');
        res.send('Calificaciones actualizadas exitosamente');
    });
};
