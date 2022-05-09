const express = require("express");
const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

const router = new express.Router();

router.get("/:id", auth("any"), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("no user found");
    }
    if (user.location.visability === false) {
      user.Location = undefined;
    }
    if (user.birth.visability === false) {
      user.birth = undefined;
    }
    user.ban = undefined;
    user.email = undefined;
    user.Notificationssetting = undefined;

    const isfollowed = req.user.following.some(
      (followed) => followed.followingId.toString() == user._id.toString()
    );
    let isfollowing;
    if (isfollowed) {
      isfollowing = true;
    } else {
      isfollowing = false;
    }

    res.send({ user, isfollowing: isfollowing });
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.get("/:id/me", auth("user"), async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.put("/:id/password", auth("user"), async (req, res) => {
  try {
    const ismatch = await bcrypt.compare(
      req.body.currentPassword,
      req.user.password
    );

    if (!ismatch) {
      throw new Error("no wrong pass");
    }
    req.user.password = req.body.newPassword;
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400);
    res.send({ error: e.toString() });
  }
});
router.put("/:id", auth("user"), async (req, res) => {
  try {
  
    let change = false;
    const updates = Object.keys(req.body);
    if (req.body.birth) {
      req.user.birth.visability = req.body.birth.visability;
      change = true;
      delete updates.birth;
    }
    console.log('first')
    if (req.body.location &&( req.body.location.visability!==undefined)) {
      req.user.location.visability = req.body.location.visability;
      change = true;
    }
    if (req.body.location && req.body.location.place) {
      req.user.location.place = req.body.location.place;
      change = true;
    }
    if (req.body.location) {
      delete updates.location;
    }
    const allowtoupdate = [
      "screenName",
      "tag",
      "isPrivate",
      "website",
      "Notificationssetting",
      "Biography",
      "phoneNumber",
      "darkMode",
    ];
  
    const isvalidoperation = updates.every((update) => {
       return allowtoupdate.includes(update);
    });
   

    if (!isvalidoperation&&!change) {
      throw new Error("you can not change this data");
    }

    if (isvalidoperation) {
      updates.forEach((element) => (req.user[element] = req.body[element]));
    }

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(400);
    res.send({ error: e.toString() });
  }
});
router.put(
  "/:id/avater",
  auth("any"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("no imge found");
      }
      // Delete image from cloudinary
      if (req.user.profileAvater.cloudnaryId) {
        await cloudinary.uploader.destroy(req.user.profileAvater.cloudnaryId);
      }

      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      if (!result.secure_url || !result.public_id) {
        throw new Error("can not upload");
      }
      req.user.profileAvater.url = result.secure_url;
      req.user.profileAvater.cloudnaryId = result.public_id;

      await req.user.save();
      res.json(req.user);
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  }
);
router.delete("/:id/avater", auth("any"), async (req, res) => {
  try {
    // Delete image from cloudinary
    if (req.user.profileAvater.cloudnaryId) {
      await cloudinary.uploader.destroy(req.user.profileAvater.cloudnaryId);
    }
    req.user.profileAvater.url = null;
    req.user.profileAvater.cloudnaryId = null;
    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});
router.put(
  "/:id/banner",
  auth("any"),
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        throw new Error("no imge found");
      }
      // Delete image from cloudinary
      if (req.user.banner.cloudnaryId) {
        await cloudinary.uploader.destroy(req.user.banner.cloudnaryId);
      }

      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      if (!result.secure_url || !result.public_id) {
        throw new Error("can not upload");
      }
      req.user.banner.url = result.secure_url;
      req.user.banner.cloudnaryId = result.public_id;

      await req.user.save();
      res.json(req.user);
    } catch (e) {
      res.status(400).send({ error: e.toString() });
    }
  }
);
router.delete("/:id/banner", auth("any"), async (req, res) => {
  try {
    // Delete image from cloudinary
    if (req.user.banner.cloudnaryId) {
      await cloudinary.uploader.destroy(req.user.banner.cloudnaryId);
    }
    req.user.banner.url = null;
    req.user.banner.cloudnaryId = null;

    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).send({ error: e.toString() });
  }
});

module.exports = router;
