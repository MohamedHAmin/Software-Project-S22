const express=require('express')
require('./db/mongoose')


const authRouter =require('./routers/auth')

const app=express()
const port=process.env.PORT
app.use(express.json())
app.use('/',authRouter)
module.exports=app