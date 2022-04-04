const app=require('./app')


const express=require('express')
require('./db/mongoose')


const userRouter =require('./routers/user')
const followRouter =require('./routers/follow')
const authRouter =require('./routers/auth')
const app=express()

const port=process.env.PORT

app.use(express.json())
app.use('/user',userRouter)
app.use('/follow',followRouter)
app.use('/',authRouter)


app.listen(port,()=>{
    console.log('server working '+port)
})