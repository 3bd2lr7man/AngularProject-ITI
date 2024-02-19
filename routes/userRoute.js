const router = require("express").Router();
const { signUp, login } = require("../services/userAuth");
const {
  getSignupValidator,
  loginValidator,
} = require("../Validators/userValidators");
router.post("/signup", getSignupValidator, signUp);
// router.get("/signup", (req, res) => res.send("done"));
router.post("/login", loginValidator, login);
module.exports = router;
