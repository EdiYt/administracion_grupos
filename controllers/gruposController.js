const db = require('../config/db');
const axios = require('axios');

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

// Crear un grupo y obtener la lista de estudiantes desde la API de Oscar
exports.crearGrupo = async (req, res) => {
    const { nombre, periodo, carrera_id, profesor } = req.body;

    try {
        // Solicitud hacia la api
        const response = await axios.get('http://localhost:3001/usuario/obtenerEstudiantes/');
        const estudiantes = response.data;

        // Insertar el grupo en la base de datos
        db.query('INSERT INTO grupos (nombre, periodo, carrera_id, profesor) VALUES (?, ?, ?, ?)', 
            [nombre, periodo, carrera_id, profesor], (err, result) => {
            if (err) return res.status(500).send('Error al crear grupo');
            
            const grupoId = result.insertId;

            // Ahora asignar los estudiantes al grupo
            estudiantes.forEach((estudiante) => {
                db.query('INSERT INTO alumnos (nombre) VALUES (?)', [estudiante.nombre], (err, result) => {
                    if (err) {
                        console.error('Error al agregar alumno:', err);
                        return;
                    }

                    const alumnoId = result.insertId;
                    // Asignar el alumno al grupo
                    db.query('INSERT INTO calificaciones (alumno_id, grupo_id) VALUES (?, ?)', 
                        [alumnoId, grupoId], (err, result) => {
                        if (err) {
                            console.error('Error al asignar alumno al grupo:', err);
                        }
                    });
                });
            });

            res.send('Grupo creado exitosamente con estudiantes asignados');
        });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).send('Error al obtener estudiantes desde la API externa');
    }
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
