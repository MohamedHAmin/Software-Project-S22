const request = require('supertest')
const Admin = require('../models/admin')
const app = require('../unittest')
beforeEach(async ()=>{
    await Admin.deleteMany()
})
test('Check Admin Creation', async ()=>{
    const res=await request(app).post('/admin/create')
    .send({
        admin_name:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    .expect(200)
    expect(res.body.admin.admin_name).toEqual("coolAdmin23")
    expect(res.body.admin.email).toEqual("cool23@gmail.com")
})
test('Check Email Duplication', async ()=>{
    await Admin.create({
        admin_name:"coolAdmin23",
        email:"cool23@gmail.com",
        password:"awesomeadmin"
    })
    const res=await request(app).post('/admin/create')
    .send({
        admin_name:"SuperAdmin14",
        email:"cool23@gmail.com",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("duplicate key")
})
test('Check Password Length', async ()=>{
    const res=await request(app).post('/admin/create')
    .send({
        admin_name:"SuperAdmin14",
        email:"cool23@gmail.com",
        password:"super"
    })
    .expect(400)
    expect(res.text).toMatch("shorter than the minimum allowed length")
})
test('Email Validity', async ()=>{
    const res=await request(app).post('/admin/create')
    .send({
        admin_name:"SuperAdmin14",
        email:"cool23@gmail",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("not valid email")
})
test('Empty Name', async ()=>{
    const res=await request(app).post('/admin/create')
    .send({
        email:"cool23@gmail.com",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("`admin_name` is required")
})
test('Empty Email', async ()=>{
    const res=await request(app).post('/admin/create')
    .send({
        admin_name:"SuperAdmin14",
        password:"superadmin"
    })
    .expect(400)
    expect(res.text).toMatch("`email` is required")
})
test('Empty Password', async ()=>{
    const res=await request(app).post('/admin/create')
    .send({
        admin_name:"SuperAdmin14",
        email:"cool23@gmail.com"
    })
    .expect(400)
    expect(res.text).toMatch("`password` is required")
})