const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const BrandModel = require("../models/BrandModel");
const factory = require("./handlersFactory");
const sharp = require("sharp");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}_${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;
  next();
});

exports.getBrands = factory.getAll(BrandModel);
exports.getBrand = factory.getOne(BrandModel);
exports.createBrand = factory.create(BrandModel);
exports.updateBrand = factory.update(BrandModel);
exports.deleteBrand = factory.delete(BrandModel);
