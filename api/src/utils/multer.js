const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
    limits: {
      fileSize: 1000000
    },
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
   try{ if (!file) {
      throw new Error("no imge cc1 found")
    }
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"&& ext !== ".gif") {
      cb(null, false);
      throw new Error("no imgecfd1 found")
      return;
    }
    cb(null, true);
  }catch (e){
    cb(null, false);
  }
},
});