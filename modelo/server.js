const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const databaseConnection = require('./path_to_database_connection'); // Asegúrate de reemplazar con la ruta correcta a tu conexión de base de datos
const userRouter = require('./routes/userRouter'); // Reemplaza con las rutas correctas

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8080";
        this.middlewares();
        this.connection();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    async connection() {
        try {
            await databaseConnection.authenticate();
            console.log("Conexión a la base de datos exitosa");
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    routes() {
        this.app.use("/usuario", userRouter);
        this.app.use("/login", loginRouter);
        this.app.use("/solicitante", solicitanteRouter);
        this.app.use("/visita", visitaRouter);
        this.app.use("/beca", becaRouter);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}/`);
        });
    }
}

module.exports = Server;