import Joi from "joi";

import { isValidOBJ } from "../../middleware/validation.middleware.js";

export const sendMessageScehma = Joi.object({
  content: Joi.string().required().messages({
    "string.base": "Content must be a string",
    "string.empty": "Content is required",
    "any.required": "Content is required",
  }),

  receiver: Joi.string().custom(isValidOBJ).required().messages({
    "any.invalid": "Invalid MongoDB ObjectId",
    "string.empty": "Receiver ID is required",
    "any.required": "Receiver ID is required",
  }),
}).required();


export const getSingleMessageSchema = Joi.object({
  id: Joi.string().custom(isValidOBJ).required().messages({
    "any.invalid": "Invalid MongoDB ObjectId",
    "string.empty": "Receiver ID is required",
    "any.required": "Receiver ID is required",
  }),
}).required();