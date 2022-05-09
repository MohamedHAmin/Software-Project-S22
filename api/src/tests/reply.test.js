const request = require("supertest");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const app = require("../app");
let user;
let token;

beforeEach(async () => {
  await Tweet.deleteMany();
  await User.deleteMany();
  user = await User.create({
    screenName: "user1",
    tag: "user1",
    email: "user1@gmail.com",
    password: "123456",
  });
  usertoken = await user.generateAuthToken();
});

test("reply successful", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "new reply",tags:[{tag:""},{tag:"youssef"}] ,replyingTo: newtweet._id })
    .expect(200);
});

test("no replied on tweet", async () => {
  const res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "new reply",replyingTo: "123456789" })
    .expect(400);
});

test("reply has reached character limit", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      replyingTo: newtweet._id,
    })
    .expect(400);
});

test("reply has a bad word", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "fuck", replyingTo: newtweet._id })
    .expect(400);
});

test("reply exceeded tag limit", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "new reply",
      tags: [
        { tag: "Youssef" },
        { tag: "Hany" },
        { tag: "Ahmed" },
        { tag: "Tarek" },
        { tag: "Abdelkhalek" },
        { tag: "Noureldin" },
        { tag: "Hamada" },
        { tag: "Ahmed" },
        { tag: "Mohamed" },
        { tag: "Omar" },
        { tag: "Amr" },
      ],
      replyingTo: newtweet._id,
    })
    .expect(400);
});
