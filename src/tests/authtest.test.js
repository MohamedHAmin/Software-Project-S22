const request = require('supertest')
const User = require('../models/User')
const Token = require('../models/Token')
const app = require('../app')
  beforeEach(async ()=>{
      await User.deleteMany()
      await Token.deleteMany()
  })
test('Check User Login with wrong password', async ()=>{
     await User.create({
        screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6"
    })
    const res=await request(app).post('/user/login')
    .send({
        email:"user70@gmail.com",
        password:"shirogani174"
    })
    .expect(400)
})
test('Check User Login with email', async ()=>{
     await User.create({
        screenName:"user6",
        email:"user70@gmail.com",
        password:"123456",
        tag:"tag6"
    })
    const res=await request(app).post('/user/login')
    .send({
        email_or_username:"user70@gmail.com",
        password:"123456"
    })
    .expect(200)
})

test('Check User Login with username', async ()=>{
     await User.create({
        screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6"
    })
    const res=await request(app).post('/user/login')
    .send({
        email_or_username:"tag6",
        password:"123456"
    })
    .expect(200)
})

test('Check User Logout from one device ', async ()=>{
    const user1 = await User.create({
        screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6"
    })
    const authtoken = await user1.generateAuthToken()
    
    const res=await request(app).delete('/user/logout')
    .set('Authorization','Bearer '+ authtoken)
    .send({})
    .expect(200)
})

test('Check User Logout from All devices ', async ()=>{
    const user1 = await User.create({
        screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6"
    })

    const destroytoken = await user1.generateAuthToken()
    const res=await request(app).delete('/user/logoutall')
    .set('Authorization','Bearer '+ destroytoken)
    .send({
        userId: destroytoken.userId
    })
    .expect(200)
})