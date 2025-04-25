const express = require("express");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../controllers/categoryController");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidators");
const subcategoriesRoute = require("./subCategoryRoute");

const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);

router.post(
  "/",
  uploadCategoryImage,
  resizeImage,
  createCategoryValidator,
  createCategory
);

router.get("/", getCategories);

router.get("/:id", getCategoryValidator, getCategory);

router.put(
  "/:id",
  uploadCategoryImage,
  resizeImage,
  updateCategoryValidator,
  updateCategory
);

router.delete("/:id", deleteCategoryValidator, deleteCategory);

module.exports = router;
