exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req
    .check('email', 'Email must 3 to 32 characters')
    .notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
      min: 4,
      max: 32,
    });
  req.check('password', 'Password is required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must conatain at least 6 letters')
    .matches(/\d/)
    .withMessage('Password must conatin a number');

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];

    return res.status(400).json({ error: firstError });
  }

  next();
};
