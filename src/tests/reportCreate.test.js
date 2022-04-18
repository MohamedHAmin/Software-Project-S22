const request=require('supertest');
const Tweet=require('../models/Tweet');
const User=require('../models/User');
const Report=require('../models/Report');
const app=require('../app');
let user1;
let user2;
let tweet;
let usertoken;
beforeEach(async ()=>{
    await Tweet.deleteMany();
    await User.deleteMany();
    await Report.deleteMany();
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
    tweet=await Tweet.create({
        text:"Lorem Ipsum",
        authorId:user1._id
    })
    usertoken=await user1.generateAuthToken();
});

test('Report a User', async ()=>{
    const res=await request(app).post('/user/report')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        type:"User",
        msg:"Report1",
        reportedId:user2._id
    })
    .expect(201)
    expect((await Report.findById(res.body.report._id)).msg).toEqual("Report1");
});
test('Report Self', async ()=>{
    const res=await request(app).post('/user/report')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        type:"User",
        msg:"Report1",
        reportedId:user1._id
    })
    .expect(400)
    expect(res.text).toMatch("Cannot Report Self");
});
test('Report a Tweet', async ()=>{
    const res=await request(app).post('/user/report')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        type:"Tweet",
        msg:"Report1",
        reportedId:tweet._id
    })
    .expect(201)
    expect((await Report.findById(res.body.report._id)).msg).toEqual("Report1");
});
test('Report with no type', async ()=>{
    const res=await request(app).post('/user/report')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        //type:"Tweet",
        msg:"Report1",
        reportedId:tweet._id
    })
    .expect(400)
    expect(res.text).toMatch("`type` is required");
});
test('Report with no reportedId', async ()=>{
    const res=await request(app).post('/user/report')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        type:"Tweet",
        msg:"Report1",
        //reportedId:tweet._id
    })
    .expect(400)
    expect(res.text).toMatch("`reportedId` is required");
});


