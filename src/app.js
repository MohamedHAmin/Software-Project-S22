const express=require('express')
var cors = require('cors')
require('./db/mongoose')//? if you seed comment this line    
const bodyParser = require('body-parser')
//require('./db/seeding')  //? if want to seed uncomment this line

const adminRouter =require('./routers/adminroute')
const userAuthRouter =require('./routers/userauthroute')
const userRouter =require('./routers/userroute')
const tweetRouter =require('./routers/tweetroute')
const followRouter =require('./routers/followroute')
const profileRouter =require('./routers/profilerouter')

const jsonErrorHandler = (err, req, res, next) => {
    res.status(500).send({ error: err });
  }

const app=express()
app.use(bodyParser.json())
//app.use(jsonErrorHandler)
app.use(cors())
const port=process.env.PORT
app.use(express.json())
app.set('trust proxy', 1) 
app.use('/user',userAuthRouter)
app.use('/user',userRouter)
app.use(tweetRouter)
app.use(followRouter)
app.use('/profile',profileRouter)
app.use('/admin',adminRouter)

module.exports =app