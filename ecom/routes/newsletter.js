const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/newsletter');

router.post('/newsletter/signup', signup);

module.exports = router;
