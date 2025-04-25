const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const { default: slugify } = require("slugify");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid mongo id"),
  validatorMiddleware,
];
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name required")
    .isLength({ min: 2 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name")
  .custom((val, {req}) => {
              req.body.slug = slugify(val);
              return true;
            }),
    
  validatorMiddleware,
];
exports.updateCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid mongo id"),
    body('name').optional().custom((val, {req}) => {
          req.body.slug = slugify(val);
          return true;
        }),
    validatorMiddleware,
  ];
exports.deleteCategoryValidator = [
    check("id").isMongoId().withMessage("Invalid mongo id"),
    validatorMiddleware,
];