const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const {
  create,
  listOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
  read,
} = require('../controllers/order');
const { decreaseQuantity } = require('../controllers/product');

// User Order List
router.get('/order/listOrder/:userId', requireSignin, isAuth, listOrders);

router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);
router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);

// Admin Order List
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrders);

router.get('/order/:userId/:orderId', requireSignin, isAuth, isAdmin, read);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
