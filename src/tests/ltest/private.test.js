const request = require("supertest");
const User = require("../../models/User");
const Token = require("../../models/Token");
const PrivateRequest = require("../../models/PrivateRequest");


const app = require("../../app");
let user1;
let user1token;
let user2;
let user2token;
beforeEach(async () => {
  await User.deleteMany();
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

test("check user private req", async () => {
    const private2 = new PrivateRequest({
        requestUser: user1._id,
        userId: user2._id,
      });
      await private2.save()

  const res2 = await request(app)
  .get("/privateRequest")
  .set("Authorization", "Bearer " +user1token.token).expect(200);
 
  const res = await request(app)
  .get("/acceptRequest/"+user2._id.toString())
  .set("Authorization", "Bearer " +user1token.token);
 
});