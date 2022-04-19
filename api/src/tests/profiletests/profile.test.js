const request = require("supertest");
const User = require("../../models/User");
const Token = require("../../models/Token");

const app = require("../../app");


let user1;
let user1token;
let user2;
let user2token;
let imageId
beforeEach(async () => {
    await User.deleteMany();
    await Token.deleteMany();

    user1=await User.create({

        screenName: "User1",
        tag: "US1",
        password: "123456",
        email: "User1@gmail.com",
    });

    user1token=await user1.generateAuthToken()
    user2=await User.create({
        screenName: "User2",
        tag: "US2",
        password: "123456",
        email: "User2@gmail.com",
    });
    user2token=await user2.generateAuthToken()
});

test('check profile',async ()=>{
   
    const res=await request(app).get('/profile/'+user1._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    
    expect(res.body.screenName).toEqual(user1.screenName)

    
    await request(app).get('/profile/'+"6246378467b2fc4cc39ae714")
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)
});

test('check profile',async ()=>{
       
   
     res=await request(app).get('/profile/'+user1._id.toString()+'/me')
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    expect(res.body.screenName).toEqual(user1.screenName)


});
test('check upload profile image',async ()=>{
   
    await request(app).put('/profile/'+user1._id.toString()+'/avater')
    .set('Authorization','Bearer '+user1token.token)
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .expect(200)
   
});
test('check upload profile image fail',async ()=>{
   
     await request(app).put('/profile/'+user2._id.toString()+'/avater')
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)


});
test('check upload profile banner',async ()=>{
   
    await request(app).put('/profile/'+user1._id.toString()+'/banner')
    .set('Authorization','Bearer '+user1token.token)
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .expect(200)


});
test('check upload profile banner fail',async ()=>{
   
    await request(app).put('/profile/'+user2._id.toString()+'/banner')
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)

});

test('check delete profile banner',async ()=>{
   
     await request(app).delete('/profile/'+user1._id.toString()+'/banner')
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)

});

test('check delete profile image',async ()=>{
   

     await request(app).delete('/profile/'+user1._id.toString()+'/avater')
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)

});
