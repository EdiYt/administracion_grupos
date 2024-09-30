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