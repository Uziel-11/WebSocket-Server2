
class Socket {

    constructor(io) {

        this.io = io;
        this.historial = [];

        this.socketEvent();
    }

    socketEvent(){
        this.io.on('connect', cliente => {
            console.log('Nueva Conexion', cliente.id);

            for (let i in this.historial){
                this.io.emit('dibujar', {line: this.historial[i]});
            }


            cliente.on('trazo', (data)=>{
                this.historial.push(data.line);
                this.io.emit('dibujar', {line: data.line})
            });
        });
    }
}

module.exports = Socket;