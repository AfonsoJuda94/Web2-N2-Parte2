const mongoose = require('mongoose')
const Team = mongoose.model('times_imgs_partidas',{
    lista_imgs: Array,lista_times: Array
})

module.exports = Team