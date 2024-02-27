const mongoose = require("mongoose");

const categoryschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must be required"],
      unique: [true, "must be unique"],
      minlength: [3, "too short category name"],
      maxlength: [32, "too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categorymodel = mongoose.model("category", categoryschema);

module.exports = categorymodel;
