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
  createFilterObj,
} = require("../services/productService");
const userAuth = require("../services/userAuth");
// const authService = require("../services/authService");

const router = express.Router({ mergeParams: true });

router.route("/").get(createFilterObj, getProducts).post(
  // authService.protect,
  // authService.allowedTo("admin", "seller"),
  userAuth.protect,
  userAuth.adminAuthoriz,
  createProductValidator,
  createProduct
);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    // authService.protect,
    // authService.allowedTo("admin", "seller"),
    userAuth.protect,
    userAuth.adminAuthoriz,
    updateProductValidator,
    updateProduct
  )
  .delete(
    // authService.protect,
    // authService.allowedTo("admin"),
    userAuth.protect,
    userAuth.adminAuthoriz,
    deleteProductValidator,
    deleteProduct
  );

module.exports = router;
