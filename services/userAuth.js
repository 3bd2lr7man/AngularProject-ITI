const crypto = require("crypto");
const userModel = require("../models/Usermodel");
const bcryprt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiErorr = require("../utiles/apiError");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utiles/apiError");
const sendEmail = require("../utiles/sendEmail");
//Func To genrate token
const creatToken = (id, role) => {
  const token = jwt.sign({ UserId: id, Role: role }, "asccasdcdzcdc", {
    expiresIn: "90d",
  });
  return token;
};
//sign up Func
const signUp = asyncHandler(async (req, res, next) => {
  const {
    name,
    gender,
    password,
    email,
    phonenumber,
    dateOfBirth,
    role,
    address,
  } = req.body;
  const isithere = await userModel.findOne({ email: email });
  if (isithere) {
    return next(new ApiErorr("user already exist", 400));
  } else {
    const hashedPass = await bcryprt.hash(req.body.password, 7);
    console.log(hashedPass);
    const data = await userModel.create({
      password: hashedPass,
      name,
      gender,
      email,
      phonenumber,
      dateOfBirth,
      role,
      address,
    });
    res.status(200).json({
      status: "success",
      // token: creatToken(data._id, data.role),
      data: data,
    });
  }
});

//login Func
const login = asyncHandler(async (req, res, next) => {
  let userData = await userModel.findOne({ email: req.body.email });
  if (userData) {
    const isPasswordValid = await bcryprt.compare(
      `${req.body.password}`,
      userData.password
    );
    if (isPasswordValid) {
      res.status(200).json({
        status: "success",
        message: `Welcome back ${userData.name}`,
        token: creatToken(userData._id, userData.role),
        role: userData.role,
        userName: userData.name,
      });
    } else {
      return next(new ApiError("Invalid email or password", 401));
    }
  } else {
    return next(
      new ApiError("there is no acc for this mail pls sign up first", 404)
    );
  }
});

const fPassword = asyncHandler(async (req, res, next) => {
  //
  let userData = await userModel.findOne({ email: req.body.email });
  if (!userData) {
    return next(new ApiErorr("there is no user with this email!"));
  }
  //
  const resetCode = (
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
  ).toString();
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex");
  //
  userData.passwordResetCode = hashedResetCode;
  userData.passwordResetCodeExp = Date.now() + 5 * 60 * 1000;
  userData.passwordResetCodeVerified = false;
  userData.save();
  //send via email
  try {
    sendEmail({
      to: userData.email,
      subject: "Your password reset code valid for 10m",
      message: `hi ${userData.name} Your reset Code is ${resetCode}`,
    });
    res.status(200).json({
      status: "success",
      message: "status code sent to email",
    });
  } catch (err) {
    userData.passwordResetCode = undefined;
    userData.passwordResetCodeExp = undefined;
    userData.passwordResetCodeVerified = undefined;
    await userData.save();
    return next(new ApiErorr("there is an error while sending email", 500)); //not working?????
  }
  //
});
const fPassworedVerify = asyncHandler(async (req, res, next) => {
  const hashedResetCode = crypto
    .createHash("sha256")
    .update(req.body.restCode)
    .digest("hex");
  const userData = await userModel.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetCodeExp: { $gt: Date.now() },
  });
  if (!userData) {
    return next(new ApiErorr("rest code invalid or expired", 400));
  }
  userData.passwordResetCodeVerified = true;
  await userData.save();
  res.status(200).json({
    status: "success",
    message: "verified",
  });
});
const restPasswordForF = asyncHandler(async (req, res, next) => {
  let userData = await userModel.findOne({ email: req.body.email });
  if (!userData) {
    return next(new ApiError("there is no acc for this mail", 404));
  }
  if (!userData.passwordResetCodeVerified) {
    console.log(userData.passwordResetCodeVerified);
    return next(new ApiError("rest code not verifeid", 400));
  }
  const hashedNewPass = await bcryprt.hash(req.body.password, 7);
  userData.passwordResetCode = undefined;
  userData.passwordResetCodeExp = undefined;
  userData.passwordResetCodeVerified = undefined;
  userData.password = hashedNewPass;
  userData.save();
  res.status(200).json({
    status: "success",
    message: "password rest successfuly",
  });
});
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("you are not login", 401));
  }
  const decode = jwt.verify(token, "asccasdcdzcdc");
  if (!decode) {
    return next(new ApiError("invalid Tokenxxxx", 401));
  }
  const currentUser = await userModel.findById(decode.UserId);

  if (!currentUser) {
    return next(new ApiError("user in token not found", 404));
  }

  next();
});

const adminAuthoriz = asyncHandler(async (req, res, next) => {
  token = req.headers.authorization.split(" ")[1];

  const decode = jwt.verify(token, "asccasdcdzcdc");
  if (decode.Role != "admin") {
    return next(
      new ApiError("you are not authorized to access this page", 401)
    );
  }
  res.status(200);
  next();
});

module.exports = {
  signUp,
  login,
  fPassword,
  protect,
  adminAuthoriz,
  fPassworedVerify,
  restPasswordForF,
};
