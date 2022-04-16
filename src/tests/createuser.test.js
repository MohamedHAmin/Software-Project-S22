const request = require('supertest')
//const nodemailerMock = require('nodemailer-mock').getMockFor(nodemailer);
const User = require('../models/User')
const UserVerification = require('../models/UserVerification')
const app = require('../app')
jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {}),
      verify: jest.fn().mockReturnValue((error,success)=>{})
    })
  }));
  beforeEach(async ()=>{
      await User.deleteMany()
      await UserVerification.deleteMany()
 })
//jest.setTimeout(25000);
test('Check User Creation (Signup)', async ()=>{
    const res=await request(app).post('/user/signup')
    .send({
    screenName:"oz",
    email:"oz123@gmail.com",
    password:"123456",
    tag:"@oz174"
    })
    .expect(201)
    expect(res.body.user.screenName).toEqual("oz")
   
    expect(res.body.user.tag).toEqual("@oz174")
  
    expect(res.body.user.verified).toEqual(false)
    
})
test('Check Email Duplication', async ()=>{
    await User.create({
        screenName:"user6",
        email:"oz123@gmail.com",
        password:"123456",
        verified: true,
        tag:"@oz174"
    })
    const res=await request(app).post('/user/signup')

    .send({
    screenName:"user6",
    email:"oz123@gmail.com",
    password:"123456",
    verified:true,
    tag:"@oz174"
    })
    .expect(400)
})
test('Check Tag Duplication', async ()=>{
    await User.create({
        screenName:"user6",
        email:"oz123@gmail.com",
        password:"123456",
        verified: true,
        tag:"@oz174"
    })
    const res=await request(app).post('/user/signup')
   
    .send({
        screenName:"user6",
    email:"oz124@gmail.com",
    password:"123456",
    tag:"@oz174"
    })
    .expect(400)
})
test('Check Password Length', async ()=>{
    const res=await request(app).post('/user/signup')
  
    .send({
        screenName:"user6",
        email:"oz123@gmail.com",
        password:"123",
        tag:"@oz174"
    })
    .expect(400)
})
test('Email Validity', async ()=>{
    const res=await request(app).post('/user/signup')
 
    .send({
        screenName:"user6",
    email:"oz123@gmail",
    password:"123456",
    tag:"@oz174"
    })
    .expect(400)

})
test('Empty User name', async ()=>{
    const res=await request(app).post('/user/signup')
   
    .send({
        email:"cool23@gmail.com",
        password:"superuser",
         Tag:"@oz174"
    })
    .expect(400)
})
test('Empty Email', async ()=>{
    const res=await request(app).post('/user/signup')
   
    .send({
        user_name:"oz14",
        password:"superuser1",
         Tag:"@oz174"
    })
    .expect(400)
})
test('Empty Password', async ()=>{
    const res=await request(app).post('/user/signup')
    
    .send({
        user_name:"Superoz12",
        email:"cool23@gmail.com",
         Tag:"@oz174"
    })
    .expect(400)
})
test('Empty Tag', async ()=>{
    const res=await request(app).post('/user/signup')
    .send({
        user_name:"Superoz12",
        email:"cool23@gmail.com",
        password:"12345678"
    })
    .expect(400)
   
})


test('Successful Email Verification', async ()=>{
    const user = await User.create({
    screenName:"oz",
    email:"haozer69@gmail.com",
    password:"123456",
    verified:false,
    tag:"@oz174"
    })
    await UserVerification.create({
     userId : user._id,
     uniqueString: "dummyUniqueString",
     email: user.email
    })
    const res=await request(app).get('/user/verify/' + user._id.toString() + '/dummyUniqueString')
    .expect(200)
})