const request = require('supertest')
const Admin = require('../models/Admin')
const Token = require('../models/Token')
const User = require('../models/User')
const app = require('../app')
var token;
var admin;//
beforeEach(async ()=>{
    await Admin.deleteMany()
    await Token.deleteMany()
    await User.deleteMany()

    admin = await Admin.create({
        adminName:"coolAdmin24o",
        email:"cool23o4@gmail.com",
    });
    token = await admin.generateAuthToken();
})
test('Check Admin Creation', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin",
        tag:"admin"
    })
    .expect(201)
    const res2=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"coolAdmin23",
        email:"cool23@.com",
        password:"awesomeadmin",
        tag:"admin"
    })
    .expect(400)
    await request(app).post('/admin/create')
    .set('Authorization','Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQ0MzVlNWNiMTZlZGYyYWI3OWI2OGIiLCJpYXQiOjE2NDg2Mzc0MTN9.5X6CFbeyMus45xdNooJrbkJ-RvV8MMVXuK_6tsVPduA')
    .send({
        screenName:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin",
        tag:"admin2"
    })
    .expect(401)
})
test('Check Email Duplication', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"SuperAdmin14",
        email:"cool23o4@gmail.com",
        password:"superadmin",
        tag:"admin2"
    })
    .expect(400)
})
test('Check Password Length', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"SuperAdmin14",
        email:"cool23@gmail.com",
        password:"super",
        tag:"admin2"

    })
    .expect(400)
    expect(res.text).toMatch("shorter than the minimum allowed length")
})
test('Email Validity', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"SuperAdmin14",
        email:"cool23@gmail",
        password:"superadmin",
        tag:"admin2"

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
})
test('Empty Email', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"SuperAdmin14",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("`email` is required")
})
test('Empty Password', async ()=>{
    const res=await request(app).post('/admin/create')
    .set('Authorization','Bearer '+token.token)
    .send({
        screenName:"SuperAdmin14",
        email:"cool23@gmail.com"
    })
    .expect(400)
    expect(res.text).toMatch("`password` is required")
})