const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    phonenumber: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    dateOfBirth: {
      type: Date,
    },
    password: { type: String, required: true, minlengthe: 3 },
    passwordResetCode: String,
    passwordResetCodeExp: Date,
    passwordResetCodeVerified: Boolean,
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      required: true,
      type: String,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      required: true,
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

// {

//   "username": "3bd2lr7man",
//   "email":"prog.3bd2lr7man@gmail.com",
//   "password":"123456",
//   "firstName":"Abdelrhman",
//   "lastName":"Dyaa",
//   "dateOfBirth":"01/10/2000",
//   "role":"user",
//   "country":"egypt",
//   "phoneNumber":"01094288151"
//   }
