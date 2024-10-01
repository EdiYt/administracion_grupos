const db = require('../config/db');
const axios = require('axios');

exports.obtenerGrupos = (req, res) => {
    db.query(`
        SELECT g.id AS grupoId, g.nombre AS grupoNombre, g.periodo, g.profesor, 
               c.nombre AS carreraNombre, 
               a.id AS alumnoId, a.nombre AS alumnoNombre
        FROM grupos g
        JOIN carreras c ON g.carrera_id = c.id
        LEFT JOIN grupo_alumnos ga ON g.id = ga.grupo_id
        LEFT JOIN alumnos a ON ga.alumno_id = a.id
    `, (err, results) => {
        if (err) {
            console.error('Error en la consulta de grupos y alumnos:', err);
            return res.status(500).send('Error en la consulta');
        }

        const grupos = {};

        results.forEach(row => {
            const { grupoId, grupoNombre, periodo, profesor, carreraNombre, alumnoId, alumnoNombre } = row;

            if (!grupos[grupoId]) {
                grupos[grupoId] = {
                    id: grupoId,
                    nombre: grupoNombre,
                    periodo,
                    profesor,
                    carrera: carreraNombre,
                    alumnos: []
                };
            }

            if (alumnoId) {
                grupos[grupoId].alumnos.push({
                    id: alumnoId,
                    nombre: alumnoNombre
                });
            }
        });

        const gruposArray = Object.values(grupos);

        res.json(gruposArray);
    });
};

exports.crearGrupo = (req, res) => {
    const { nombre, periodo, carrera_id, profesor } = req.body;

    axios.get('http://localhost:3001/usuario/obtenerEstudiantes/')
        .then(response => {
            const estudiantes = response.data;

            db.query('INSERT INTO grupos (nombre, periodo, carrera_id, profesor) VALUES (?, ?, ?, ?)', 
                [nombre, periodo, carrera_id, profesor], (err, result) => {
                if (err) {
                    return res.status(500).send('Error al crear grupo');
                }

                const grupoId = result.insertId; 

                estudiantes.forEach((estudiante) => {
                    db.query('INSERT INTO alumnos (nombre) VALUES (?)', [estudiante.nombre], (err, result) => {
                        if (err) {
                            console.error('Error al agregar alumno:', err);
                            return;
                        }

                        const alumnoId = result.insertId; 

                        db.query('INSERT INTO grupo_alumnos (grupo_id, alumno_id) VALUES (?, ?)', 
                            [grupoId, alumnoId], (err) => {
                            if (err) {
                                console.error('Error al asignar alumno al grupo:', err);
                                return;
                            }
                        });
                    });
                });

                res.send('Grupo creado exitosamente con estudiantes asignados');
            });
        })
        .catch(error => {
            console.error('Error al obtener estudiantes:', error);
            res.status(500).send('Error al obtener estudiantes desde la API externa');
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
