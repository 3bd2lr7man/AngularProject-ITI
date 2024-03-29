const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../Validators/productValidator");
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");
// const authService = require("../services/authService");

const router = express.Router();

router.route("/").get(getProducts).post(
  // authService.protect,
  // authService.allowedTo("admin", "seller"),
  createProductValidator,
  createProduct
);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    // authService.protect,
    // authService.allowedTo("admin", "seller"),
    updateProductValidator,
    updateProduct
  )
  .delete(
    // authService.protect,
    // authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
