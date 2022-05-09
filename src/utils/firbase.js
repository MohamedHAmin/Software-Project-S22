var FCM = require("fcm-node");
var serverKey =
  "AAAAYEVSeVA:APA91bHPmABhzCjqn_Nf9sCLIplOHTTX9XL9JtYDSjSkkWNIPFdddqYnjTkiVXnVXi_dIyy-_rKK0AMVujcPPx8uN8DmOLeDIrKC1kiSgFhpfNxXZOGJPRgoGcLemQaATO7R6q5XNa1P"; //put your server key here
var fcm = new FCM(serverKey);

const Token=require('../models/Token')
const Notification=require('../models/Notification')
const User=require('../models/User')



const sendNotification = async (user, body,topic,type = "user") => {
console.log("🚀 ~ file: firbase.js ~ line 9 ~ sendNotification ~ user", user)
   fcmtoken=user;
   if (type === "newtweet"){ 
    await user.populate({
      path: "following.followingId",

      select: '_id screenName tag Notificationssetting  ',
    
    })
    let users=user.following
    users=users.filter(usr=>{
      return usr.followingId.Notificationssetting.newtweet===true
    })
    const followingsId = users.map((user) => {
      return user.followingId._id;
    });
    let notifications=[]
    for (let index = 0; index < users.length; index++) {
      notifications[index]={
        userId: user._id, text:body,notifiedUId:users[index].followingId._id
      }
      
    }
    const notifications2 =  await Notification.insertMany(notifications);
    let tokens = await Token.find({ ownerId: { $in: followingsId } });
   // let tokens = await Token.find({ ownerId: { $in: followingsId } });

    if(!tokens||tokens.length===0){
        return}
        const untokens=tokens.map(token=>token.fcmToken)
        var uniqueArray = [...new Set(untokens)]
        fcmtoken=uniqueArray.filter(t=>t!=null)

    } 
    console.log("🚀 ~ file: firbase.js ~ line 24 ~ fcm.subscribeToTopic ~ fcmtoken", fcmtoken)
    console.log("🚀 ~ file: firbase.js ~ line 25 ~ fcm.subscribeToTopic ~ topic", topic.toString())
    topic=topic.toString()
    if(fcmtoken.length===1){
      console.log("🚀 ~ file: firbase.js ~ line 51 ~ sendNotification ~ fcmtoken.length", fcmtoken.length)
      var message2 = {
        //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: fcmtoken.toString(),
        //collapse_key: 'your_collapse_key',
    
        notification: {
          title: "larry world",
          body,
        },
      };
    
      fcm.send(message2, function (err, response) {
        if (err) {
          console.log("🚀 ~ file: firbase.js ~ line 64 ~ err", err)
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
       
      });
      return
    }
  fcm.subscribeToTopic(fcmtoken,'l', (err, res) => {
    console.log(
      "🚀 ~ file: firbase.js ~ line 9 ~ fcm.subscribeToTopic ~ res",
      res
    );
    console.log(
      "🚀 ~ file: firbase.js ~ line 9 ~ fcm.subscribeToTopic ~ err",
      err
    );
  }); 

  var message = {
    //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: "/topics/" + 'l',
    //collapse_key: 'your_collapse_key',

    notification: {
      title: "larry world",
      body,
    },
  };

  fcm.send(message, function (err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
    fcm.unsubscribeToTopic(fcmtoken,'l', (err, res) => {
      console.log(
        "🚀 ~ file: firbase.js ~ line 37 ~ fcm.unsubscribeToTopic ~ res",
        res
      );
    });
  });
};
module.exports = sendNotification;
