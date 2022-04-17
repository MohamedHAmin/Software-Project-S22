const request = require("supertest");
const Tweet = require("../models/tweet");
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

test('Check New retweet Creation', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"I am Abdelkhalek"
    })
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"Lorem Ipsum",
        retweetedTweet:newtweet._id.toString()
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Retweet Stored"});
});

test('Check New retweet Creation without text', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"I am Abdelkhalek"
    })
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"",
        retweetedTweet:newtweet._id.toString()
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Retweet Stored"});
});

test('refuse nonexistent retweet', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"I am Abdelkhalek"
    })
    const nonexitent =123456789
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"",
        retweetedTweet:nonexitent.toString()
    })
    .expect(400)
});