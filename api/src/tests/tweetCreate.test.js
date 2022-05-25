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

test("Check New Tweet Creation", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "Lorem Ipsum",
      tags: ["ahmed","mahamed"],
      likes: [
        { like: "624302b293c3005534908f6d" },
        { like: "624302d693c3005534908f6e" },
      ],
    })
    .expect(200);
});

test("Enter a tweet without tags or likes", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "Lorem Ipsum",
    })
    .expect(200);
});

test("Create a tweet with an empty tag", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "Lorem Ipsum",
      tags: [ "12112" , "Noureldin" ],
      likes: [
        { like: "624302b293c3005534908f6d" },
        { like: "624302d693c3005534908f6e" },
      ],
    })
    .expect(200);
});

test("Create a tweet with no tags", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "Lorem Ipsum",
      likes: [
        { like: "624302b293c3005534908f6d" },
        { like: "624302d693c3005534908f6e" },
      ],
    })
    .expect(200);
});

test("Create a tweet with no likes", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "Lorem Ipsum",
      tags: ["AhmedTarek" ,"Noureldin" ],
    })
    .expect(200);
});

test("Refuse a tweet with no text", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "",
    })
    .expect(400);
  expect(res.body).toEqual({ error: "Empty Post" });
});

test("Refuse a tweet with a bad word", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "lorem fuck ipsum",
    })
    .expect(400);
  expect(res.body).toEqual({ error: "bad word" });
});

test("Refuse a tweet that exceeds character limit", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      authorId: user._id,
      text: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    })
    .expect(400);
  expect(res.body).toEqual({ error: "Post exceeds max length" });
});
////
test("Refuse a tweet that exceeds tag limit", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .send({
      text: "lorem ipsum",
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
    })
    .expect(400);
 // expect(res.body).toEqual({ error: "tags exceeded limit" });
});

 test("post with images", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .field("text", "try this for size dude")
    .field("imageCheck", "true")
    .attach('image','src/tests/fixtures/favicon-32x32.png')
    .expect(400);
    console.log(res.text.error)
});
test("post with images", async () => {
  const res = await request(app)
    .post("/tweet")
    .set("Authorization", "Bearer " + usertoken.token)
    .field("text", "try this for size dude")
    .field("imageCheck", "true")
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .attach('image','src/tests/fixtures/WhatsApp Image 2021-10-22 at 10.31.28 AM (5).jpeg')
    .expect(400);
});