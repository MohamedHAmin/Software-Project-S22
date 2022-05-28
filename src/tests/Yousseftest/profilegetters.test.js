const request = require('supertest');
const Tweet = require("../../models/Tweet");
const User = require("../../models/User");
const app = require("../../app");
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

test("get all user media", async () => {
  let res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "bruh",
    });
  res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .field("text", "try this for size dude")
    .field("imageCheck", "true")
    .attach("image", "/src/tests/Yousseftest/fixtures/favicon-32x32.png")
    .attach("image", "/src/tests/Yousseftest/fixtures/favicon-32x32.png");

  res = await request(app)
    .get("/profile/media/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(200);
});

test("get all user replies", async () => {
  const tweet = await Tweet.create({ text: "tweet1", authorId: user._id });

  let res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "reply", replyingTo: tweet._id });

  res = await request(app)
    .post("/reply")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({ text: "reply2", replyingTo: tweet._id });
  res = await request(app)
    .get("/profile/replies/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(200);
});

test("get all user media with a like", async () => {
  let newtweet = await Tweet.create({
    authorId: user._id,
    text: "test",
    gallery: [{ photo: "photo" }],
    likes: [{ like: user._id }],
  });
  res = await request(app)
    .get("/profile/media/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(200);
});

test("get all user media with a deleted reply", async () => {
  let newtweet = await Tweet.create({
    authorId: user._id,
    text: "test",
    gallery: [{ photo: "photo" }],
    likes: [{ like: user._id }],
    replyingTo: { tweetId: user._id, tweetExisted: true },
  });
  res = await request(app)
    .get("/profile/media/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(200);
});

test("get all user media with no media tweets", async () => {
  let newtweet = await Tweet.create({
    authorId: user._id,
    text: "test",
    likes: [{ like: user._id }],
    replyingTo: { tweetId: user._id, tweetExisted: true },
  });
  res = await request(app)
    .get("/profile/media/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(400);
});

test("get all user media but user is not allowed to view", async () => {
  let user2 = await User.create({
    screenName: "user2",
    tag: "tag2",
    password: "123456",
    email: "user2@gmail.com",
    isPrivate: true,
  });
  let usertoken2 = await user2.generateAuthToken();
  let newtweet = await Tweet.create({
    authorId: user2._id,
    text: "test",
    gallery: [{ photo: "photo" }],
    likes: [{ like: user._id }],
  });
  res = await request(app)
    .get("/profile/media/" + user2._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(400);
});

test("get all user media but user doesn't exist", async () => {
  let user2 = "628c272de92feb274201f9b3";
  let newtweet = await Tweet.create({
    authorId: user._id,
    text: "test",
    gallery: [{ photo: "photo" }],
    likes: [{ like: user._id }],
  });
  res = await request(app)
    .get("/profile/media/" + user2)
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(400);
});

test("get all user replies", async () => {
  let res = await request(app)
    .get("/profile/replies/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(400);
});

test("get all user replies with likes", async () => {
  const tweet = await Tweet.create({ text: "tweet1", authorId: user._id });
  const reply1 = await Tweet.create({
    text: "reply1",
    authorId: user._id,
    replyingTo: { tweetId: tweet._id, tweetExisted: true },
    likes: [{ like: user._id }],
  });

  let res = await request(app)
    .get("/profile/replies/" + user._id)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(200);
});

test("get all user replies with no user", async () => {
  const tweet = await Tweet.create({ text: "tweet1", authorId: user._id });
  const reply1 = await Tweet.create({
    text: "reply1",
    authorId: user._id,
    replyingTo: { tweetId: tweet._id, tweetExisted: true },
    likes: [{ like: user._id }],
  });
  let user2 = "628c272de92feb274201f9b3";
  let res = await request(app)
    .get("/profile/replies/" + user2)
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(400);
});
