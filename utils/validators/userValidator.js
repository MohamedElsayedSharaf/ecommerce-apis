const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");
const User = require("../../models/UserModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid mongo id"),
  validatorMiddleware,
];
exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  check("email")
  .notEmpty()
  .withMessage("Email required")
  .isEmail()
  .withMessage("Invalid Email address")
  .normalizeEmail()
  .trim()
  .custom(async (val) => {
    const user = await User.findOne({ email: val });
    if (user) {
      throw new Error("Email already used");
    }
  }),
  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("role").optional(),
  check("phone").optional(),
  validatorMiddleware,
];
exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid catUser id"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid catUser id"),
  validatorMiddleware,
];
