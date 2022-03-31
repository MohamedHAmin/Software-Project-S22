const request = require("supertest");
const Tweet = require("../models/tweet");
const User = require("../models/User");
const app = require("../unittest");

beforeEach(async () => {
  await User.create({
    _id: {
        $oid: "6243029293c3005534908f6c"
    },
    screenName: "Youssef Hany",
    tag: "YoussefHany",
    password: "123456",
    email: "yousseftron@gmail.com",
  });
});

afterEach(async () => {
  await Tweet.deleteMany();
  await User.deleteMany();
});

test('check Retreiving tweet',()=>{
    await Tweet.create({_id:{"$oid":"6243066df28e1b6ae1298632"},replyed:false,replieduser:null,userId:{"$oid":"6243029293c3005534908f6c"},Text:"I am Abdelkhalek",tags:[{tag:"AhmedTarek",_id:{$oid:"6243066df28e1b6ae1298633"}},{tag:"Nouredlin",_id:{$oid:"6243066df28e1b6ae1298634"}}],likes:[{like:{$oid:"624302b293c3005534908f6d"},_id:{$oid:"6243066df28e1b6ae1298635"}},{like:{$oid:"624302d693c3005534908f6e"},_id:{$oid:"6243066df28e1b6ae1298636"}}],retweet:[],createdAt:{$date:"2022-03-29T13:15:25.407Z"},updatedAt:{$date:"2022-03-29T13:15:25.407Z"},__v:0})
    const res = await request(app).get('/tweet/6243066df28e1b6ae1298632').expect(200)

    expect(res.body).toEqual({
        "_id": "6243066df28e1b6ae1298632",
        "replyed": false,
        "replieduser": null,
        "userId": "6243029293c3005534908f6c",
        "Text": "I am Abdelkhalek",
        "tags": [
            {
                "tag": "AhmedTarek",
                "_id": "6243066df28e1b6ae1298633"
            },
            {
                "tag": "Nouredlin",
                "_id": "6243066df28e1b6ae1298634"
            }
        ],
        "likes": [
            {
                "like": "624302b293c3005534908f6d",
                "_id": "6243066df28e1b6ae1298635"
            },
            {
                "like": "624302d693c3005534908f6e",
                "_id": "6243066df28e1b6ae1298636"
            }
        ],
        "retweet": [],
        "createdAt": "2022-03-29T13:15:25.407Z",
        "updatedAt": "2022-03-29T13:15:25.407Z",
        "__v": 0,
        "id": "6243066df28e1b6ae1298632"
    })
});

test('Refuse if sent id parameter is not there', async ()=>{
    const res = await request(app).get('/tweet/').expect(400)
    expect(res.body).toEqual({error:"Tweet Id not sent or is null"});
});

test('Tweet not found', async ()=>{
    const res = await request(app).get('/tweet/6243066df28e1b6ae1298655').expect(400)
    expect(res.body).toEqual({error:"tweet not found"});
});
