import User from "../../DB/models/user.model.js";
import { emailEvent } from "../../utils/email/email.event.js";
import { compareHashFn, encryptFn, hashFn } from "../../utils/hasing/hash.js";
import { decodedToken, generateToken } from "../../utils/token/token.js";

const registerUser = async (req, res, next) => {
  const { password, phone } = req.body;
  let user;
  try {
    // Hash the password before saving the user to the database

    // Encrypt the phone number before saving it to the database
    const encryptedPhone = encryptFn({ plainText: phone });
    // Create a new user with the hashed password and encrypted phone number

    user = await User.create({
      ...req.body,
      password: await hashFn({ plainText: password }),
      phone: encryptedPhone,
    });
  } catch (error) {
    return next(new Error(error.message, { cause: 500 }));
  }

  emailEvent.emit("sendEmail", user);

  // Implement user registration logic here
  return res.status(201).json({ message: "User Created Successfully", user });
};

// Implement user login function
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new Error("Email and password are required", {
        cause: 400,
      }),
    );
  }

  // Implement user login logic here
  const user = await User.findOne({ email });
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  // Compare the provided password with the hashed password in the database
  const isMatch = compareHashFn({ plainText: password, hash: user.password });
  if (!isMatch) {
    return next(new Error("Invalid Password", { cause: 401 }));
  }

  // Generate a JWT token for the authenticated user
  const token = generateToken({ payload: user });

  if (!user.isConfirmed) {
    return next(
      new Error(
        "Account not activated. Please check your email for activation link.",
        { cause: 403 },
      ),
    );
  }

  res.status(200).json({ message: "User logged in successfully", token });
};

// Activate account function
const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  const decoded = decodedToken({ token });
  const userId = decoded.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  user.isConfirmed = true; // Assuming you have an 'isActive' field in your User model
  await user.save();
  res.status(200).json({ message: "User activated successfully", user });
};

export { registerUser, loginUser, activateAccount };
