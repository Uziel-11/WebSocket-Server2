const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const Sockets = require('./Socket');


class Server {
    constructor(props) {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app);
        this.Serv = socket;
        this.io = this.Serv(this.server, {
            cors: {
                methods: ['GET', 'POST']
            }
        });

        //this.io = socket(this.server, {});
    }

    // midlewares(){
    //     this.app.use(express.static(path.resolve(__dirname)));
    //     this.app.use(cors({origin: 'http://localhost:8000'}))
    // }

    initSocket(){
        new Sockets(this.io);
    }

    exucute(){
        //this.midlewares();
        this.initSocket();

        this.server.listen(this.port, () => {
            console.log('Servidor iniciado en el Puerto ', this.port);
        });

        this.app.get('/', (req,res) =>{
            res.send('Hola buen dia')
        })
    }

}

module.exports = Server;