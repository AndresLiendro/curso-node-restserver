const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config.db');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar DB
        this.conectarDB();

        // Middlewares 
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {

        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Driectorio publico
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use( this.usuariosPath, require('../routes/user.routes'));
    }

    listen() {        
        this.app.listen( this.port , () => {
            console.log('Corriendo en el puerto', this.port);
        });
    }
}



module.exports = Server;