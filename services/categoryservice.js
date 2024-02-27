const categorymodel = require("../models/categorymodel");
const factory = require("./handlerFactory");

exports.getcategories = factory.getAll(categorymodel);

exports.getcategory = factory.getOne(categorymodel);

exports.createcategory = factory.create(categorymodel);

exports.updatecategory = factory.update(categorymodel);

exports.deletecategory = factory.delete(categorymodel);
