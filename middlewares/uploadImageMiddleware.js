const multer = require("multer");
const ApiError = require("../utils/apiError");

exports.uploadSingleImage = (field) => {
  const multerStorage = multer.memoryStorage();
  const multerFilter =  (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Only image files are allowed", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload.single(field);
};
