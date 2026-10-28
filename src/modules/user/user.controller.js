import { Router } from "express";
import { freeze, profile, updatePassword, updatePofile, shareProfile } from "./user.service.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import isAuthorized from "../../middleware/Authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
import { middleValidation } from "../../middleware/validation.middleware.js";
import { updatePasswordSchema, updateUserSchema } from "./user.validation.js";

const router = Router();

router.get(
  "/profile",
  asyncHandler(authMiddleware),

  isAuthorized(roles.user, roles.admin),

  asyncHandler(profile),
);
router.get(
  "/profile/share/:id",
  asyncHandler(authMiddleware),
  asyncHandler(shareProfile),
);

router.patch(
  "/profile/update",
  asyncHandler(authMiddleware),
  isAuthorized(roles.user, roles.admin),
  middleValidation(updateUserSchema),
  asyncHandler(updatePofile),
);

router.patch(
  "/profile/update/password",
  asyncHandler(authMiddleware),
  isAuthorized(roles.user, roles.admin),
  middleValidation(updatePasswordSchema),
  asyncHandler(updatePassword),
);

router.delete(
  "/profile/freezeAccount",
  asyncHandler(authMiddleware),
  isAuthorized(roles.user, roles.admin),
  asyncHandler(freeze), 
);

export default router;
