const express = require('express').Router()
const fs = require('fs')
express.get('/', (req,res,next)=>{
    const audioPath = 'AfonsoJuda94/Web2-N2-Parte2/audio.mp3'
    fs.access(audioPath,fs.constants.R_OK, (e)=>{
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', 'inline');
        res.setHeader('Transfer-Encoding', 'chunked');

        const stream = fs.createReadStream(audioPath)
        stream.pipe(res)
    })
    
})

module.exports = express
