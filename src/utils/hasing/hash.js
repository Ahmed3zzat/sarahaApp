import bcrypt from "bcrypt";
import crypto from "crypto-js";

export const hashFn = async ({ plainText, round = process.env.hashFactor }) => {
  return bcrypt.hash(
    plainText,
    parseInt(round),
    // hashFactor is the number of salt rounds used for hashing the password. It determines the computational cost of hashing and can be adjusted based on security requirements.
  );
};

export const compareHashFn = ({ plainText, hash }) => {
  return bcrypt.compareSync(plainText, hash);
};

// Encrypt the phone number before saving it to the database

export const encryptFn = ({
  plainText,
  secrect_key = process.env.SECRET_KEY,
}) => {
  return crypto.AES.encrypt(plainText, secrect_key).toString();
};

export const decryptFn = ({
  plainText,
  secrect_key = process.env.SECRET_KEY,
}) => {
  return crypto.AES.decrypt(plainText, secrect_key).toString(crypto.enc.Utf8);
};
