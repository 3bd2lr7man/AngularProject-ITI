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

const productRoute = require("./productRoute");

const router = express.Router();

router.use("/:categoryID/products", productRoute);

router
  .route("/")
  .get(getcategories)
  .post(
    userAuth.protect,
    userAuth.adminAuthoriz,
    createCategoryValidator,
    createcategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getcategory)
  .put(
    userAuth.protect,
    userAuth.adminAuthoriz,
    updateCategoryValidator,
    updatecategory
  )
  .delete(
    userAuth.protect,
    userAuth.adminAuthoriz,
    deleteCategoryValidator,
    deletecategory
  );

module.exports = router;
