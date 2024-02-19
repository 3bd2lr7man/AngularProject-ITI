const router = require("express").Router();
const userManagement = require("../services/userManagement");
const validator = require("../Validators/userValidators");
const userAuth = require("../services/userAuth");
router.get(
  "/getusers",
  userAuth.protect,
  userAuth.adminAuthoriz,
  userManagement.listOfUsers
);
router
  .route("/getusers/:id")
  .get(
    validator.findOneValidator,
    userAuth.protect,
    userAuth.adminAuthoriz,
    userManagement.getUser
  )
  .patch(
    validator.findOneValidator,
    // validator.getSignupValidator,
    userAuth.protect,
    userAuth.adminAuthoriz,
    userManagement.editUser
  )
  .delete(
    validator.findOneValidator,
    userAuth.protect,
    userAuth.adminAuthoriz,
    userManagement.deleteUser
  );
module.exports = router;
