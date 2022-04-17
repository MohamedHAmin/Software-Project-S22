const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  //specifies how files are going to be stored
  //on local storage
  destination: (req, file, callback) => {
    //specifies destination
    callback(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, callback) => {
    //specifies how files are going to be named when uploaded
    //* the date is concatenated to the orginal
    //* file name to prevent repeated file names
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const fileVaildator = (req, file, callback) => {
  //validates files before sending them to check
  //if they are pngs or jpegs
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    //prevent the upload otherwise and send an error message
    callback({ message: "File not Supported" }, false);
  }
};

const upload = multer({
  //specifies the multer uploader object to be used
  //elsewhere in the code where storage attribute
  //is the one specifeied in the storage variable
  //and limits attribute has the limit on the file size
  //and file limiter attribute has the file validator function
  //specified above
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileVaildator,
});

module.exports = upload;
