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
    const { nombre, periodo, carrera_id, profesor } = req.body;

    // Verifica si el grupo ya existe
    db.query('SELECT * FROM grupos WHERE nombre = ?', [nombre], (err, results) => {
        if (err) return res.status(500).send('Error al verificar el grupo');

        if (results.length > 0) {
            return res.status(400).send('El grupo ya está registrado');
        }

        // Insertar grupo si no existe
        db.query('INSERT INTO grupos (nombre, periodo, carrera_id, profesor) VALUES (?, ?, ?, ?)', 
            [nombre, periodo, carrera_id, profesor], (err, result) => {
            if (err) return res.status(500).send('Error al crear grupo');
            res.send('Grupo creado exitosamente');
        });
    });
};
