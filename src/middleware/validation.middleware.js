import mongoose from "mongoose";
import { asyncHandler } from "./asyncHandler.js";

export const middleValidation = (schema) => {
  return asyncHandler((req, res, next) => {
    // body params query

    const data = {
      ...req.body,
      ...req.query,
      ...req.params,
    };

    const result = schema.validate(data, {
      abortEarly: false,
    });

    if (result.error) {
      const errors = result.error.details.map((error) => error.message);

      return next(new Error(errors, { cause: 400 }));
    }

    return next();
  });
};

export const isValidOBJ = (value, helpers) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};
