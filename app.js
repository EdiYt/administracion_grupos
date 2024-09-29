const express = require('express');
const app = express();
const carrerasRoutes = require('./routes/carreras');
const gruposRoutes = require('./routes/grupos');
const alumnosRoutes = require('./routes/alumnos');
const profesoresRoutes = require('./routes/profesores');

// Middleware
app.use(express.json());

// Rutas
app.use('/api/carreras', carrerasRoutes);
app.use('/api/grupos', gruposRoutes);
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/profesores', profesoresRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
