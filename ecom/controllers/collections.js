const Collections = require('../models/collections');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  const collections = new Collections(req.body);
  collections.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.collectionsById = (req, res, next, id) => {
  Collections.findById(id).exec((error, collections) => {
    if (error || !collections) {
      return res.status(400).json({
        error: 'collections not Found',
      });
    }

    req.collections = collections;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.collections);
};

exports.update = (req, res) => {
  const collections = req.collections;
  collections.name = req.body.name;

  collections.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const collections = req.collections;
  collections.name = req.body.name;

  collections.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json({ message: 'collections successfuly Deleted' });
  });
};

exports.list = (req, res) => {
  Collections.find().exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }

    res.json(data);
  });
};
