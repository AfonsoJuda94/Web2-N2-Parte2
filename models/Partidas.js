const mongoose = require('mongoose')
const Team = mongoose.model('partidas',{
    p:Array
})

module.exports = Team