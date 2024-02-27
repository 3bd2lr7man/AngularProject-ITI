const productModel = require("../models/productModel");
const factory = require("./handlerFactory");

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryID) {
    filterObject = { category: req.params.categoryID };
  }

  req.filterObj = filterObject;
  next();
};

exports.getProducts = factory.getAll(productModel);

exports.getProduct = factory.getOne(productModel);

exports.createProduct = factory.create(productModel);

exports.updateProduct = factory.update(productModel);

exports.deleteProduct = factory.delete(productModel);
