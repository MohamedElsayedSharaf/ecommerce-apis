const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const factory = require("./handlersFactory");
const sharp = require("sharp");
const UserModel = require("../models/UserModel");

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}_${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);
    req.body.profileImg = filename;
  }
  next();
});

exports.getUsers = factory.getAll(UserModel);
exports.getUser = factory.getOne(UserModel);
exports.createUser = factory.create(UserModel);
exports.updateUser = factory.update(UserModel);
exports.deleteUser = factory.delete(UserModel);
