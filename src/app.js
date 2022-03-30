const express=require('express')
require('./db/mongoose')



const adminRouter =require('./routers/admin')
const userAuthRouter =require('./routers/userauth')
const tweetRouter =require('./routers/tweet')
const followRouter =require('./routers/followroute')

const app=express()
const port=process.env.PORT
app.use(express.json())
app.use(userAuthRouter)
app.use(tweetRouter)
app.use(followRouter)
app.use('/admin',adminRouter)

module.exports =app