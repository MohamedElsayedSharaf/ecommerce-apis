const express = require("express");
const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  uploadProductsImages,
  resizeProductsImages,
} = require("../controllers/productController");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router.post(
  "/",
  uploadProductsImages,
  resizeProductsImages,
  createProductValidator,
  createProduct
);

router.get("/", getProducts);

router.get("/:id", getProductValidator, getProduct);

router.put(
  "/:id",
  uploadProductsImages,
  resizeProductsImages,
  updateProductValidator,
  updateProduct
);

router.delete("/:id", deleteProductValidator, deleteProduct);

module.exports = router;
