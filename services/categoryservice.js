const multer = require("multer");
const categorymodel = require("../models/categorymodel");
const factory = require("./handlerFactory");
const upload = multer({ dest: "uploads/imgs" });
const catModel = require("../models/categorymodel");
const asynchandler = require("express-async-handler");
const cloud = require("../utiles/cloudImg");

// @desc  get list of categories
// @route GET /api/v1/categories
//@access  puplic

exports.getcategories = factory.getAll(categorymodel);

// @desc  get specific category by id
// @route GET /api/v1/categories/:id
// @access puplic
exports.getcategory = factory.getOne(categorymodel);

// @desc  create category
// @route POST /api/v1/categories
// @access  private
exports.createcategory = asynchandler(async (req, res) => {
  const { name, catImgUrl, catImgName } = req.body;
  if (req.files[0]) {
    console.log(req.files[0]);
    const result = await cloud.uploads(req.files[0].path);
    var imgD = {
      catImgName: req.files[0].originalname,
      catImgUrl: result.url,
    };
  }
  const document = await catModel.create({
    name,
    catImgUrl: imgD.catImgUrl,
    catImgName: imgD.catImgName,
  });
  res.status(201).json({ data: document });
});

// @desc update specific category
// @route PUT /api/v1/categories/:id
// @access private
exports.updatecategory = factory.update(categorymodel);

// @desc delete specific category
// @route DELETE /api/v1/categories/:id
// @access private

exports.deletecategory = factory.delete(categorymodel);
// module.exports = { storeImg };
