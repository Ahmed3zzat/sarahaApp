import { Router } from "express";
import { activateAccount, loginUser, registerUser } from "./auth.service.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { middleValidation } from "../../middleware/validation.middleware.js";
import { registerSchema } from "./auth.validation.js";

const router = Router();

// Define your user-related routes here

// Example route for user registration
router.post(
  "/register",
  middleValidation(registerSchema),
  asyncHandler(registerUser),
);

// Example route for user login
router.post("/login", asyncHandler(loginUser));

// activate account route
router.get("/active_account/:token", asyncHandler(activateAccount));

export default router;
