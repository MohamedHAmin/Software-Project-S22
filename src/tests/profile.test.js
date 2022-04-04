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

test('check profile',async ()=>{
   
    const res=await request(app).get('/user/'+user2._id.toString())
    .set('Authorization','Bearer '+user1token.token)
    .expect(200)
    
    expect(res.body.screenName).toEqual(user2.screenName)

    
    await request(app).get('/user/'+"6246378467b2fc4cc39ae714")
    .set('Authorization','Bearer '+user1token.token)
    .expect(400)
});

