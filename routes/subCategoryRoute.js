const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
} = require("../controllers/subCategoryController");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidators");

const router = express.Router({ mergeParams: true });

router.post("/", setCategoryIdToBody ,createSubCategoryValidator, createSubCategory);
router.get("/", getSubCategories);
router.get("/:id", getSubCategoryValidator, getSubCategory);
router.put("/:id", updateSubCategoryValidator, updateSubCategory);
router.delete("/:id", deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
