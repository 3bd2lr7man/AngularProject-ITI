const express = require("express");
const userAuth = require("../services/userAuth");

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../Validators/subCategoryValidator");
// const authService = require("../services/authService");

//mergeParams: allows us to access parameters on other routers
//ex: we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    // authService.protect,
    // authService.allowedTo("admin", "seller"),
    userAuth.protect,
    userAuth.adminAuthoriz,
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(createFilterObj, getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(
    userAuth.protect,
    userAuth.adminAuthoriz,
    // authService.protect,
    // authService.allowedTo("admin", "seller"),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    userAuth.protect,
    userAuth.adminAuthoriz,
    // authService.protect,
    // authService.allowedTo("admin"),
    deleteSubCategoryValidator,
    deleteSubCategory
  );

module.exports = router;
