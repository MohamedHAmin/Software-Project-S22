const request = require('supertest')
const User = require('../models/users')
const Token = require('../models/token')
const app = require('../unittest')
  beforeEach(async ()=>{
      await User.deleteMany()
      await Token.deleteMany()
  })
test('Check User Login', async ()=>{
     await User.create({
        user_name:"oz",
        email:"oz123@gmail.com",
        password : "oz12345",
        Tag:"@ozer123"
    })
    const res=await request(app).post('/login')
    .send({
        email:"oz123@gmail.com",
        password:"shirogani174"
    })
    .expect(400)
})
test('Check User Login', async ()=>{
     await User.create({
        user_name:"oz",
        email:"oz123@gmail.com",
        password : "oz12345",
        Tag:"@ozer123"
    })
    const res=await request(app).post('/login')
    .send({
        email:"oz123@gmail.com",
        password:"oz12345"
    })
    .expect(200)
})

test('Check User Logout from one device ', async ()=>{
    const user1 = await User.create({
        user_name:"oz",
        email:"oz123@gmail.com",
        password : "oz12345",
        Tag:"@ozer123"
    })
    const authtoken = await user1.generateAuthToken()
    
    const res=await request(app).delete('/logout')
    .set('Authorization','Bearer '+ authtoken)
    .send({})
    .expect(200)
})

test('Check User Logout from All devices ', async ()=>{
    const user1 = await User.create({
        user_name:"oz",
        email:"oz123@gmail.com",
        password : "oz12345",
        Tag:"@ozer123"
    })

    const destroytoken = await user1.generateAuthToken()
    const res=await request(app).delete('/logoutall')
    .set('Authorization','Bearer '+ destroytoken)
    .send({
        userId: destroytoken.userId
    })
    .expect(200)
})

