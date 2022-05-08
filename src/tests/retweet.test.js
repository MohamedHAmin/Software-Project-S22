const request = require("supertest");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const app = require("../app");
let user;
let usertoken;
beforeEach(async () => {
  await Tweet.deleteMany();
  await User.deleteMany();
  user = await User.create({
    screenName: "Youssef Hany",
    tag: "YoussefHany",
    password: "123456",
    email: "yousseftron@gmail.com",
  });
  usertoken = await user.generateAuthToken();
});

test("Check New retweet Creation", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "Lorem Ipsum",
      retweetedTweet: newtweet._id.toString(),
    })
    .expect(200);
});

test("Check New retweet Creation without text", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "",
      retweetedTweet: newtweet._id.toString(),
    })
    .expect(200);
});

test("refuse nonexistent retweet", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  const nonexitent = "6278242912fa9d396111457e";
  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "",
      retweetedTweet: nonexitent,
    })
    .expect(400);
});

test("character limit exceeded", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      retweetedTweet: newtweet._id,
    })
    .expect(400);
});

test("Bad word found", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "lorem fucking ipsum",
      retweetedTweet: newtweet._id,
    })
    .expect(400);
});

test("tag limit exceeded", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });

  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "lorem",
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
      retweetedTweet: newtweet._id,
    })
    .expect(400);
});
