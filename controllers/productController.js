const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/ProductModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only image files are allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductsImages = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);
exports.resizeProductsImages = asyncHandler(async (req, res, next) => {
    if (req.files.imageCover) {
      const coverFilename = `product-${uuidv4()}_${Date.now()}.jpeg`;
  
      await sharp(req.files.imageCover[0].buffer)
        .resize(2000, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 95 })
        .toFile(`uploads/products/${coverFilename}`);
  
      req.body.imageCover = coverFilename;
    }
  
    if (req.files.images) {
      req.body.images = []; // ✅ Initialize an array to push filenames
  
      await Promise.all(
        req.files.images.map(async (img, index) => {
          const imageName = `product-${uuidv4()}_${Date.now()}-${index + 1}.jpeg`;
  
          await sharp(img.buffer)
            .resize(900, 600)
            .toFormat("jpeg")
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${imageName}`);
  
          req.body.images.push(imageName);
        })
      );
  
      console.log(req.body.imageCover);
      console.log(req.body.images);
    }
  
    next(); 
  });
  

exports.getProducts = factory.getAll(ProductModel);
exports.getProduct = factory.getOne(ProductModel);
exports.createProduct = factory.create(ProductModel);
exports.updateProduct = factory.update(ProductModel);
exports.deleteProduct = factory.delete(ProductModel);
