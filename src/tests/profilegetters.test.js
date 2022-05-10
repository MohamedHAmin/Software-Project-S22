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
    .attach("image", "src/tests/fixtures/favicon-32x32.png")
    .attach("image", "src/tests/fixtures/favicon-32x32.png");

  res = await request(app)
    .get("/profile/media")
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
    .get("/profile/media")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({})
    .expect(200);
});
