const globalErrorHandler = (err, req, res, next) => {
  // console.log(err);
  const statusCode = err.cause || 500;
  return res
    .status(statusCode)
    .json({ success: false, error: err.message, stack: err.stack });
};

export default globalErrorHandler;
