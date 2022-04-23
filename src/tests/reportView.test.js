const request=require('supertest');
const Tweet=require('../models/Tweet');
const User=require('../models/User');
const Report=require('../models/Report');
const Admin=require('../models/Admin');
const app=require('../app');
let user1;
let user2;
let tweet;
let report1;
let report3;
let report4;
let admintoken;
let admin;
beforeEach(async ()=>{
    await Tweet.deleteMany();
    await User.deleteMany();
    await Admin.deleteMany();
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
    admin=await Admin.create({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    tweet=await Tweet.create({
        text:"Lorem Ipsum",
        authorId:user1._id
    })
    admintoken=await admin.generateAuthToken();
    report1=await Report.create({
        reporterId:user1._id,
        type:"User",
        msg:"Report1",
        reportedId:user2._id
    })
    report3=await Report.create({
        reporterId:user1._id,
        type:"Tweet",
        msg:"Report3",
        reportedId:tweet._id
    })
    report4=await Report.create({
        reporterId:user2._id,
        type:"Tweet",
        msg:"Report4",
        reportedId:tweet._id
    })
});

test('View Reports With perPage Specified', async ()=>{
    const res=await request(app).get('/admin/report/1?perPage=2')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.reports.length).toEqual(2);
});
test('View Reports default perPage(1)', async ()=>{
    const res=await request(app).get('/admin/report/1')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.reports.length).toEqual(1);
});
test('View Filtered Reports(User)', async ()=>{
    const res=await request(app).get('/admin/report/1?perPage=2&filter=User')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.reports.length).toEqual(1);
});
test('View Filtered Reports(Tweet)', async ()=>{
    const res=await request(app).get('/admin/report/1?perPage=2&filter=Tweet')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.reports.length).toEqual(2);
});
test('No Reports Exist', async ()=>{
    //await Report.deleteMany();
    const res=await request(app).get('/admin/report/6?perPage=2&filter=Tweet')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(400)
    expect(res.text).toMatch("No Reports Found");
});
test('Check Order', async ()=>{
    //await Report.deleteMany();
    const res=await request(app).get('/admin/report/1?perPage=2&filter=Tweet')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    const isRecent=res.body.reports[0].createdAt>res.body.reports[1].createdAt
    expect(isRecent).toEqual(true);
});

