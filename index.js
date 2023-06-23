const express = require('express')
const fs = require('fs')
const app = express()
const socketIO = require('socket.io')
const http = require('http')

//rotas
//const Audio = require('./routes/audio')
const Sorteio = require('./routes/sorteio')
const Audio = require('./routes/audio.js')
//const Realtime = require('./public/server')

//servidor socket
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



const { estimatedDocumentCount } = require('./models/Team')
app.get('/', (req,res,next)=>{
    //res.send()
    app.use(express.static('pages'))
    res.send('Funciona')
    next()
})
app.get('/endpoint', (req,res)=>
{
    const range = req.headers.range
})



app.get('/streaming', (req,res)=>{
    app.use(express.static('pages/streaming.html'))
})

//midwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/streaming',Audio)
app.use('/sorteio',Sorteio)
app.use('/audio',Audio)
//app.use('/realtime',Realtime)
app.listen(process.env.PORT || 3000, ()=>{
   console.log("Servidor express em execução") 
})
server.listen(process.env.PORT || 5000, ()=>{
    console.log('servidor socket.io na porta 5000')
})
