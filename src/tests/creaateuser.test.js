const request = require('supertest')
const User = require('../models/User')
const app = require('../app')
  beforeEach(async ()=>{
      await User.deleteMany()
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
    .expect(200)
    expect(res.body.user.screenName).toEqual("oz")
    expect(res.body.user.email).toEqual("oz123@gmail.com")
    expect(res.body.user.tag).toEqual("@oz174")
})
test('Check Email Duplication', async ()=>{
    await User.create({
        screenName:"user6",
        email:"oz123@gmail.com",
        password:"123456",
        tag:"@oz174"
    })
    const res=await request(app).post('/user/signup')
    .send({
        screenName:"user6",
    email:"oz123@gmail.com",
    password:"123456",
    tag:"@o88"
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