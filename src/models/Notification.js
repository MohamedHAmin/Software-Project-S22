const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    notifiedUId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    seen:{
      type:Boolean,
      default:false
    },

    tweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
