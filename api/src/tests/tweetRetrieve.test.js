const request = require("supertest");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const app = require("../app");
let user;
let usertoken;
beforeEach(async () => {
    await Tweet.deleteMany();
    await User.deleteMany();
    user=await User.create({
        screenName: "Youssef Hany",
        tag: "YoussefHany",
        password: "123456",
        email: "yousseftron@gmail.com",
    });
    usertoken=await user.generateAuthToken()
});
//
test('check Retreiving tweet',async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"I am Abdelkhalek"
    })
    const res = await request(app).get('/tweet/'+newtweet._id)
    .set('Authorization','Bearer '+usertoken.token)
    .expect(200)

    expect(res.body.authorId._id).toEqual(user._id.toString())
    expect(res.body.text).toEqual("I am Abdelkhalek")
});

test('Refuse if sent id parameter is not there', async ()=>{
    const res = await request(app).get('/tweet/')
    .set('Authorization','Bearer '+usertoken.token)
    .expect(404)
    //expect(res.body).toEqual({error:"Tweet Id not sent or is null"});
});

test('Tweet not found', async ()=>{
    const res = await request(app).get('/tweet/6243066df28e1b6ae1298655')
    .set('Authorization','Bearer '+usertoken.token)
    .expect(400)
    expect(res.body).toEqual({error:"tweet not found"});
});
