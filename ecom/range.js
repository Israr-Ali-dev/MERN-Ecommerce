module.exports = (res, req, next) => {
  res.header('Content-Range', 'posts 0-20/20');
  next();
};
