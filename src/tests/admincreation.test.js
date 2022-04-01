const request = require('supertest')
const Admin = require('../models/Admin')
const Token = require('../models/Token')
const app = require('../app')
var token;
var admin;
beforeEach(async ()=>{
    await Admin.deleteMany()
    await Token.deleteMany()
    admin = await Admin.create({
        adminName:"coolAdmin24o",
        email:"cool23o4@gmail.com",
        password:"awesomeadmin"
    });
    token = await admin.generateAuthToken();
})
test('Check Admin Creation', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    .expect(201)
    expect(res.body.admin.adminName).toEqual("coolAdmin23")
    expect(res.body.admin.email).toEqual("cool23@gmail.com")
    await request(app).post('/admin/create')
    .set('Authorization','Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MzVlNWNiMTZlZGYyYWI3OWI2OGIiLCJpYXQiOjE2NDg2Mzc0MTN9.5X6CFbeyMus45xdNooJrbkJ-RvV8MMVXuK_6tsVPduA')
    .send({
        adminName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    .expect(401)
})
test('Check Email Duplication', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        adminName:"SuperAdmin14",
        email:"cool23o4@gmail.com",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("duplicate key")
})
test('Check Password Length', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        adminName:"SuperAdmin14",
        email:"cool23@gmail.com",
        password:"super"
    })
    .expect(400)
    expect(res.text).toMatch("shorter than the minimum allowed length")
})
test('Email Validity', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        adminName:"SuperAdmin14",
        email:"cool23@gmail",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("not valid email")
})
test('Empty Name', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        email:"cool23@gmail.com",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("`adminName` is required")
})
test('Empty Email', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        adminName:"SuperAdmin14",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("`email` is required")
})
test('Empty Password', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        adminName:"SuperAdmin14",
        email:"cool23@gmail.com"
    })
    .expect(400)
    expect(res.text).toMatch("`password` is required")
})