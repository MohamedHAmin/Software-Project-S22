const request = require('supertest')
const User = require('../models/users')
const app = require('../unittest')
  beforeEach(async ()=>{
      await User.deleteMany()
 })
//jest.setTimeout(25000);
test('Check User Creation (Signup)', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        user_name:"oz",
        email:"oz123@gmail.com",
        password:"shirogani174",
        Tag:"@oz174"
    })
    .expect(200)
    expect(res.body.user.user_name).toEqual("oz")
    expect(res.body.user.email).toEqual("oz123@gmail.com")
    expect(res.body.user.Tag).toEqual("@oz174")
})
test('Check Email Duplication', async ()=>{
    await User.create({
        user_name:"uzumaki",
        email:"uzu123@gmail.com",
        password:"shirogane174",
        Tag:"@uzumaki"
    })
    const res=await request(app).post('/signup')
    .send({
        user_name:"SuperAdmin14",
        email:"uzu123@gmail.com",
        password:"newuser123",
        Tag:"@azumabito"
    })
    .expect(400)
    expect(res.text).toMatch("errorMongoServerError: E11000 duplicate key error collection: Twittertesting.users index: email_1 dup key: { email: \"uzu123@gmail.com\" }")
})
test('Check Password Length', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        user_name:"oz",
        email:"oz123@gmail.com",
        password:"super",
         Tag:"@oz174"
    })
    .expect(400)
    expect(res.text).toMatch("shorter than the minimum allowed length")
})
test('Email Validity', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        user_name:"oz14",
        email:"cool23@gmail",
        password:"superuser1",
         Tag:"@oz174"
    })
    .expect(400)
    expect(res.text).toMatch("not valid email")
})
test('Empty User name', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        email:"cool23@gmail.com",
        password:"superuser",
         Tag:"@oz174"
    })
    .expect(400)
    expect(res.text).toMatch("`user_name` is required")
})
test('Empty Email', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        user_name:"oz14",
        password:"superuser1",
         Tag:"@oz174"
    })
    .expect(400)
    expect(res.text).toMatch("`email` is required")
})
test('Empty Password', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        user_name:"Superoz12",
        email:"cool23@gmail.com",
         Tag:"@oz174"
    })
    .expect(400)
    expect(res.text).toMatch("`password` is required")
})
test('Empty Tag', async ()=>{
    const res=await request(app).post('/signup')
    .send({
        user_name:"Superoz12",
        email:"cool23@gmail.com",
        password:"12345678"
    })
    .expect(400)
    expect(res.text).toMatch("`Tag` is required")
})