const { check } = require("express-validator");
const validatorMiddleware = require("../middlewares/validatorMiddleware");

const getSignupValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("Username should be at least 3 characters long."),
  check("email").isEmail().withMessage("Invalid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long."),
  check("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender."),
  check("dateOfBirth").isISO8601().withMessage("Invalid date of birth format."),
  check("phonenumber")
    .isMobilePhone(["ar-EG"])
    .withMessage("Invalid phone number format (assuming Egyptian)."),
  validatorMiddleware,
];

const loginValidator = [
  check("email").isEmail().withMessage("Invalid email address."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long."),
  validatorMiddleware,
];
const findOneValidator = [
  check("id").isMongoId().withMessage("Invalid ID"),
  validatorMiddleware,
];
const fPasswordVlid = [
  check("email").isEmail().withMessage("Invalid email address."),
  validatorMiddleware,
];
const fPassworedVerifyvalid = [
  check("restCode").isLength({ min: 6, max: 6 }).isNumeric(),
  validatorMiddleware,
];

module.exports = {
  getSignupValidator,
  loginValidator,
  fPasswordVlid,
  findOneValidator,
  fPassworedVerifyvalid,
};
