
const express=require('express')
require('./db/mongoose')


const userRouter =require('./routers/user')
const app=express()
const port=process.env.PORT
app.use(express.json())
app.use(userRouter)


app.listen(port,()=>{
    console.log('server working '+port)
})