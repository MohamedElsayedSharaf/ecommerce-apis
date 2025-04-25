const SubCategoryModel = require("../models/SubCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = factory.create(SubCategoryModel);
exports.getSubCategories = factory.getAll(SubCategoryModel);
exports.getSubCategory = factory.getOne(SubCategoryModel);
exports.updateSubCategory = factory.update(SubCategoryModel);
exports.deleteSubCategory = factory.delete(SubCategoryModel);
