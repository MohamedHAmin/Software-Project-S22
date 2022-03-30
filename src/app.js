const express=require('express')
require('./db/mongoose')


const adminRouter =require('./routers/adminroute')
const userAuthRouter =require('./routers/userauthroute')
const tweetRouter =require('./routers/tweetroute')
const followRouter =require('./routers/followroute')


const app=express()
const port=process.env.PORT
app.use(express.json())
app.use('/user',userAuthRouter)
app.use(tweetRouter)
app.use(followRouter)
app.use('/admin',adminRouter)

module.exports =app