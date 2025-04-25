const express = require("express");

const {
  createBrandValidator,
  getBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../controllers/brandController");

const router = express.Router();

router.post(
  "/",
  uploadBrandImage,
  resizeImage,
  createBrandValidator,
  createBrand
);

router.get("/", getBrands);

router.get("/:id", getBrandValidator, getBrand);

router.put(
  "/:id",
  uploadBrandImage,
  resizeImage,
  updateBrandValidator,
  updateBrand
);

router.delete("/:id", deleteBrandValidator, deleteBrand);

module.exports = router;
