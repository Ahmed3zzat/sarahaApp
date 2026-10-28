import User from "../DB/models/user.model.js";
import { decodedToken } from "../utils/token/token.js";

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new Error("Authentication required", { cause: 401 }));
  }

  if (!authorization?.startsWith("Bearer ")) {
    return next(new Error("Authentication required", { cause: 401 }));
  }

  const token = authorization.slice(7);

  try {
    const decoded = decodedToken({ token });

    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      return next(new Error("User not found", { cause: 401 }));
    }

    req._constructedUser = user;

    // console.log(parseInt(user.passwordChangedAt.getTime()/1000));
    // console.log(decoded.iat);
    if (parseInt(user?.passwordChangedAt.getTime() / 1000) > decoded.iat) {
      return next(
        new Error("token expired please login again!", { cause: 401 }),
      );
    }

    if (user.isDeleted) {
      return next(new Error("User Deleted", { cause: 401 }));
    }

    next();
  } catch (error) {
    if (error.cause) {
      return next(error);
    }

    return next(new Error("Invalid or expired token", { cause: 401 }));
  }
};

export default authMiddleware;
