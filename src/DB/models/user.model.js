import { model, Schema } from "mongoose";

export const genders = {
  male: "male",
  female: "female",
};
export const roles = {
  user: "user",
  admin: "admin",
};

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: [3, "User name must be at least 3 characters long"],
      maxLength: [30, "User name must be at most 30 characters long"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    gender: {
      type: String,
      enum: Object.values(genders),
      required: [true, "Gender is required"],
      default: genders.male,
    },

    role: {
      type: String,
      enum: Object.values(roles),
      required: [true, "Role is required"],
      default: roles.user,
    },
    passwordChangedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const User = model("User", userSchema);
export default User;
