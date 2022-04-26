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

test("get liked tweets with retweets and replies", async () => {
  const temptweet = await Tweet.create({
    text: "hello",
    authorId: user._id,
  });
  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "retweet", retweetedTweet: temptweet._id });
  const res2 = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "reply", replyingTo: temptweet._id });
  const res3 = await request(app)
    .put("/tweet/" + temptweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token);
  const res4 = await request(app)
    .get("/profile/likedtweets")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("get liked tweet with no retweets", async () => {
  const temptweet = await Tweet.create({
    text: "hello",
    authorId: user._id,
  });
  const res2 = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "reply", replyingTo: temptweet._id });
  const res3 = await request(app)
    .put("/tweet/" + temptweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token);
  const res4 = await request(app)
    .get("/profile/likedtweets")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("get liked tweets with no replies", async () => {
  const temptweet = await Tweet.create({
    text: "hello",
    authorId: user._id,
  });
  const res = await request(app)
    .post("/retweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "retweet", retweetedTweet: temptweet._id });
  const res3 = await request(app)
    .put("/tweet/" + temptweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token);
  const res4 = await request(app)
    .get("/profile/likedtweets")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("no liked tweets found", async () => {
    const temptweet = await Tweet.create({
      text: "hello",
      authorId: user._id,
    });
    const res4 = await request(app)
      .get("/profile/likedtweets")
      .set("Authorization", "Bearer " + usertoken.token)
      .expect(400);
  });