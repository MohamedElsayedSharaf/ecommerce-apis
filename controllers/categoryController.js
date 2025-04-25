const CategoryModel = require("../models/CategoryModel");
const factory = require("./handlersFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const asyncHandler = require("express-async-handler");

exports.uploadCategoryImage = uploadSingleImage("image")

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}_${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  req.body.image = filename;
  next();
});

exports.getCategories = factory.getAll(CategoryModel);
exports.getCategory = factory.getOne(CategoryModel);
exports.createCategory = factory.create(CategoryModel);
exports.updateCategory = factory.update(CategoryModel);
exports.deleteCategory = factory.delete(CategoryModel);
