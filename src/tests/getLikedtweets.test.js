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
    .get("/profile/likedtweets/" + user._id)
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
    .get("/profile/likedtweets/" + user._id)
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
    .get("/profile/likedtweets/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("no liked tweets found", async () => {
  const temptweet = await Tweet.create({
    text: "hello",
    authorId: user._id,
  });
  const res4 = await request(app)
    .get("/profile/likedtweets/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(400);
});

test("liked tweets with likes", async () => {
  const user2 = await User.create({
    screenName: "user2",
    tag: "tag2",
    email: "user2@gmail.com",
    password: "123456",
    verfied:true
  });
  let usertoken2 = await user2.generateAuthToken();
  const temptweet = await Tweet.create({
    text: "hello",
    authorId: user._id,
    likes: [{ like: user2._id }],
  });

  const res4 = await request(app)
    .get("/profile/likedtweets/" + user._id)
    .set("Authorization", "Bearer " + usertoken2.token)
    .expect(200);
});

test("liked tweets with no user", async () => {
  const user2 = "628c272de92feb274201f9b3";
  const temptweet = await Tweet.create({
    text: "hello",
    authorId: user._id,
    likes: [{ like: user._id }],
  });
  const res3 = await request(app)
    .put("/tweet/" + temptweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token);
  const res4 = await request(app)
    .get("/profile/likedtweets/" + user2._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(400);
});

