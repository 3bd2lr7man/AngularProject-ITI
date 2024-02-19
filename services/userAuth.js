const userModel = require("../models/Usermodel");
const bcryprt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiErorr = require("../utiles/apiError");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utiles/apiError");
//Func To genrate token
const creatToken = (id, role) => {
  const token = jwt.sign({ UserId: id, Role: role }, process.env.secretT, {
    expiresIn: process.env.expiresIn,
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
    console.log(userData, req.body._id, isPasswordValid, req.body.password);

    if (isPasswordValid) {
      res.status(200).json({
        status: "success",
        message: `Welcome back ${userData.name}`,
        token: creatToken(userData._id, userData.role),
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

module.exports = { signUp, login, protect, adminAuthoriz };
