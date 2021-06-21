const express = require('express');
const router = express.Router();

const {
  create,
  casesById,
  read,
  remove,
  update,
  list,
} = require('../controllers/cases');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/cases', list);
router.get('/cases/:casesId', read);
router.post('/cases/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete(
  '/cases/:casesId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put('/cases/:casesId/:userId', requireSignin, isAuth, isAdmin, update);

router.param('userId', userById);
router.param('casesId', casesById);

module.exports = router;
