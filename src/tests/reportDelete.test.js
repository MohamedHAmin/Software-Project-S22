const request=require('supertest');
//const Tweet=require('../models/Tweet');
const Admin=require('../models/Admin');
const User=require('../models/User');
const Report=require('../models/Report');
const app=require('../app');
let report;
let user1;
let user2;
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
    admin=await Admin.create({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    report=await Report.create({
        reporterId:user1._id,
        type:"Tweet",
        msg:"Report1",
        reportedId:user2._id
    })
    admintoken=await admin.generateAuthToken();
});

test('Delete a Report', async ()=>{
    const res=await request(app).delete('/admin/report/'+report._id)
    .set('Authorization','Bearer '+admintoken.token)
    .expect(200)
    expect(res.body.deletedreport.msg).toEqual(report.msg);
});
test('Delete an Unexisting Report', async ()=>{
    const res=await request(app).delete('/admin/report/'+"6251d7a07388476dcb26fda4")
    .set('Authorization','Bearer '+admintoken.token)
    .expect(400)
    expect(res.text).toMatch("Not Found");
});


