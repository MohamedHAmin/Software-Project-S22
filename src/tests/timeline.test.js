const request = require("supertest");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const app = require("../app");
let user, user2, user3, user4, user5;
let token;

beforeEach(async () => {
  await Tweet.deleteMany();
  await User.deleteMany();
  user2 = await User.create({
    screenName: "user2",
    tag: "user2",
    email: "user2@gmail.com",
    password: "123456",
  });
  user3 = await User.create({
    screenName: "user3",
    tag: "user3",
    email: "user3@gmail.com",
    password: "123456",
  });
  user4 = await User.create({
    screenName: "user4",
    tag: "user4",
    email: "user4@gmail.com",
    password: "123456",
  });
  user5 = await User.create({
    screenName: "user5",
    tag: "user5",
    email: "user5@gmail.com",
    password: "123456",
  });

  usertoken2 = await user2.generateAuthToken();
  usertoken3 = await user3.generateAuthToken();
  usertoken4 = await user4.generateAuthToken();
  usertoken5 = await user5.generateAuthToken();
});

test("Timeline route check", async () => {
  user = await User.create({
    screenName: "user",
    tag: "user",
    email: "user@gmail.com",
    password: "123456",
    following: [
      { followingId: user2._id },
      { followingId: user3._id },
      { followingId: user4._id },
      { followingId: user5._id },
    ],
  });

  usertoken = await user.generateAuthToken();
  const user2tweet1 = await Tweet.create({
    authorId: user2._id,
    text: "user2 first tweet",
  });
  const user2tweet2 = await Tweet.create({
    authorId: user2._id,
    text: "user2 second tweet",
    tags: [{ tag: user3.tag }],
    likes: [{ like: user3._id }, { like: user5._id }],
    retweetCount: 1,
  });
  const user3tweet1 = await Tweet.create({
    authorId: user3._id,
    text: "user3 first tweet",
    tags: [{ tag: user3.tag }],
    likes: [{ like: user3._id }, { like: user5._id }],
    retweetedTweet: user2tweet2._id,
  });
  const user2tweet3 = await Tweet.create({
    authorId: user2._id,
    text: "user2 third tweet",
    likes: [{ like: user4._id }, { like: user3._id }, { like: user._id }],
  });
  const user4tweet1 = await Tweet.create({
    authorId: user4._id,
    text: "user4 first tweet",
    likes: [{ like: user._id }],
  });
  const user5tweet1 = await Tweet.create({
    authorId: user5._id,
    text: "user5 first tweet",
    likes: [{ like: user._id }],
    retweetedTweet: user4tweet1._id,
  });
  const res = await request(app)
    .get("/timeline")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("Timeline route check with no followers", async () => {
  user = await User.create({
    screenName: "user",
    tag: "user",
    email: "user@gmail.com",
    password: "123456",
  });

  usertoken = await user.generateAuthToken();
  const res = await request(app)
    .get("/timeline")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("Timeline route check with followed users but users didn't tweet", async () => {
  user = await User.create({
    screenName: "user",
    tag: "user",
    email: "user@gmail.com",
    password: "123456",
    following: [
      { followingId: user2._id },
      { followingId: user3._id },
      { followingId: user4._id },
      { followingId: user5._id },
    ],
  });
  usertoken = await user.generateAuthToken();
  const res = await request(app)
    .get("/timeline")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("Timeline route check with skip",async ()=>{
  user = await User.create({
    screenName: "user",
    tag: "user",
    email: "user@gmail.com",
    password: "123456",
    following: [
      { followingId: user2._id },
      { followingId: user3._id },
      { followingId: user4._id },
      { followingId: user5._id },
    ],
  });
  usertoken = await user.generateAuthToken();

  const user2tweet1 = await Tweet.create({
    authorId: user2._id,
    text: "user2 first tweet",
  });
  const user2tweet2 = await Tweet.create({
    authorId: user2._id,
    text: "user2 second tweet",
    tags: [{ tag: user3.tag }],
    likes: [{ like: user3._id }, { like: user5._id }],
    retweetCount: 1,
  });
  const user3tweet1 = await Tweet.create({
    authorId: user3._id,
    text: "user3 first tweet",
    tags: [{ tag: user3.tag }],
    likes: [{ like: user3._id }, { like: user5._id }],
    retweetedTweet: user2tweet2._id,
  });
  const user2tweet3 = await Tweet.create({
    authorId: user2._id,
    text: "user2 third tweet",
    likes: [{ like: user4._id }, { like: user3._id }, { like: user._id }],
  });
  const user4tweet1 = await Tweet.create({
    authorId: user4._id,
    text: "user4 first tweet",
    likes: [{ like: user._id }],
  });
  const user5tweet1 = await Tweet.create({
    authorId: user5._id,
    text: "user5 first tweet",
    likes: [{ like: user._id }],
    retweetedTweet: user4tweet1._id,
  });
  const res = await request(app)
    .get("/timeline?skip=5")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});

test("Timeline route check with skip",async ()=>{
  user = await User.create({
    screenName: "user",
    tag: "user",
    email: "user@gmail.com",
    password: "123456",
    following: [
      { followingId: user2._id },
      { followingId: user3._id },
      { followingId: user4._id },
      { followingId: user5._id },
    ],
  });
  usertoken = await user.generateAuthToken();

  const user2tweet1 = await Tweet.create({
    authorId: user2._id,
    text: "user2 first tweet",
  });
  const user2tweet2 = await Tweet.create({
    authorId: user2._id,
    text: "user2 second tweet",
    tags: [{ tag: user3.tag }],
    likes: [{ like: user3._id }, { like: user5._id }],
    retweetCount: 1,
  });
  const user3tweet1 = await Tweet.create({
    authorId: user3._id,
    text: "user3 first tweet",
    tags: [{ tag: user3.tag }],
    likes: [{ like: user3._id }, { like: user5._id }],
    retweetedTweet: user2tweet2._id,
  });
  const user2tweet3 = await Tweet.create({
    authorId: user2._id,
    text: "user2 third tweet",
    likes: [{ like: user4._id }, { like: user3._id }, { like: user._id }],
  });
  const user4tweet1 = await Tweet.create({
    authorId: user4._id,
    text: "user4 first tweet",
    likes: [{ like: user._id }],
  });
  const user5tweet1 = await Tweet.create({
    authorId: user5._id,
    text: "user5 first tweet",
    likes: [{ like: user._id }],
    retweetedTweet: user4tweet1._id,
  });
  const res = await request(app)
    .get("/timeline?skip=2&limit=2")
    .set("Authorization", "Bearer " + usertoken.token)
    .expect(200);
});