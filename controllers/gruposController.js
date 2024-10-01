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
    const { nombre, periodo, carrera_id, profesor, alumnos } = req.body;

    db.query('INSERT INTO grupos (nombre, periodo, carrera_id, profesor) VALUES (?, ?, ?, ?)', 
        [nombre, periodo, carrera_id, profesor], (err, result) => {
        if (err) return res.status(500).send('Error al crear grupo');

        const grupoId = result.insertId;

        // Inserta la lista de alumnos en el grupo
        const values = alumnos.map(alumnoId => [grupoId, alumnoId]);
        db.query('INSERT INTO grupo_alumnos (grupo_id, alumno_id) VALUES ?', [values], (err, result) => {
            if (err) return res.status(500).send('Error al asignar alumnos al grupo');
            res.send('Grupo creado y alumnos asignados exitosamente');
        });
    });
};

exports.obtenerAlumnosDeGrupo = (req, res) => {
    const grupoId = req.params.grupoId;

    db.query(`
        SELECT alumnos.nombre
        FROM grupo_alumnos
        JOIN alumnos ON grupo_alumnos.alumno_id = alumnos.id
        WHERE grupo_alumnos.grupo_id = ?
    `, [grupoId], (err, results) => {
        if (err) return res.status(500).send('Error al obtener alumnos del grupo');
        res.json(results);
    });
};
