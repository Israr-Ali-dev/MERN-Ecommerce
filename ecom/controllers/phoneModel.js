const phoneModel = require('../models/phoneModel');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const { name, photo } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'All fields are required',
    });
  }
  let phonemodel = new phoneModel(req.body);
  if (photo) {
    // if (photo.size > 100000) {
    //   return res.status(400).json({
    //     error: 'Image should be less than 1mb',
    //   });
    // }
    phonemodel.photo.data = photo.data;
    // console.log(product.photo.data);
    phonemodel.photo.contentType = photo.contentType;
  }

  phonemodel.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.phoneModelById = (req, res, next, id) => {
  phoneModel.findById(id).exec((error, phonemodel) => {
    if (error || !phonemodel) {
      return res.status(400).json({
        error: 'Phone Model not Found',
      });
    }

    req.phonemodel = phonemodel;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.phonemodel);
};

exports.update = (req, res) => {
  let phonemodel = req.phonemodel;

  phonemodel.name = req.body.name;
  phonemodel.photo = req.body.photo;

  phonemodel.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const phonemodel = req.phonemodel;
  phonemodel.name = req.body.name;

  phonemodel.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ message: 'Phone Model successfuly Deleted' });
  });
};

exports.list = (req, res) => {
  phoneModel.find().exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    res.json(data);
  });
};
