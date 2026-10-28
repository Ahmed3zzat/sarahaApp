import Joi from "joi";

const person = {
  name: "John Doye",
  age: 25,
  email: "john.doe@example.com",
  isAdmin: true,
  isMarried: false,
  password: "Password123",
  confirmPassword: "Password123",
  skills: ["JavaScript", "Node.js", "React"],
  address: {
    street: "123 Main St",
  },
};

const schema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name must be at most 100 characters long",
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
  }),

  age: Joi.number().min(0).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be a positive number",
    "any.required": "Age is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty",
  }),

  isAdmin: Joi.boolean().required().messages({
    "boolean.base": "Admin status must be a boolean",
    "any.required": "Admin status is required",
  }),

  isMarried: Joi.boolean().required().messages({
    "boolean.base": "Marital status must be a boolean",
    "any.required": "Marital status is required",
  }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .min(6)
    .max(100)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must be at most 100 characters long",
      "any.required": "Password is required",
      "string.empty": "Password cannot be empty",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm Password must match Password",
    "any.required": "Confirm Password is required",
    "string.empty": "Confirm Password cannot be empty",
  }),
  //
  skills: Joi.array().items(Joi.string().max(100)).max(10),
  address: Joi.object({
    street: Joi.string().min(3).max(20).required().messages({
      "string.required": "street is required",
      "string.empty": "street cannot be empty",
    }),
  }),
});


const result = schema.validate(person, {
  abortEarly: false,
});

console.log(
  result.error
    ? result.error.details.map((err) => err.message)
    : "Validation successful",
);
