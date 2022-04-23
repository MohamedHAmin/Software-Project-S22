const request=require('supertest');
const Tweet=require('../models/Tweet');
const User=require('../models/User');
const Report=require('../models/Report');
const Admin=require('../models/Admin');
const app=require('../app');
let user1;
let user2;
let user3;
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
    user3=await User.create({
        "screenName":"user3",
        "tag":"user3",
        "email":"user3@gmail.com",
        "password":"123456"
    })
    admin=await Admin.create({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com"
    })
    admintoken=await admin.generateAuthToken();
    report1=await Report.create({
        reporterId:user1._id,
        type:"User",
        msg:"Report1",
        reportedId:user2._id
    })
    report3=await Report.create({
        reporterId:user2._id,
        type:"User",
        msg:"Report3",
        reportedId:user1._id
    })
    report4=await Report.create({
        reporterId:user3._id,
        type:"User",
        msg:"Report4",
        reportedId:user1._id
    })
});

test('View Users With perPage Specified', async ()=>{
    const res=await request(app).get('/admin/users/1?perPage=2')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.users.length).toEqual(2);
});
test('View Users default perPage(1)', async ()=>{
    const res=await request(app).get('/admin/users/1')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.users.length).toEqual(1);
});
test('Check Correct Report Count', async ()=>{
    const res=await request(app).get('/admin/users/1?perPage=3')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.users[0].Reports).toEqual(2);
    expect(res.body.users[1].Reports).toEqual(1);
    expect(res.body.users[2].Reports).toEqual(0);
});
test('No Users Exist', async ()=>{
    //await Report.deleteMany();
    const res=await request(app).get('/admin/users/6?perPage=2')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(400)
    expect(res.text).toMatch("Not Found");
});
test('Check Order', async ()=>{
    const res=await request(app).get('/admin/users/1?perPage=2')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    const ismore=res.body.users[0].Reports>=res.body.users[1].Reports
    expect(ismore).toEqual(true);
});