const userModel = require("../models/Usermodel");
const asyncHandler = require("express-async-handler");
const ApiErorr = require("../utiles/apiError");
//
const listOfUsers = asyncHandler(async (req, res, next) => {
  const data = await userModel.find({}, "-password -__v");
  res.status(200).json({
    message: "success",
    data: data,
  });
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new ApiErorr("User not found", 404));
    // return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});

const editUser = asyncHandler(async (req, res, next) => {
  //ناقص يدكريبت الباس
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //m4 fahm
  });
  if (!user) {
    return next(new ApiErorr("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ApiErorr("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
module.exports = { listOfUsers, getUser, editUser, deleteUser };
