const request = require('supertest')
//const nodemailerMock = require('nodemailer-mock').getMockFor(nodemailer);
const User = require('../models/User')
const Userverification = require('../models/UserVerification')
const bcrypt = require("bcryptjs"); //generating unique strings 

const app = require('../app')

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {})
    })
}));

beforeEach(async ()=>{
      await User.deleteMany()
      await Userverification.deleteMany()

 })
//jest.setTimeout(25000);
test('Check User Creation (Signup)', async ()=>{
    const res=await request(app).post('/user/signup')
    .send({
    screenName:"oz",
    email:"mido.zanaty55@gmail.com",
    password:"123456",
    tag:"@oz174"
    })
    .expect(201)
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
        tag:"@oz17499",
        verified:true
    })
    const res=await request(app).post('/user/signup')
   
    .send({
        screenName:"user6",
    email:"oz124@gmail.com",
    password:"123456",
    tag:"@oz17499"
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

test('email verfication', async ()=>{
    const res=await request(app).post('/user/signup')
    .send({
        screenName:"DDD",
        user_name:"Superoz12",
        email:"cool23@gmail.com",
        password:"12345678",
        tag:"tg1"
    })
    const userverification2=await Userverification.findOne()

    const userverification=await Userverification.findOne({email:"cool23@gmail.com"})
    //let s=userverification.uniqueString.toString()
    //s=s.replace('+','xMl3Jk')
    //s=s.replace('/','Por21Ld')
    //s=s.replace('=','Ml32')
    //console.log("🚀 ~ file: createuser.test.js ~ line 136 ~ test ~ s", s)
     
    const res2=await request(app).get('/user/verify/'+userverification.userId.toString()+'?hash='+userverification.uniqueString)
    .expect(200)
    
})
