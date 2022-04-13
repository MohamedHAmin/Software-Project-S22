const request = require('supertest')
const Admin = require('../models/Admin')
const Token = require('../models/Token')
const app = require('../app')
var token;
var admin1;
var admin2;
beforeEach(async ()=>{
    await Admin.deleteMany()
    await Token.deleteMany()
    admin1 = await Admin.create({
        adminName:"admin1",
        email:"admin1@gmail.com",
        password:"123456"
    });
    admin2=await Admin.create({
        adminName:"admin2",
        email:"admin2@gmail.com",
        password:"123456"
    })
    token = await admin1.generateAuthToken();
})
test('Check Admin Retrieve', async ()=>{
    const res=await request(app).get('/admin/profile/'+admin2._id)
    .set('Authorization','Bearer '+token.token)
    .expect(200)
    expect(res.body.admin.adminName).toEqual("admin2")
})
test('Check Non-existing Admin Retrieve', async ()=>{
    await Admin.findByIdAndDelete(admin2._id)
    const res=await request(app).get('/admin/profile/'+admin2._id)
    .set('Authorization','Bearer '+token.token)
    .expect(400)
    //expect(res.body.admin.adminName).toEqual("admin2")
})