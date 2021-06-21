const Cases = require('../models/cases');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.casesById = (req, res, next, id) => {
  Cases.findById(id).exec((error, cases) => {
    if (error || !cases) {
      return res.status(400).json({
        error: 'Case not Found',
      });
    }

    req.cases = cases;
    next();
  });
};

exports.create = (req, res) => {
  const { name, photo } = req.body;

  let cases = new Cases(req.body);

  if (!name) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }

  if (photo) {
    // if (photo.size > 100000) {
    //   return res.status(400).json({
    //     error: 'Image should be less than 1mb',
    //   });
    // }
    cases.photo.data = photo.data;
    // console.log(product.photo.data);
    cases.photo.contentType = photo.contentType;
  }

  cases.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.read = (req, res) => {
  return res.json(req.cases);
};

exports.update = (req, res) => {
  let cases = req.cases;

  cases.name = req.body.name;
  cases.photo = req.body.photo;

  cases.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const cases = req.cases;
  cases.name = req.body.name;

  cases.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ message: 'Case successfuly Deleted' });
  });
};

exports.list = (req, res) => {
  Cases.find().exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    res.json(data);
  });
};
