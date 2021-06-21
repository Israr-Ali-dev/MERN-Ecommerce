const express = require('express');
const router = express.Router();

const {
  create,
  collectionsById,
  read,
  remove,
  update,
  list,
} = require('../controllers/collections');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/collections', list);
router.get('/collections/:collectionsId', read);
router.post(
  '/collections/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.delete(
  '/collections/:collectionsId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/collections/:collectionsId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param('userId', userById);
router.param('collectionsId', collectionsById);

module.exports = router;
