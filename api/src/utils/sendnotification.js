
    const text = req.user.screenName+" start follow you";
    const notifications = new Notification({ userId: req.user._id, text,notifiedUId:req.params.id });
    notifications.save();
    const tokens = await Token.find({ ownerId: req.params.id });
    console.log(
      "🚀 ~ file: followroute.js ~ line 43 ~ router.post ~ tokens",
      tokens
    );
    if (tokens) {
      let fcmtokens = tokens.map((token) => token.fcmToken);
      var uniqueArray = [...new Set(fcmtokens)];
      uniqueArray = uniqueArray.filter((t) => t != null);
      console.log(
        "🚀 ~ file: followroute.js ~ line 46 ~ router.post ~ uniqueArray",
        uniqueArray
      );
      console.log(
        "🚀 ~ file: followroute.js ~ line 87 ~ router.post ~ text",
        text
      );

      notifiy(uniqueArray, text, req.user.tag);
    }
  