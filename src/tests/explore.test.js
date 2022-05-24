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
    tag: "user1",
    email: "user1@gmail.com",
    password: "123456",
  });
  usertoken = await user.generateAuthToken();
});

test("explore sucessful", async () => {
  const user2 = await User.create({
    screenName: "user2",
    tag: "user2",
    email: "user2@gmail.com",
    password: "123456",
  });
  const usertoken2 = await user2.generateAuthToken();
  const user3 = await User.create({
    screenName: "user3",
    tag: "user3",
    email: "user3@gmail.com",
    password: "123456",
  });
  const usertoken3 = await user3.generateAuthToken();
  const tweet2 = request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken2.token)
    .send({
      authorId: user2._id,
      text: "Lorem Ipsum",
    });
  const tweet3 = request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken3.token)
    .send({
      authorId: user3._id,
      text: "Lorem Ipsum",
    });
  const res = request(app)
    .get("/explore")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);

});
