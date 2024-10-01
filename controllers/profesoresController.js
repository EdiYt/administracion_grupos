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
        SELECT DISTINCT a.id, a.nombre AS alumnoNombre, g.nombre AS grupoNombre
        FROM alumnos a
        JOIN grupo_alumnos ga ON a.id = ga.alumno_id
        JOIN grupos g ON ga.grupo_id = g.id
        WHERE g.profesor = ?
    `, [profesor], (err, results) => {
        if (err) {
            console.error('Error al obtener los alumnos del profesor:', err);
            return res.status(500).json({ error: 'Error al obtener los alumnos del profesor', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No se encontraron alumnos para este profesor' });
        }
        res.json(results);
    });
};


// Registrar calificaciones 
exports.registrarCalificaciones = (req, res) => {
    const { alumno_id, grupo_id, primerParcial, segundoParcial, tercerParcial } = req.body;

    db.query(
        'INSERT INTO calificaciones (alumno_id, grupo_id, primerParcial, segundoParcial, tercerParcial) VALUES (?, ?, ?, ?, ?)', 
        [alumno_id, grupo_id, primerParcial, segundoParcial, tercerParcial],
        (err, result) => {
            if (err) return res.status(500).send('Error al registrar calificaciones');
            res.send('Calificaciones registradas exitosamente');
        }
    );
};

// Actualizar calificaciones
exports.actualizarCalificaciones = (req, res) => {
    const { alumno_id, grupo_id, primerParcial, segundoParcial, tercerParcial } = req.body;

    db.query(
        'UPDATE calificaciones SET primerParcial = ?, segundoParcial = ?, tercerParcial = ? WHERE alumno_id = ? AND grupo_id = ?', 
        [primerParcial, segundoParcial, tercerParcial, alumno_id, grupo_id],
        (err, result) => {
            if (err) return res.status(500).send('Error al actualizar calificaciones');
            if (result.affectedRows === 0) return res.status(404).send('No se encontraron calificaciones para actualizar');
            res.send('Calificaciones actualizadas exitosamente');
        }
    );
};