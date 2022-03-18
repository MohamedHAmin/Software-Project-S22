
const express=require('express')
require('./db/mongoose')


const userRouter =require('./routers/user')
const followRouter =require('./routers/follow')

const app=express()
const port=process.env.PORT
app.use(express.json())
app.use(userRouter)
app.use(followRouter)



app.listen(port,()=>{
    console.log('server working '+port)
})