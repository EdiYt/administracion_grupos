const db = require('../config/db');

exports.obtenerAlumnos = (req, res, next) => {
    console.log('obtenerAlumnos function called');
    db.query('SELECT * FROM alumnos', (err, results) => {
    if (err) {
        console.error('Database query error:', err);
        return next(err);
    }
    console.log('Query results:', results);
    if (results.length === 0) {
        return res.status(404).json({ message: 'No hay alumnos registrados' });
    }
    res.json(results);
    });
};

exports.crearAlumno = (req, res) => {
    const { nombre } = req.body;

    // Primero verifica si el nombre del alumno ya existe
    db.query('SELECT * FROM alumnos WHERE nombre = ?', [nombre], (err, results) => {
        if (err) return res.status(500).send('Error al verificar el alumno');
        
        // Si existe un alumno con el mismo nombre
        if (results.length > 0) {
            return res.status(400).send('El alumno ya está registrado');
        }

        // Si no existe, insertar el nuevo alumno
        db.query('INSERT INTO alumnos (nombre) VALUES (?)', [nombre], (err, result) => {
            if (err) return res.status(500).send('Error al crear alumno');
            res.send('Alumno creado exitosamente');
        });
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
