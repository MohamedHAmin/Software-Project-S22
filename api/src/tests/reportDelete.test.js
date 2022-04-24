const request=require('supertest');
//const Tweet=require('../models/Tweet');
const Admin=require('../models/Admin');
const User=require('../models/User');
const Report=require('../models/Report');
const app=require('../app');
let report1;
let report2;
let user1;
let user2;
let user3;
let admin;
let admintoken;
beforeEach(async ()=>{
    await Report.deleteMany();
    await User.deleteMany();
    await Admin.deleteMany();
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
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    report1=await Report.create({
        reporterId:user2._id,
        type:"User",
        msg:"Report1",
        reportedId:user1._id
    })
    report2=await Report.create({
        reporterId:user3._id,
        type:"User",
        msg:"Report2",
        reportedId:user1._id
    })
    admintoken=await admin.generateAuthToken();
});

test('Delete a Report', async ()=>{
    const res=await request(app).delete('/admin/report/'+report1._id+'?IDType=Report')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.deletedreports.msg).toEqual(report1.msg);
});
test('Delete Reports', async ()=>{
    const res=await request(app).delete('/admin/report/'+user1._id+'?IDType=Reported')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.deletedreports.deletedCount).toEqual(2);
});
test('Delete an Unexisting Report(Report)', async ()=>{
    const res=await request(app).delete('/admin/report/6251d7a07388476dcb26fda3?IDType=Report')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(400)
    expect(res.text).toMatch("Not Found");
});
test('Delete an Unexisting Report(Reported)', async ()=>{
    const res=await request(app).delete('/admin/report/6251d7a07388476dcb26fda3?IDType=Reported')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(400)
    expect(res.text).toMatch("Not Found");
});
test('No Query Parameter', async ()=>{
    const res=await request(app).delete('/admin/report/6251d7a07388476dcb26fda3')
    .set('Authorization','Bearer '+admintoken.token)
    .expect(400)
    expect(res.text).toMatch("Wrong Query Parameter");
});

