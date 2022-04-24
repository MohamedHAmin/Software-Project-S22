const request=require('supertest');
const User=require('../models/User');
const Admin=require('../models/Admin');
const app=require('../app');
let user1;
let admintoken;
let usertoken;
let admin;
beforeEach(async ()=>{
    await User.deleteMany();
    await Admin.deleteMany();
    user1=await User.create({
        "screenName":"user1",
        "tag":"user1",
        "email":"user1@gmail.com",
        "password":"123456"
    })
    admin=await Admin.create({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    admintoken=await admin.generateAuthToken();
    usertoken=await user1.generateAuthToken();
});

test('Ban User', async ()=>{
    const res=await request(app).post('/admin/ban/'+user1._id)
    .set('Authorization','Bearer '+admintoken.token)
    .send({
        duration:"5"
    })
    .expect(200)
    expect(res.body.bannedUser.ban).not.toBe(null);
});
test('Tweet While Banned', async ()=>{
    await request(app).post('/admin/ban/'+user1._id)
    .set('Authorization','Bearer '+admintoken.token)
    .send({
        duration:"5"
    })
    const res=await request(app).post('/tweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
    text:"tweet"
    })
    .expect(400)
    expect(res.text).toMatch("User Banned");
});
test('Tweet While Ban duration is over', async ()=>{
    await request(app).post('/admin/ban/'+user1._id)
    .set('Authorization','Bearer '+admintoken.token)
    .send({
        duration:"-1"
    })
    const res=await request(app).post('/tweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
    text:"tweet"
    })
    .expect(200)
    expect(res.body.AddedTweetStatus).toEqual("Tweet Stored");
    const user=await User.findById(user1._id);
    expect(user.ban).toEqual(null)
});