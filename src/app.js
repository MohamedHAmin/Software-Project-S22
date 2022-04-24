const express=require('express')
var cors = require('cors')
require('./db/mongoose')//? if you seed comment this line    

//require('./db/seeding')  //? if want to seed uncomment this line

const adminRouter =require('./routers/adminroute')
const userAuthRouter =require('./routers/userauthroute')
const userRouter =require('./routers/userroute')
const tweetRouter =require('./routers/tweetroute')
const followRouter =require('./routers/followroute')
const profileRouter =require('./routers/profilerouter')
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
app.use(followRouter)
<<<<<<< HEAD
app.use(profileRouter)
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin:"http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials : true,
}
))
app.use(cookieSession({
    name:"session",
    keys:["Larry"],
    maxAge: 24*60*60*100
}))
=======
app.use('/profile',profileRouter)
>>>>>>> 0870e8b0a32a26245a1279286b72bbe448e8bda2
app.use('/admin',adminRouter)

module.exports =app