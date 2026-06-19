
function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 400;
  res.status(status).json({
    success: false,
    message: err.message || 'An unexpected error occurred',
  });
}

module.exports = errorHandler;
