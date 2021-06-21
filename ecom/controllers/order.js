const { Orders, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
  Orders.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err || !order) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = order;
      next();
    });
};

exports.read = (req, res) => {
  // req.product.photo = undefined;
  return res.json(req.order);
};

exports.create = (req, res) => {
  // console.log("CREATE ORDER: ", req.body);
  req.body.order.user = req.profile;
  const order = new Orders(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.json(data);
  });
};

exports.listOrders = (req, res) => {
  Orders.find()
    .populate('user', '_id name address')
    .sort('-created')
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      //cosnsole.log({ order });
      res.json(orders);
    });

  // Orders.find().exec((error, data) => {
  //   if (error) {
  //     return res.status(400).json({
  //       error: errorHandler(error),
  //     });
  //   }

  //   res.json(data);
  // });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
  console.log(req.body);
  Order.updateOne(
    { _id: req.body._id },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(req.order);
    }
  );
};
