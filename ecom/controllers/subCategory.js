const subCategory = require('../models/subCategory');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const subcategory = new subCategory(req.body);
  subcategory.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.subCategoryById = (req, res, next, id) => {
  subCategory.findById(id).exec((error, subcategory) => {
    if (error || !subcategory) {
      return res.status(400).json({
        error: 'Sub Catgeory not Found',
      });
    }

    req.subcategory = subcategory;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.subcategory);
};

exports.update = (req, res) => {
  const subcategory = req.subcategory;
  subcategory.name = req.body.name;
  subcategory.photo = req.body.photo;

  subcategory.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const subcategory = req.subcategory;
  subcategory.name = req.body.name;

  subcategory.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ message: 'Sub Category successfuly Deleted' });
  });
};

exports.list = (req, res) => {
  subCategory
    .find()
    .populate('category')
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }

      res.json(data);
    });
};
