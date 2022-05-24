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
});

test('refuse nonexistent retweet', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"I am Abdelkhalek"
    })
    const nonexitent ="624302b293c3005534908f6d";
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"",
        retweetedTweet:nonexitent
    })
    .expect(400)
});

test('bad word retweet', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"fuck tron"
    })
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"Lorem fuck Ipsum",
        retweetedTweet:newtweet._id.toString()
    })
    .expect(400);
});

test('tag exceeded limit retweet', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"fuck tron"
    })
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"Lorem Ipsum",
        tags:[{ tag: "Youssef" },
        { tag: "Hany" },
        { tag: "Ahmed" },
        { tag: "Tarek" },
        { tag: "Abdelkhalek" },
        { tag: "Noureldin" },
        { tag: "Hamada" },
        { tag: "Ahmed" },
        { tag: "Mohamed" },
        { tag: "Omar" },
        { tag: "Amr" },],
        retweetedTweet:newtweet._id.toString()
    })
    .expect(400);
});

test('post exceeded character limit retweet', async ()=>{
    const newtweet=await Tweet.create({
        "authorId":user._id,
        "text":"tron"
    })
    const res=await request(app).post('/retweet')
    .set('Authorization','Bearer '+usertoken.token)
    .send({
        text:"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        retweetedTweet:newtweet._id.toString()
    })
    .expect(400);
});

