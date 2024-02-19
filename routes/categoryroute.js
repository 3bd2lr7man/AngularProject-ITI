const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../Validators/categoryValidator");
const {
  getcategory,
  createcategory,
  getcategories,
  updatecategory,
  deletecategory,
} = require("../services/categoryservice");
const userAuth = require("../services/userAuth");
const subCategoriesRoute = require("./subCategoryRoute");
// const authService = require("../services/authService");

const router = express.Router();

router.use("/:categoryID/subcategories", subCategoriesRoute);

router.route("/").get(getcategories).post(
  // authService.protect,
  // authService.allowedTo("admin", "seller"),
  userAuth.protect,
  userAuth.adminAuthoriz,
  createCategoryValidator,
  createcategory
);
router
  .route("/:id")
  .get(getCategoryValidator, getcategory)
  .put(
    // authService.protect,
    // authService.allowedTo("admin", "seller"),
    userAuth.protect,
    userAuth.adminAuthoriz,
    updateCategoryValidator,
    updatecategory
  )
  .delete(
    // authService.protect,
    // authService.allowedTo("admin"),
    userAuth.protect,
    userAuth.adminAuthoriz,
    deleteCategoryValidator,
    deletecategory
  );

module.exports = router;
