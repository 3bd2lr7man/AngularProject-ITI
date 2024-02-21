const router = require("express").Router();
const { signUp, login, fPassword } = require("../services/userAuth");
const {
  fPasswordVlid,
  getSignupValidator,
  loginValidator,
} = require("../Validators/userValidators");
router.post("/signup", getSignupValidator, signUp);
// router.get("/signup", (req, res) => res.send("done"));
router.post("/login", loginValidator, login);
router.post("/fPasswored", fPasswordVlid, fPassword);
module.exports = router;
