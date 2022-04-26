const request = require("supertest");
const User = require("../models/User");
const Token = require("../models/Token");

const app = require("../app");
let user1;
let user1token;
let user2;
let user2token;
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

test('check follow',async ()=>{
   
    const res=await request(app).post('/user/'+user1._id.toString()+'/follow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    
   ///not put user id
    await request(app).post('/user/'+user1._id.toString()+'/follow/')
    .set('Authorization','Bearer '+user1token.token)
    .expect(404)

    //unauthorized
    await request(app).post('/user/'+user1._id.toString()+'/follow/'+user2._id.toString())
    .expect(401)
    //follow some you alresdy follow
     await request(app).post('/user/'+user1._id.toString()+'/follow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)
      // follow your self
    await request(app).post('/user/'+user1._id.toString()+'/follow/'+user1._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)

    //follow unexisting user
    await request(app).post('/user/'+user1._id.toString()+'/follow/'+"6246378467b2fc4cc39ae714")
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)
});
test('check unfollow',async ()=>{
    await request(app).post('/user/'+user1._id.toString()+'/follow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    await request(app).post('/user/'+user1._id.toString()+'/unfollow/')
    .set('Authorization','Bearer '+user1token.token)
    .expect(404)
     await request(app).post('/user/'+user1._id.toString()+'/unfollow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    await request(app).post('/user/'+user1._id.toString()+'/unfollow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)
    await request(app).post('/user/'+user1._id.toString()+'/unfollow/'+"6246378467b2fc4cc39ae714")
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)
});
test('check following',async ()=>{
    await request(app).post('/user/'+user1._id.toString()+'/follow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    const res=await request(app).get('/user/'+user1._id.toString()+'/following/')
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)

  
    await request(app).get('/user/'+"552222222"+'/following/')
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)

});
test('check follower',async ()=>{
    await request(app).post('/user/'+user1._id.toString()+'/follow/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    const res=await request(app).get('/user/'+user2._id.toString()+'/follower/')
    .set('Authorization','Bearer '+user2token.token)
    .expect(200)
   
    expect(res.body[0].screenName).toEqual(user1.screenName)
    expect(res.body[0].isfollowing).toEqual(false)

    await request(app).post('/user/'+user2._id.toString()+'/follow/'+user1._id.toString())
    .set('Authorization','Bearer '+user2token.token)
    .expect(200)
    const res2 =await request(app).get('/user/'+user1._id.toString()+'/follower/')
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    expect(res2.body[0].isfollowing).toEqual(true)
    await request(app).get('/user/'+"552222222"+'/follower/')
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)


});
