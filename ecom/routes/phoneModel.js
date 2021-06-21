const express = require('express');
const router = express.Router();

const {
  create,
  phoneModelById,
  read,
  remove,
  update,
  list,
} = require('../controllers/phoneModel');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/phonemodel', list);
router.get('/phonemodel/:phonemodelId', read);
router.post(
  '/phonemodel/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);
router.delete(
  '/phonemodel/:phonemodelId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  '/phonemodel/:phonemodelId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.param('userId', userById);
router.param('phonemodelId', phoneModelById);

module.exports = router;
