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
    screenName: "user1",
    tag: "tag1",
    password: "123456",
    email: "user1@gmail.com",
  });
  usertoken = await user.generateAuthToken();
});
//
test("check Retreiving tweet", async () => {
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  const res = await request(app)
    .get("/tweet/" + newtweet._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);

  expect(res.body.authorId._id).toEqual(user._id.toString());
  expect(res.body.text).toEqual("I am Abdelkhalek");
});

test("Refuse if sent id parameter is not there", async () => {
  const res = await request(app)
    .get("/tweet/")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(404);
  //expect(res.body).toEqual({error:"Tweet Id not sent or is null"});
});

test("Tweet not found", async () => {
  const res = await request(app)
    .get("/tweet/6243066df28e1b6ae1298655")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(400);
  expect(res.body).toEqual({ error: "tweet not found" });
});

test("Get all user's tweets", async () => {
  const user2 = await User.create({
    screenName: "user2",
    tag: "tag2",
    password: "123456",
    email: "user2@gmail.com",
  });
  const user2token = user2.generateAuthToken();

  const tweet1 = await Tweet.create({
    authorId: user._id,
    text: "new tweet 1",
  });
  const tweet2 = await Tweet.create({
    authorId: user._id,
    text: "new tweet 2",
    likes: [{ like: user2._id }],
  });
  const tweet3 = await Tweet.create({
    authorId: user2._id,
    text: "new tweet 3",
    retweetCount: 1,
  });
  const tweet4 = await Tweet.create({
    authorId: user._id,
    text: "new tweet 4",
    retweetedTweet: tweet3._id,
  });

  const res = await request(app)
    .get("/tweet/user/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

// test("Get all user's tweets but he has no tweets", async () => {
//   const res = await request(app)
//     .get("/tweet/user/" + user._id)
//     .set("Authorization", "Bearer " + usertoken.token)
//     .expect(200);
// });

test("Get retweet with No-text in text element on a retweet", async () => {
  const user2 = await User.create({
    screenName: "user2",
    tag: "tag2",
    password: "123456",
    email: "user2@gmail.com",
  });
  const tweet3 = await Tweet.create({
    authorId: user2._id,
    text: "new tweet 3",
    retweetCount: 1,
  });
  const tweet4 = await Tweet.create({
    authorId: user._id,
    text: "No-text",
    retweetedTweet: tweet3._id,
  });
  const res = await request(app)
    .get("/tweet/" + tweet4._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});