const request = require('supertest')
const Admin = require('../models/Admin')
const Tweet = require('../models/Tweet')
const Token = require('../models/Token')
const User = require('../models/User')
const app = require('../app')
beforeEach(async ()=>{
    await Admin.deleteMany()
    await User.deleteMany()
    await Tweet.deleteMany()
    await Token.deleteMany()
})
test('Check Admin Delete Authority', async ()=>{
    const admin=await Admin.create({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    const admintoken=await admin.generateAuthToken()
    const user1=await User.create({
        "screenName":"user1",
        "tag":"user1",
        "email":"user1@gmail.com",
        "password":"123456"
    })
    const tweet1=await Tweet.create({
        "authorId":user1._id, 
        "text":"User1 Tweet"
    })
    const res=await request(app).delete('/tweet/'+tweet1._id)
    .set('Authorization','Bearer '+admintoken.token)
    .send({})
    .expect(200)
    expect(res.body.Status).toMatch("Success")
})
test('Check User Delete Authority', async ()=>{
    const user1=await User.create({
        "screenName":"user1",
        "tag":"user1",
        "email":"user1@gmail.com",
        "password":"123456"
    })
    const user1token=await user1.generateAuthToken()//.then(function(val){return val})
    const user2=await User.create({
        "screenName":"user2",
        "tag":"user2",
        "email":"user2@gmail.com",
        "password":"123456"
    })
    const user2token=await user2.generateAuthToken()
    const tweet2=await Tweet.create({
        "authorId":user2._id, 
        "text":"User2 Tweet"
    })
    const res1=await request(app).delete('/tweet/'+tweet2._id)
    .set('Authorization','Bearer '+user1token.token)
    .send({})
    .expect(400)
    expect(res1.text).toMatch("Unauthorized")
    const res2=await request(app).delete('/tweet/'+tweet2._id)
    .set('Authorization','Bearer '+user2token.token)
    .send({})
    .expect(200)
   
})
test('Check Wrong ID', async ()=>{
    const admin=await Admin.create({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    const admintoken=await admin.generateAuthToken()
    const res=await request(app).delete('/tweet/23')
    .set('Authorization','Bearer '+admintoken.token)
    .send({})
    .expect(400)
    expect(res.text).toMatch("CastError")
})
test('Check Non-existing ID', async ()=>{
    const user1=await User.create({
        "screenName":"user1",
        "tag":"user1",
        "email":"user1@gmail.com",
        "password":"123456"
    })
    const user1token=await user1.generateAuthToken()
    const tweet=await Tweet.create({
        "authorId":user1._id, 
        "text":"User1 Tweet"
    })
    await Tweet.deleteMany()
    const res=await request(app).delete('/tweet/'+tweet._id)
    .set('Authorization','Bearer '+user1token.token)
    .send({})
    .expect(400)
    expect(res.text).toMatch("Not Found")
})