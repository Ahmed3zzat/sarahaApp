import Joi from "joi";
import { genders } from "../../DB/models/user.model.js";

export const updateUserSchema = Joi.object({
  userName: Joi.string().trim().min(3).max(20).messages({
    "string.base": "User name must be a string",
    "string.empty": "User name cannot be empty",
    "string.min": "User name must be at least 3 characters long",
    "string.max": "User name must not exceed 20 characters",
  }),

  gender: Joi.string()
    .valid(...Object.keys(genders))
    .messages({
      "string.base": "Gender must be a string",
      "any.only": "Gender must be one of the allowed values",
    }),

  phone: Joi.string().messages({
    "string.base": "Phone must be a string",
  }),
}).min(1);

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  newPassword: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Confirm Password must match Password",
    "any.required": "Confirm Password is required",
    "string.empty": "Confirm Password cannot be empty",
  }),
});


