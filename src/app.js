const express=require('express')
require('./db/mongoose')


const adminRouter =require('./routers/adminroute')
const userAuthRouter =require('./routers/userauthroute')
const tweetRouter =require('./routers/tweetroute')
const followRouter =require('./routers/followroute')
const profileRouter =require('./routers/profilerouter')
const cookieSession = require('cookie-session')
const  passport = require("passport")
require('./passport/passport')
const cors = require("cors")


const app=express()
const port=process.env.PORT
app.use(express.json())
app.use('/user',userAuthRouter)
app.use(tweetRouter)
app.use(followRouter)
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
app.use('/admin',adminRouter)

module.exports =app