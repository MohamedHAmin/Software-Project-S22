const request = require('supertest')
const Admin = require('../models/admin')
const Tweet = require('../models/tweet')
const User = require('../models/users')
const app = require('../unittest')
beforeEach(async ()=>{
    await Admin.deleteMany()
    await User.deleteMany()
    await Tweet.deleteMany()
})
test('Check Admin Delete Authority', async ()=>{
    const admin=await Admin.create({
        admin_name:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    await admin.generateAdminToken()
    const user1=await User.create({
        "user_name":"user1",
        "tag":"user1",
        "age":15,
        "email":"user1@gmail.com",
        "password":"123456"
    })
    const tweet1=await Tweet.create({
        "userId":user1._id, 
        "Text":"User1 Tweet"
    })
    const res=await request(app).delete('/tweet/'+tweet1._id)
    .set('Authorization','Bearer '+admin.tokens.token)
    .send({})
    .expect(200)
    expect(res.text).toEqual("Success")
})
test('Check User Delete Authority', async ()=>{
    const user1=await User.create({
        "user_name":"user1",
        "tag":"user1",
        "age":15,
        "email":"user1@gmail.com",
        "password":"123456"
    })
    user1.generateAuthToken()
    const user2=await User.create({
        "user_name":"user2",
        "tag":"user2",
        "age":15,
        "email":"user2@gmail.com",
        "password":"123456"
    })
    user2.generateAuthToken()
    const tweet2=await Tweet.create({
        "userId":user2._id, 
        "Text":"User2 Tweet"
    })
    const res1=await request(app).delete('/tweet/'+tweet2._id)
    .set('Authorization','Bearer '+user1.tokens.token)
    .send({})
    .expect(400)
    expect(res1.text).toMatch("Unauthorized")
    const res2=await request(app).delete('/tweet/'+tweet2._id)
    .set('Authorization','Bearer '+user2.tokens.token)
    .send({})
    .expect(200)
    expect(res2.text).toEqual("Success")
})
test('Check Wrong ID', async ()=>{
    const admin=await Admin.create({
        admin_name:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    await admin.generateAdminToken()
    const res=await request(app).delete('/tweet/23')
    .set('Authorization','Bearer '+admin.tokens.token)
    .send({})
    .expect(400)
    expect(res.text).toMatch("CastError")
})
test('Check Non-existing ID', async ()=>{
    const user1=await User.create({
        "user_name":"user1",
        "tag":"user1",
        "age":15,
        "email":"user1@gmail.com",
        "password":"123456"
    })
    user1.generateAuthToken()
    const tweet=await Tweet.create({
        "userId":user1._id, 
        "Text":"User1 Tweet"
    })
    await Tweet.deleteMany()
    const res=await request(app).delete('/tweet/'+tweet._id)
    .set('Authorization','Bearer '+user1.tokens.token)
    .send({})
    .expect(404)
    expect(res.text).toMatch("Not Found")
})
