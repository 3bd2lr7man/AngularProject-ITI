const router = require("express").Router();
const {
  signUp,
  login,
  fPassword,
  fPassworedVerify,
  restPasswordForF,
} = require("../services/userAuth");
const {
  fPasswordVlid,
  getSignupValidator,
  loginValidator,
  fPassworedVerifyvalid,
} = require("../Validators/userValidators");
router.post("/signup", getSignupValidator, signUp);
// router.get("/signup", (req, res) => res.send("done"));
router.post("/login", loginValidator, login);
router.post("/fPasswored", fPasswordVlid, fPassword);
router.post("/fPassworedVerify", fPassworedVerifyvalid, fPassworedVerify);
router.post("/restPasswordForF", loginValidator, restPasswordForF);

module.exports = router;
