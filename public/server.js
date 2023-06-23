const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app);
const io = socketIO(server)
app.use(express.static(__dirname))
io.on('connection', (socket)=>{
    console.log('Novo cliente conectado')
    socket.on('chatMessage', (message)=>{
        io.emit('chatMessage',message)
    })
    socket.on('disconnect', ()=>{
        console.log('cliente desconectado')
    })
})

server.listen(process.env.PORT ||5000, ()=>{
    console.log('servidor socket.io na porta 5000')
})
module.exports  = express