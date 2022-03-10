const { append } = require('express/lib/response')
const mongoose =require('mongoose')
mongoose.connect(process.env.MONGOCONNECT,{
    useNewUrlParser:true    
})