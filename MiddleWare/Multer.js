const multer = require("multer");
const path = require("path");

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("the file type is wrong"), false);
    }

    /*     let ext = path.extname(file.originalname);
    if (ext !== /jpg/i && ext !== /jpeg/i && ext !== /png/i) {
      cb(new Error("file type not supported"), false);
      return;
    }
    cb(null, true); */
  },
});
