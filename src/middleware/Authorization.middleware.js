const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req._constructedUser.role))
      return next(new Error("Not Authorized", { cause: 401 }));
    return next();
  };
};

export default isAuthorized;
