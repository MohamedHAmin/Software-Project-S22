
const express=require('express')
require('./db/mongoose')


const userRouter =require('./routers/userroute')
const followRouter =require('./routers/followroute')
const adminRouter =require('./routers/adminroute')

const app=express()
const port=process.env.PORT
app.use(express.json())
app.use(userRouter)
app.use(followRouter)
app.use('/admin',adminRouter)


app.listen(port,()=>{
    console.log('server working '+port)
})