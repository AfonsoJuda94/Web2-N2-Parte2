const express = require('express').Router()

const request = require('request')

express.get('/', (req,res,next)=>{
    const url = 'https://storage.googleapis.com/n2web2-5e1a2.appspot.com/audio/audio.mp3?GoogleAccessId=firebase-adminsdk-wfdai%40n2web2-5e1a2.iam.gserviceaccount.com&Expires=1709262000&Signature=KQF9aBnbHbzTnIJGGZjl7t1Emdfbh9btguymorVH2FtxJYfWxZlTrnTDWd2gWpmryYeyz7TNtwEa1jvGA%2FquT5vqTiqgiim7MY2fuKPirfkXYOW5mbj3FNorF8TMs%2B1kUqbGizlCVZXuvnG2s5wIewbnT1JDJlYjG%2BOYTmK7hYj%2BU0u3fHdqjU7gplib%2BSXY5bjTxvMhrq3XWwh%2FX00aSaJw8gvJM2sDKQOG0MHnNLUtZYiJ%2BbYxxHLH8%2FwedY6OQPbo0DijujJmYjQLPKrk%2BPqqhcSAUbpzX7HVH8usPj4gvXTTY3OGE7VFEyEA9JzRYRVRGtPdGE9Y8TUtmdEfVA%3D%3D'
    
    request
        .get(url)
        .on('',(r) =>{
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Transfer-Encoding', 'chunked');
        })
        .pipe(res)
  })
module.exports = express

//OBS: CHatGPT fez praticamente tudo nessa parte, pois eu não fazia ideia de como implementar isso 
//pois o Vercel não abre mp3 local(mesmo fazendo upload) e o slide só abordava o método local.