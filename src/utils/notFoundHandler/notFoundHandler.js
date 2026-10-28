const notFoundHandler = (req, res, next) =>
  next(new Error("Route not found", { cause: 404 }));
export default notFoundHandler;
