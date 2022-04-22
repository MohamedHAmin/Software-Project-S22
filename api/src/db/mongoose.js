const { append } = require('express/lib/response')

require('env-cmd')
const mongoose =require('mongoose')
mongoose.connect(process.env.MONGOCONNECT,{
  useNewUrlParser:true
})
