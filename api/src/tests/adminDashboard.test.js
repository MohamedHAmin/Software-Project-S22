const request = require('supertest')
const Admin = require('../models/Admin')
const Token = require('../models/Token')
const User = require('../models/User')
const Tweet = require('../models/Tweet')
const app = require('../app')
var token;
var admin;
let tweet1;
let tweet2;
let tweet3;
let user1;
let user2;
let user3;
beforeEach(async ()=>{
    await Admin.deleteMany()
    await Token.deleteMany()
    await User.deleteMany()

    admin = await Admin.create({
        adminName:"coolAdmin24o",
        email:"cool23o4@gmail.com",
    });
    user1=await User.create({
        "screenName":"user1",
        "tag":"user1",
        "email":"user1@gmail.com",
        "password":"123456"
    })
    user2=await User.create({
        "screenName":"user2",
        "tag":"user2",
        "email":"user2@gmail.com",
        "password":"123456"
    })
    user3=await User.create({
        "screenName":"user3",
        "tag":"user3",
        "email":"user3@gmail.com",
        "password":"123456"
    })
    tweet1=await Tweet.create({
        "authorId":user1._id,
        "text":"Tweet1"
    })
    tweet2=await Tweet.create({
        "authorId":user2._id,
        "text":"Tweet2"
    })
    tweet3=await Tweet.create({
        "authorId":user3._id,
        "text":"Tweet3"
    })
    token = await admin.generateAuthToken();
})
test('DashBoard Week Specified', async ()=>{
    const res=await request(app).get('/admin/dashboard?duration=Week')
    .set('Authorization','Bearer '+token.token)
    .send({})
    .expect(200)
})
test('DashBoard Month Specified', async ()=>{
    const res=await request(app).get('/admin/dashboard?duration=Month')
    .set('Authorization','Bearer '+token.token)
    .send({})
    .expect(200)
})
test('DashBoard None Specified', async ()=>{
    const res=await request(app).get('/admin/dashboard')
    .set('Authorization','Bearer '+token.token)
    .send({})
    .expect(200)
})