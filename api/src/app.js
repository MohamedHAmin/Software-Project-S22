const express=require('express')
require('./db/mongoose')//? if you seed comment this line    

//require('./db/seeding')  //? if want to seed uncomment this line

const adminRouter =require('./routers/adminroute')
const userAuthRouter =require('./routers/userauthroute')
const userRouter =require('./routers/userroute')
const tweetRouter =require('./routers/tweetroute')
const followRouter =require('./routers/followroute')
const profileRouter =require('./routers/profilerouter')
const notficationRouter =require('./routers/notificationrout')

const cookieSession = require('cookie-session')
const  passport = require("passport")
require('./passport/passport')
const cors = require("cors")


const app=express()
app.use(cors())
const port=process.env.PORT
app.use(express.json())
app.set('trust proxy', 1) 
app.use('/user',userAuthRouter)
app.use('/user',userRouter)
app.use(tweetRouter)
app.use(notficationRouter)

app.use(followRouter)
app.use('/profile',profileRouter)
app.use('/admin',adminRouter)

module.exports =app