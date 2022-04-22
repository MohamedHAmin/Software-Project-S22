require("./mongoose");

const mongoose =require('mongoose')

const { faker } = require('@faker-js/faker');
const assert = require("assert");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

const Tweet = require("../models/Tweet");
const User = require("../models/User");
const seed = async () => {
  // make a bunch of users
  let users = [];

  for (let i = 0; i < 10; i += 1) {
      
    const screenName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = await bcrypt.hash("123456", 8);
    let newUser = {
      email: faker.internet.email(screenName, 'Doe', 'fake.com') ,
      screenName,
      birthDate: faker.date.past(10) ,
      tag: screenName+i,
      password,
      verified : true,
      location:{
        place:"fake",
        visability:false
      }
    };
    users.push(newUser);
    // visual feedback always feels nice!
  
  }

      users =await User.insertMany(users)
      const f=User.find({location:{ $elemMatch:{place:"fake"}}})
      
     const d= await User.deleteMany({"location.place":"fake"})
       for (let i = 0; i < users.length; i++) {
        const length= Math.round(Math.random() * users.length)
        const otherUser=_.sampleSize(users,length).filter((user)=>{
            return(users[i]._id!==user._id)
        } )
        otherUser.forEach(
            user => user.followercount++
        )
          users[i].following= otherUser.map(
            user =>{
                return({followingId:user._id})
            }
          )
          users[i].followingcount=length

    }
    users =await User.insertMany(users)

     ///TWEETS
     let tweets = [];
     for (let i = 0; i < 20; i += 1) {
        const length= Math.round(Math.random() * users.length)
       let newtweet = {
         text: faker.lorem.words(10),
   
         // use lodash to pick a random user as the author of this post
         authorId: _.sample(users)._id,
         likeCount:length,
         // use lodash to add a random subset of the users to this post
         likes: _.sampleSize(users, length).map(
            user =>{
                return({like:user._id})
            }
         )
       };
       tweets.push(newtweet);
     }
     Tweet.insertMany(tweets);
  console.log('seeding finshed')
};
seed();
