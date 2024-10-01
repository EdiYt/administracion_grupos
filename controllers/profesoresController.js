const db = require('../config/db');

exports.obtenerGruposAsignados = (req, res) => {
    console.log('Función obtenerGruposAsignados llamada');
    const profesor = req.params.nombre;
    console.log('Nombre del profesor:', profesor);
    
    db.query('SELECT * FROM grupos WHERE profesor = ?', [profesor], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta', details: err.message });
        }
        console.log('Resultados de la consulta:', results);
        res.json(results);
    });
};

// Obtener alumnos de los grupos asignados a un profesor
exports.obtenerAlumnosDeProfesor = (req, res) => {
    const profesor = req.params.nombre;

    db.query(`
        SELECT grupos.nombre AS grupoNombre, alumnos.nombre AS alumnoNombre
        FROM grupos
        JOIN grupo_alumnos ON grupos.id = grupo_alumnos.grupo_id
        JOIN alumnos ON grupo_alumnos.alumno_id = alumnos.id
        WHERE grupos.profesor = ?
    `, [profesor], (err, results) => {
        if (err) return res.status(500).send('Error al obtener los alumnos del profesor');
        if (results.length === 0) return res.status(404).send('No se encontraron alumnos para este profesor');
        res.json(results);
    });
};