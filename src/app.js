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
const Notification = require("./models/Notification");

const seenall=async()=>{
  await Notification.updateMany({seen:undefined},{seen:true})
  }
  const unseenall=async()=>{
    await Notification.updateMany({},{seen:false})
  }
  //seenall()
  //unseenall()
const session = require('cookie-session')
const  passport = require("passport")
require('./passport/passport')
const cors = require("cors")


const app=express()
app.use(cors())
const port=process.env.PORT
app.use(express.json())
app.set('trust proxy', 1) 
app.set('trust proxy', 1) 

app.use(session({
    secret: "SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false ,
      httpOnly: true,
      maxAge: 3000000,
    }}))
app.use('/user',userAuthRouter)
app.use('/user',userRouter)
app.use(tweetRouter)
app.use(notficationRouter)

app.use(followRouter)
app.use('/profile',profileRouter)
app.use('/admin',adminRouter)

module.exports =app