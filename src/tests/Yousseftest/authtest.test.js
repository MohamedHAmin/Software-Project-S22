const request = require('supertest')
const User = require('../../models/User')
const passport = require('../../passport/passport')
const Admin = require('../../models/Admin')
const Token = require('../../models/Token')
const app = require('../../app')

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {})
    })
}));


jest.mock('../passport/passport.js');


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
    verified:true,
    tag:"tag6"
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

test('Check User Login with unverified email', async ()=>{
    await User.create({
   screenName:"user6",
   email:"user70@gmail.com",
   password:"123456",
   verified: false,
   tag:"tag6"
})
const res=await request(app).post('/user/login')
.send({
   email_or_username:"user7@gmail.com",
   password:"123456"
})
.expect(400)
expect(res.text).toMatch("Error: unable to login as user is not found")
})

test('Check User Login with verified email', async ()=>{
    await User.create({
       screenName:"user6",
       email:"user70@gmail.com",
       password:"123456",
       verified: true,
       tag:"tag6"
   })
   const res=await request(app).post('/user/login')
   .send({
       email_or_username:"user70@gmail.com",
       password:"123456"
   })
   .expect(200)
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
    const user1 = await User.create({
        screenName:"admin",
        email:"admin@gmail.com",
        password:"123456",
        tag:"admin",
        verified:true
        })  
    await Admin.create({
        adminName:"admin",
        email:"admin@gmail.com",
})
const res=await request(app).post('/user/login')
.send({
   email_or_username:"admin@gmail.com",
   password:"123456"
})
.expect(200)
})

test('Forget Password with wrong email', async ()=>{
    await User.create({
   screenName:"user6",
   email:"user70@gmail.com",
   password:"123456",
   tag:"tag6",
   verified:true
})
const res=await request(app).post('/user/forgotpassword')
.send({
   email:"user7@gmail.com"
})
.expect(400)
expect(res.text).toMatch("Email is not found or registered")
})

test('Forget Password with correct email', async ()=>{
    await User.create({
   screenName:"user6",
   email:"user7@gmail.com",
   password:"123456",
   tag:"tag6",
   verified:true
})
const res=await request(app).post('/user/forgotpassword')
.send({
   email:"user7@gmail.com"
})
.expect(200)
expect(res.text).toMatch("Email sent , and password has been reset")
})


test('Forget Password with un-verified email', async ()=>{
    await User.create({
   screenName:"user6",
   email:"user70@gmail.com",
   password:"123456",
   tag:"tag6",
   verified:false
})
const res=await request(app).post('/user/forgotpassword')
.send({
   email:"user70@gmail.com"
})
.expect(401)
expect(res.text).toMatch("Email hasn't been verified yet")
})

test('Login With google', async ()=>{
const res=await request(app).get('/user/auth/google')
.expect(500)
})


