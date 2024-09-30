const db = require('../config/db');

exports.obtenerGrupos = (req, res) => {
    console.log('Función obtenerGrupos llamada');
    db.query(`
        SELECT grupos.*, carreras.nombre AS carreraNombre
        FROM grupos
        JOIN carreras ON grupos.carrera_id = carreras.id
    `, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta', details: err.message });
        }
        console.log('Resultados de la consulta:', results);
        res.json(results);
    });
};

exports.crearGrupo = (req, res) => {
    console.log('Función crearGrupo llamada');
    const { nombre, periodo, carrera_id, profesor } = req.body;
    console.log('Datos recibidos:', { nombre, periodo, carrera_id, profesor });
    db.query('INSERT INTO grupos (nombre, periodo, carrera_id, profesor) VALUES (?, ?, ?, ?)', 
        [nombre, periodo, carrera_id, profesor], (err, result) => {
        if (err) {
            console.error('Error al crear grupo:', err);
            return res.status(500).json({ error: 'Error al crear grupo', details: err.message });
        }
        console.log('Grupo creado exitosamente');
        res.send('Grupo creado exitosamente');
    });
};