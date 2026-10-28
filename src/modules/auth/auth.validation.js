import Joi from "joi";
import { genders } from "../../DB/models/user.model.js";

export const registerSchema = Joi.object({
  userName: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "User name must be a string",
    "string.empty": "User name is required",
    "string.min": "User name must be at least 3 characters long",
    "string.max": "User name must be at most 30 characters long",
    "any.required": "User name is required",
  }),

  email: Joi.string().email().trim().lowercase().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password",
    "any.required": "Confirm Password is required",
    "string.empty": "Confirm Password cannot be empty",
  }),

  isConfirmed: Joi.boolean().default(false),

  phone: Joi.string().required().messages({
    "string.base": "Phone number must be a string",
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
  }),

  gender: Joi.string()
    .valid(...Object.values(genders))
    .default(genders.male)
    .required()
    .messages({
      "string.base": "Gender must be a string",
      "any.only": "Gender must be ['male', 'female']",
      "string.empty": "Gender is required",
      "any.required": "Gender is required",
    }),

    
    // id: Joi.custom((value, helper)=>{
    // if(value>50) return true;
    // return helper.message("id must greater than 20")
    // })
});

