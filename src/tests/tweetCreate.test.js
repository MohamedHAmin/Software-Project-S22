const request=require('supertest');
const Tweet=require('../models/tweet');
const User=require('../models/User');
const app=require('../unittest');

beforeEach(async ()=>{
    await Tweet.deleteMany();
    await User.deleteMany();
});

test('Check New Tweet Creation', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"Lorem Ipsum",
        tags:[{tag:"AhmedTarek"},{tag:"Noureldin"}],
        likes:[{like:"624302b293c3005534908f6d"},{like:"624302d693c3005534908f6e"}]
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Tweet Stored"});
});

test('Enter a tweet without tags or likes',async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"Lorem Ipsum",
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Tweet Stored"});
});

test('Create a tweet with an empty tag', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"Lorem Ipsum",
        tags:[{tag:""},{tag:"Noureldin"}],
        likes:[{like:"624302b293c3005534908f6d"},{like:"624302d693c3005534908f6e"}]
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Tweet Stored"});
});

test('Create a tweet with no tags', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"Lorem Ipsum",
        likes:[{like:"624302b293c3005534908f6d"},{like:"624302d693c3005534908f6e"}]
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Tweet Stored"});
});

test('Create a tweet with no likes', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"Lorem Ipsum",
        tags:[{tag:"AhmedTarek"},{tag:"Noureldin"}]
    })
    .expect(200)
    expect(res.body).toEqual({AddedTweetStatus: "Tweet Stored"});
});

test('Refuse a tweet with no text', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:""
    })
    .expect(400)
    expect(res.body).toEqual({error: "Empty Post"});
});

test('Refuse a tweet with a bad word', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"lorem fuck ipsum"
    })
    .expect(400)
    expect(res.body).toEqual({error: "bad word"});
});

test('Refuse a tweet that exceeds character limit', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    })
    .expect(400)
    expect(res.body).toEqual({error: "Post exceeds max length"});
});

test('Refuse a tweet that exceeds tag limit', async ()=>{
    const res=await request(app).post('/tweet')
    .send({
        userId:"6243029293c3005534908f6c",
        Text:"lorem ipsum",
        tags:[{tag:"Youssef"},{tag:"Hany"},{tag:"Ahmed"},{tag:"Tarek"},{tag:"Abdelkhalek"},{tag:"Noureldin"},{tag:"Hamada"},{tag:"Ahmed"},{tag:"Mohamed"},{tag:"Omar"},{tag:"Amr"}]
    })
    .expect(400)
    expect(res.body).toEqual({error: "tags exceeded limit"});
});

