const express=require('express')
require('./db/mongoose')


const userRouter =require('./routers/user')
const followRouter =require('./routers/follow')
const adminRouter =require('./routers/adminroute')

const app=express()
const port=process.env.PORT
app.use(express.json())
app.use(userRouter)
app.use(followRouter)
app.use('/admin',adminRouter)
module.exports=app