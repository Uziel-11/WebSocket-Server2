
class Socket {

    constructor(io) {

        this.io = io;
        this.historial = [];

        this.socketEvent();
    }

    socketEvent(){
        this.io.on('connect', socket => {
            console.log('Nueva Conexion', socket.id);

            for (let i in this.historial){
                this.io.emit('dibujar', {line: this.historial[i]});
            }


            socket.on('trazo', (data)=>{
                this.historial.push(data.line);
                this.io.emit('dibujar', {line: data.line})
            });
        });
    }
}

module.exports = Socket;