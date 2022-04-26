const request = require("supertest");
const User = require("../../models/User");
const Token = require("../../models/Token");

const app = require("../../app");
let user1;
let user1token;
let user2;
let user2token;
beforeEach(async () => {
  await User.deleteMany();
  await Token.deleteMany();

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

test("check change user data", async () => {
  
  const res2 = await request(app)
    .put("/profile/" + user2._id.toString())
    .set("Authorization", "Bearer " + user2token.token)
    .send({
      screenName: "u1",
      tag: "T1",
    })
   // console.log("🚀 ~ file: changedata.test.js ~ line 35 ~ test ~ res2", res2)

  const res = await request(app)
    .put("/profile/" + user2._id.toString())
    .set("Authorization", "Bearer " + user2token.token)
    .send({
      screenName: "u1",
      tag: "T1",
    })
    .expect(200);

  await request(app)
    .put("/profile/" + user2._id.toString())

    .set("Authorization", "Bearer " + user2token.token)
    .send({
      screenName: "u1",
      password: "888",
    })
    .expect(400);

    await request(app)
    .put("/profile/" + user2._id.toString())

    .set("Authorization", "Bearer " + user2token.token)
    .send({
      location: {
        place:"cairo",
        visability:true
      },
      birth: {
        visability:true
      },
    })
    .expect(200);
    
});

test('change password',async ()=>{
    
     const res=await request(app).put('/profile/'+user1._id.toString()+'/password')
    .set('Authorization','Bearer '+user1token.token)
    .send({
        currentPassword: "123456",
        newPassword: "12345678",
      })
    .expect(200)

    await request(app).put('/profile/'+user1._id.toString()+'/password')
    .set('Authorization','Bearer '+user1token.token)
    .send({
        currentPassword: "a123456858",
        newPassword: "12345678",
      })
    .expect(400)
    
});
