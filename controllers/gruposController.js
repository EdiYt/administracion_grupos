const db = require('../config/db');

exports.obtenerGrupos = (req, res) => {
    db.query(`
        SELECT grupos.*, carreras.nombre AS carreraNombre
        FROM grupos
        JOIN carreras ON grupos.carrera_id = carreras.id
    `, (err, results) => {
        if (err) return res.status(500).send('Error en la consulta');
        res.json(results);
    });
};

exports.crearGrupo = (req, res) => {
    const { nombre, periodo, carrera_id, profesor } = req.body;
    db.query('INSERT INTO grupos (nombre, periodo, carrera_id, profesor) VALUES (?, ?, ?, ?)', 
        [nombre, periodo, carrera_id, profesor], (err, result) => {
        if (err) return res.status(500).send('Error al crear grupo');
        res.send('Grupo creado exitosamente');
    });
};
