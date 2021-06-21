const express = require('express');
const router = express.Router();

const {
  create,
  subCategoryById,
  read,
  remove,
  update,
  list,
} = require('../controllers/subCategory');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/subcategory', list);
router.get('/subcategory/:subcategoryId', read);
router.post(
  '/subcategory/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.delete(
  '/subcategory/:subcategoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/subcategory/:subcategoryId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param('userId', userById);
router.param('subcategoryId', subCategoryById);

module.exports = router;
