const request = require('supertest')
const User = require('../models/User')
const Admin = require('../models/Admin')
const Token = require('../models/Token')
const app = require('../app')
  beforeEach(async ()=>{
      await User.deleteMany()
      await Token.deleteMany()
      await Admin.deleteMany()
  })
test('Check User Login with wrong password', async ()=>{
     await User.create({
    screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6",
      verified:true

})
const res=await request(app).post('/user/login')
.send({
    email_or_username:"user70@gmail.com",
    password:"12jhfd36"
})
.expect(400)
expect(res.text).toMatch("unable to login")
})
test('Check User Login with wrong email or username', async ()=>{
     await User.create({
    screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6",
    verified:true
})
const res=await request(app).post('/user/login')
.send({
    email_or_username:"user7@gmail.com",
    password:"123456"
})
.expect(400)
expect(res.text).toMatch("unable to login")
})
test('Check User Login with email', async ()=>{
     await User.create({
        screenName:"user6",
        email:"user70@gmail.com",
        password:"123456",
        tag:"tag6",
        verified:true
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
    tag:"tag6",
    verified:true
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
    tag:"tag6",
    verified:true
    })
    const authtoken = await user1.generateAuthToken()
    
    const res=await request(app).delete('/user/logout')
    .set('Authorization','Bearer '+ authtoken.token)
    .send({})
    .expect(200)
})

test('Check User Logout from All devices ', async ()=>{
    const user1 = await User.create({
    screenName:"user6",
    email:"user70@gmail.com",
    password:"123456",
    tag:"tag6",
    verified:true
    })

    const destroytoken = await user1.generateAuthToken()
    const res=await request(app).delete('/user/logoutall')
    .set('Authorization','Bearer '+ destroytoken.token)
    .send({
        ownerId: destroytoken.ownerId
    })
    .expect(200)
})
test('Check Admin Login ', async ()=>{
    await Admin.create({
        adminName:"coolAdmin24o",
        email:"cool23o4@gmail.com",
        password:"123456",
        verified:true
})
const res=await request(app).post('/user/login')
.send({
   email_or_username:"cool23o4@gmail.com",
   password:"123456"
})
.expect(200)
})