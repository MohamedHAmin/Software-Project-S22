const request = require("supertest");
const User = require("../../models/User");
const Token = require("../../models/Token");
const Notification = require("../../models/Notification");


const app = require("../../app");
let user1;
let user1token;
let user2;
let user2token;
beforeEach(async () => {
  await User.deleteMany();
  await Notification.deleteMany();

  user1 = await User({
    screenName: "User1",
    tag: "US1",
    password: "123456",
    email: "User1@gmail.com",
    location:{
      place:"cairo",
      visability:false
    },
    birth:{
      date:"2022-04-24T13:35:32.392Z",
      visability:false
    }
  });
  user1.save()

  user1token = await user1.generateAuthToken();
  user2 = await User.create({
    screenName: "User2",
    tag: "US2",
    password: "123456",
    email: "User2@gmail.com",
  });
  user2token = await user2.generateAuthToken();
});

test("check user Notification", async () => {
    const notificationseed=[

{
    "text" : "unfollow you",
    "notifiedUId" : user1._id,
    "userId" : "62656c0913e93cec7e034f1e",
    "tweetId" : null,
},
{
    "text" : "start follow you",
    "notifiedUId" : user1._id,
    "userId":"62656c0913e93cec7e034f1e",
},
{
    "text" : "unfollow you",
    "notifiedUId" : user1._id,
    "userId" :"62656c0913e93cec7e034f1e",
},
{
    "text" : "start follow you",
    "notifiedUId" : user1._id,
    "userId" :"62656c0913e93cec7e034f1e",
    "tweetId" : null,
}]
    await Notification.insertMany(notificationseed)
  const res2 = await request(app)
  .get("/notification")
  .set("Authorization", "Bearer " +user1token.token);
   
});