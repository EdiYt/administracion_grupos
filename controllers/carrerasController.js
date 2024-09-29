const db = require('../config/db');  // Asegúrate de que la ruta es correcta

exports.obtenerCarreras = (req, res) => {
    db.query('SELECT * FROM carreras', (err, results) => {
        if (err) return res.status(500).send('Error en la consulta');
        res.json(results);
    });
};

exports.crearCarrera = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO carreras (nombre) VALUES (?)', [nombre], (err, result) => {
        if (err) return res.status(500).send('Error al crear carrera');
        res.send('Carrera creada exitosamente');
    });
};
