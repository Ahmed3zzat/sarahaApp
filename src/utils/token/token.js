import jwt from "jsonwebtoken";

export const generateToken = ({
  payload,
  jwt_secure = process.env.JWT_SECRET,
}) => {
  return jwt.sign({ id: payload._id, email: payload.email }, jwt_secure, {
    // expiresIn: "10h",
  });
};

export const decodedToken = ({
  token,
  jwt_secure = process.env.JWT_SECRET,
}) => {
  return jwt.verify(token, jwt_secure);
};
