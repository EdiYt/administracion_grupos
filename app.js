const express = require('express');
const app = express();
const carrerasRoutes = require('./routes/carreras');
const gruposRoutes = require('./routes/grupos');
const alumnosRoutes = require('./routes/alumnos');
const calificacionesRoutes = require('./routes/calificaciones'); 

// Middleware
app.use(express.json());

// Rutas
app.use('/api/carreras', carrerasRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/calificaciones', calificacionesRoutes); 

const profesoresRoutes = require('./routes/profesores');
app.use('/api/profesores', profesoresRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Iniciar servidor
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
