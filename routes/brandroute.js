const express = require("express");
const userAuth = require("../services/userAuth");

const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../Validators/brandValidator");
const {
  getBrand,
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require("../services/brandservice");

// const authService = require("../services/authService");
const router = express.Router();

router.route("/").get(getBrands).post(
  userAuth.protect,
  userAuth.adminAuthoriz,
  // authService.protect,
  // authService.allowedTo("admin", "seller"),
  createBrandValidator,
  createBrand
);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    userAuth.protect,
    userAuth.adminAuthoriz,
    // authService.protect,
    // authService.allowedTo("admin", "seller"),
    updateBrandValidator,
    updateBrand
  )
  .delete(
    userAuth.protect,
    userAuth.adminAuthoriz,
    // authService.protect,
    // authService.allowedTo("admin"),
    deleteBrandValidator,
    deleteBrand
  );

module.exports = router;
