const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id"),
  validatorMiddleware,
];
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory name required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("Subcategory must belong to category")
    .isMongoId()
    .withMessage("Invalid category id"),
  validatorMiddleware,
];
exports.updateSubCategoryValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid subcategory id")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subcategory id"),
  validatorMiddleware,
];
