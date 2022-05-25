const request = require("supertest");
const User = require("../../models/User");
const Token = require("../../models/Token");

const app = require("../../app");


let user1;
let user1token;
let user2;
let user2token;
let imageId
beforeAll(() => jest.setTimeout(90 * 1000))
beforeEach(async () => {
    await User.deleteMany();
    await Token.deleteMany();

    user1=await User.create({

        screenName: "User1",
        tag: "US1",
        password: "123456",
        email: "User1@gmail.com",
        location:{
            place:"cairo",
            visability:false
          },
          birth:{
            date:"2022-04-24T13:35:32.392Z",
            visability:false
          }
    });

    user1token=await user1.generateAuthToken()
    user2=await User.create({
        screenName: "User2",
        tag: "US2",
        password: "123456",
        email: "User2@gmail.com",
        location:{
            place:"cairo",
            visability:false
          },
          birth:{
            date:"2022-04-24T13:35:32.392Z",
            visability:false
          }
    });
    user2token=await user2.generateAuthToken()
});

 test('check profile',async ()=>{
   
     const res=await request(app).get('/profile/'+user1._id.toString())
     .set('Authorization','Bearer '+user1token.token)
     .expect(200)
     jest.setTimeout(30000);
    
     await request(app).get('/profile/'+"6246378467b2fc4cc39ae714")
     .set('Authorization','Bearer '+user1token.token)
     .expect(400)
 });

test('check profile',async ()=>{

     res=await request(app).get('/profile/'+user1._id.toString()+'/me')
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
 
});
test('check upload profile image',async ()=>{
    jest.setTimeout(30000);
    
    const res=await request(app).put('/profile/'+user1._id.toString()+'/avater')
    .set('Authorization','Bearer '+user1token.token)
    .attach('image','src/tests/fixtures/favicon-32x32.png')
    
    const res2=await request(app).put('/profile/'+user1._id.toString()+'/avater')
    .set('Authorization','Bearer '+user1token.token)
    .attach('image','src/tests/fixtures/favicon-32x32.png')
   
});
test('check upload profile image fail',async ()=>{
   
     await request(app).put('/profile/'+user2._id.toString()+'/avater')
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)


});
test('check upload profile banner',async ()=>{
    jest.setTimeout(30000);
    const res=await request(app).put('/profile/'+user1._id.toString()+'/banner')
    .set('Authorization','Bearer '+user1token.token)
    .attach('image','src/tests/fixtures/favicon-32x32.png')
    jest.setTimeout(30000);
    const res2=await request(app).put('/profile/'+user1._id.toString()+'/banner')
    .set('Authorization','Bearer '+user1token.token)
    .attach('image','src/tests/fixtures/favicon-32x32.png')
    .expect(400)
    console.log(res.text.error)
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
