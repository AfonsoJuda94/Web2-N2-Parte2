const express = require('express')
const fs = require('fs')
const app = express()
const socketIO = require('socket.io')


//rotas
//const Audio = require('./routes/audio')
const Sorteio = require('./routes/sorteio')
const Audio = require('./routes/audio.js')
const Realtime = require('./public/server')
const { estimatedDocumentCount } = require('./models/Team')
app.get('/', (req,res,next)=>{
    //res.send()
    app.use(express.static('pages'))
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
app.use('/realtime',Realtime)
app.listen(4000, ()=>{
   console.log("Servidor na porta 4000") 
})