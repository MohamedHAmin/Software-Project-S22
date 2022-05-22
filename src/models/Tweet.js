
const { text } = require('express');
const mongoose =require('mongoose')
const validator =require('validator')

const tweetSchema = new mongoose.Schema(
  {
    replyingTo: {
      tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        default: null,
      },
      tweetExisted: { type: Boolean, default: false },
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      strictPopulate: false,
    },
    text: {
      type: String,
      required: true,
    },

    retweetedTweet: {
      tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        default: null,
      },
      tweetExisted: { type: Boolean, default: false },
    },
    tags: [
      {
        tag: {
          type: String,
          required: true,
        },
      },
    ],
    gallery: [
      {
        photo: {
          type: String,
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    retweetCount: {
      type: Number,
      default: 0,
    },
    replyCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        like: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strictPopulate: false,
  }
);
tweetSchema.virtual('reply',{
  ref:'Tweet',
  localField:'_id',
  foreignField:'replyingTo.tweetId'
})

tweetSchema.methods.toJSON=function(){
  const tweet = this
  const tweetobject=tweet.toObject()
  delete tweetobject.likes
  return tweetobject
}
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet
