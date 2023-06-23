const express = require('express')
const fs = require('fs')
const app = express()
const socketIO = require('socket.io')


//rotas
//const Audio = require('./routes/audio')
const Sorteio = require('./routes/sorteio')
const Audio = require('./routes/audio.js')
const Realtime = require('./public/server.js')
const { estimatedDocumentCount } = require('./models/Team')
app.get('/endpoint', (req,res)=>
{
    const range = req.headers.range
})
app.get('/', (req,res)=>{
    res.send(`
        <body style="text-align:center">
        <h1>Menu de funcionalidades</h1>
        <a href="/sorteio">Sorteio</a><br>
        <a href="/audio">Streaming de audio</a><br>
        <a href="http://localhost:5000">Funcionalidade de tempo real</a><br>
        </body>
    `)
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
            <h2>Nosso stream de vídeo</h2>
            <audio src = "http://localhost:3000/audio" controls ="true"></audio>
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
app.listen(3000, ()=>{
   console.log("Servidor na porta 3000") 
})
