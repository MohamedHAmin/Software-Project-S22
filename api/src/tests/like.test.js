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
  user2 = await User.create({
    screenName: "user2",
    tag: "user2",
    email: "user2@gmail.com",
    password: "123456",
  });
  usertoken = await user.generateAuthToken();
  usertoken2 = await user2.generateAuthToken();
});

test("Like a tweet", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  const res = await request(app)
    .put("/tweet/" + newtweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(201);
});

test("unlike a tweet", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
    likes: [{ like: user._id }],
    likeCount:1
  });
  const res2 = await request(app)
    .put("/tweet/" + newtweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(201);
});

test("unlike a tweet at more than one like", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
    likes: [{ like: user._id }, { like: user2._id }],
    likeCount:2
  });
  const res2 = await request(app)
    .put("/tweet/" + newtweet._id + "/like")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(201);
});

test("Like a non existent tweet", async () => {
  const res = await request(app)
    .put("/tweet/625d9eec87b1064f302bea2b/like")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(400);
});
