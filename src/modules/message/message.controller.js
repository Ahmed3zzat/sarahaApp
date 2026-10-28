import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import isAuthorized from "../../middleware/Authorization.middleware.js";
import { roles } from "../../DB/models/user.model.js";
import {
  deleteMessage,
  getAllMessage,
  getSingleMessage,
  sendMessage,
  updateMessage,
} from "./message.service.js";
import { middleValidation } from "../../middleware/validation.middleware.js";
import {
  getSingleMessageSchema,
  sendMessageScehma,
} from "./message.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  isAuthorized(roles.user),
  middleValidation(sendMessageScehma),
  sendMessage,
);
router.get(
  "/:id",
  authMiddleware,
  isAuthorized(roles.user),
  middleValidation(getSingleMessageSchema),
  getSingleMessage,
);
router.get("", authMiddleware, isAuthorized(roles.user), getAllMessage);

// // router.delete()
// router.delete("/:id", 
//   "/:id",
//   authMiddleware,
//   isAuthorized(roles.user),
//   middleValidation(getSingleMessageSchema),
//   deleteMessage,
// )
// // router.put()
// router.put("/:id", 
//   "/:id",
//   authMiddleware,
//   isAuthorized(roles.user),
//   middleValidation(getSingleMessageSchema),
//   updateMessage,
// )

export default router;
