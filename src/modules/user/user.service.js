import mongoose, { isObjectIdOrHexString } from "mongoose";
import User from "../../DB/models/user.model.js";
import {
  compareHashFn,
  decryptFn,
  encryptFn,
  hashFn,
} from "../../utils/hasing/hash.js";

export const profile = async (req, res, next) => {
  const user = req._constructedUser; // Retrieve the user object from the request

  // Decrypt the phone number before sending it in the response
  const phone = decryptFn({ plainText: user.phone });

  res.status(200).json({
    message: "Profile retrieved successfully",
    result: { ...user, phone },
  });
};

export const updatePofile = async (req, res, next) => {
  const user = req._constructedUser;

  if (!user) {
    return next(new Error("User not found", { cause: 401 }));
  }

  const updateData = { ...req.body };

  if (updateData.phone) {
    updateData.phone = encryptFn({
      plainText: updateData.phone,
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  ).select("-password");

  if (!updatedUser) {
    return next(new Error("User not found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
};

export const updatePassword = async (req, res, next) => {
  const user = req._constructedUser;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!user) {
    return next(new Error("User not found", { cause: 401 }));
  }

  const userData = await User.findById(user._id);

  if (!userData) {
    return next(new Error("User not found", { cause: 404 }));
  }

  // 1. Check old password
  const isOldPassword = compareHashFn({
    plainText: oldPassword,
    hash: userData.password,
  });

  if (!isOldPassword) {
    return next(new Error("Old password is incorrect", { cause: 401 }));
  }

  // 2. Check confirm password
  if (newPassword !== confirmPassword) {
    return next(
      new Error("New password must match confirm password", {
        cause: 400,
      }),
    );
  }

  // 3. Prevent using the same password again
  const isSamePassword = await compareHashFn({
    plainText: newPassword,
    hash: userData.password,
  });

  if (isSamePassword) {
    return next(
      new Error("New password must be different from old password", {
        cause: 400,
      }),
    );
  }

  // 4. Hash the new password
  userData.password = await hashFn({
    plainText: newPassword,
  });
  userData.passwordChangedAt = Date.now();

  // 5. Save the updated password
  await userData.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
    userData,
  });
};

// FREEZE ACOUNT

export const freeze = async (req, res, next) => {
  const user = req._constructedUser;
  const resault = await User.findByIdAndUpdate(
    user._id,
    { isDeleted: true, passwordChangedAt: Date.now() },
    { new: true },
  );
  return res
    .status(201)
    .json({ success: true, message: "account is freezing", resault });
};


export const shareProfile = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(new Error("Invalid user ID", { cause: 400 }));
  }

  const user = await User.findById(id).select(
    "userName email phone",
  );

  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }

  return res.status(200).json({
    success: true,
    message: "Profile shared successfully",
    result: { user },
  });
};
