const request = require("supertest");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const app = require("../app");
let user;
let privUser;
let notPrivUser;
let thrdUser;
let usertoken;
beforeEach(async () => {
  await Tweet.deleteMany();
  await User.deleteMany();
  thrdUser = await User.create({
    screenName: "user3",
    tag: "tag3",
    password: "123456",
    email: "user3@gmail.com",
  });
  notPrivUser = await User.create({
    screenName: "userN",
    tag: "tagN",
    password: "123456",
    email: "userN@gmail.com",
  });
  user = await User.create({
    screenName: "user1",
    tag: "tag1",
    password: "123456",
    email: "user1@gmail.com",
  });
  privUser = await User.create({
    screenName: "userpriv",
    tag: "privtag",
    password: "123456",
    email: "privuser@gmail.com",
    isPrivate:true
  });
  usertoken = await user.generateAuthToken();
})
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

test("Private Reply Not Visible", async () => {
  usertoken = await thrdUser.generateAuthToken();
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: privUser._id,
    text: "Private Reply",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: notPrivUser._id,
    text: "Not Private Reply",
  });
  const res = await request(app)
    .get("/tweet/"+newtweet._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
  expect(res.body.reply.length).toEqual(1);
});
test("Private Reply Visible for Tweet Author", async () => {
  usertoken = await user.generateAuthToken();
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: privUser._id,
    text: "Private Reply",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: notPrivUser._id,
    text: "Not Private Reply",
  });
  const res = await request(app)
    .get("/tweet/"+newtweet._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
  expect(res.body.reply.length).toEqual(2);
});
test("Private Reply Visible for Reply Author", async () => {
  usertoken = await privUser.generateAuthToken();
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: privUser._id,
    text: "Private Reply",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: notPrivUser._id,
    text: "Not Private Reply",
  });
  const res = await request(app)
    .get("/tweet/"+newtweet._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
  expect(res.body.reply.length).toEqual(2);
});
test("Private Reply Visible for Follower", async () => {
  usertoken = await thrdUser.generateAuthToken();
  privUser.isPrivate=false;
  privUser.save();
  await request(app)
    .post("/user/"+thrdUser._id+"/follow/"+privUser._id)
    .set("Authorization", "Bearer " + usertoken.token);
  privUser.isPrivate=true;
  privUser.save();
  const newtweet = await Tweet.create({
    authorId: user._id,
    text: "I am Abdelkhalek",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: privUser._id,
    text: "Private Reply",
  });
  await Tweet.create({
    replyingTo:{
      tweetId:newtweet._id,
      tweetExisted:true
    },
    authorId: notPrivUser._id,
    text: "Not Private Reply",
  });
  const res = await request(app)
    .get("/tweet/"+newtweet._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
  expect(res.body.reply.length).toEqual(2);
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

test("Get all user's tweets but he has no tweets", async () => {
  const res = await request(app)
    .get("/tweet/user/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
   // .expect(200);
});

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