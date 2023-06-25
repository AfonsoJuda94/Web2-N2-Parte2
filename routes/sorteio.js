const mongoose = require('mongoose')
const router = require('express').Router()
const fs = require('fs')
const Team = require('../models/Team')
const dataBase = require('../models/Partidas')
const { async } = require('regenerator-runtime')


Sorteio()
router.get('/',async (req, res) => {
    res.send(`
    <html>
        <head><title>Sorteio de jogos</title>
            <link rel="stylesheet" href="./styles/visualizar_partidas.css">
        </head>
        <body style = "background-color:rgb(0, 0, 61); text-align: center;color: white">
            <h1>Sorteio</h1>
            ${await leitura_partidas()}
            </body>
        </html>
    `)
    Sorteio()
  });

//Sorteio 
async function Sorteio(){
    const times = await Team.find()
    const lista_times = []
    times.forEach(element => {
        lista_times.push(element.name)
    });
    //fs.writeFileSync('times_imgs.json',JSON.stringify({lista_times,lista_imgs}))
    //Montando partidas 
    let partidas = []
    let p_copia = lista_times
    let p =[]
    if(lista_times.length == 8){
        //Selecionar 4 times. Descartar se os dois forem iguais ou se já tiverem sido escolhidos
        while(partidas.length != 4){
            let x = Math.floor(Math.random() * p_copia.length)
            let y = Math.floor(Math.random() * p_copia.length)
            var teamA = p_copia[x]
            var teamB = p_copia[y]
            if(teamA!=teamB && (teamA!=0 && teamB!=0) && teamA!=undefined &&teamB!=undefined){
                p_copia[x]=0
                p_copia[y]=0
                partidas.push(teamA+" VS "+teamB)
                p.push([x,y])
                console.log(teamA+" VS "+teamB)
            }      
        }
        console.log(p)
        //fs.writeFileSync('partidas.json',JSON.stringify({partidas,p}))
        const partida = {
           p
        }
        const id = '64977bbe19a01ffcad238a89'
        await dataBase.deleteOne()
        await dataBase.create(partida)
        x = await dataBase.find()
        console.log(x[0].p)
    }
    
}
async function leitura_partidas(){
    const x =await dataBase.find()
    

    arquivo_partidas = x[0].p
    const arquivo_times_imgs = fs.readFileSync('./times_imgs.json',{encoding: "utf-8"})
    const times_imgs = JSON.parse(arquivo_times_imgs)

    //console.log(jsonData.p)
    //Procurar nas partidas selecionadas os nomes dos times e seus escudos
    //console.log(jsonData.partidas)
    let str ='<div style="display:flex;justify-content:space-between;flex-wrap:wrap;color: white;margin-left:15%;width:850px">'
    arquivo_partidas.forEach( e => {
        str+='<div style="border: 15px solid blue; display: flex; justify-content:space-between; border-radius:15px; background-color: rgb(2, 2, 153); margin:10px;width:370px">'
        for(let j=0;j<2;j++){
            str += '<div style="margin: 10px; "><img style ="" src = '+times_imgs.lista_imgs[e[j]]+'/><h3 style="text-align:center">'+times_imgs.lista_times[e[j]]+"</h3></div>"
            //console.log(times_imgs.lista_times[e[j]])
            if(j==0)
                str+= '<h1 style="position:relative; top:60px;">VS</h1>'
            
        }
        str+='</div>'
        console.log(str)
    })
    str+="</div>"
    return str
}

mongoose.connect(`mongodb+srv://judah:xa2a2dQQRSVWZWCD@teste.10zb6tc.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=> {
        console.log('Conectamos ao mongoDB')
    })
    .catch((err)=>{console.log(err)})

module.exports = router