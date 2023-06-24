const express = require('express')
const fs = require('fs')
const app = express()
const socketIO = require('socket.io')
const http = require('http')

//rotas
//const Audio = require('./routes/audio')
const Sorteio = require('./routes/sorteio')
const Audio = require('./routes/audio')
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
    res.send(`<html>
        <body style="text-align:center">
        <h1>Menu de funcionalidades</h1>
        <a href="/sorteio">Sorteio</a><br>
        <a href="/streaming">Streaming de audio</a><br>
        <a href="http://localhost:5000">Funcionalidade de tempo real</a><br>
        </body>
    </html>`)
    next()
})
app.get('/endpoint', (req,res)=>
{
    const range = req.headers.range
})



app.get('/streaming', (req,res)=>{
    res.send(`
    <html>
        <head>
            <meta charset = "UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name = "viewport" content="width=device-width, initial-scale=1.0">
        </head>
        
        <body>
            <h2>Stream de vídeo</h2>
            <audio src = "./audio.mp3" controls ="true"></audio>
        </body>
    </html>
    `)
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
/*
server.listen(process.env.PORT || 5000, ()=>{
    console.log('servidor socket.io na porta 5000')


})
*/
