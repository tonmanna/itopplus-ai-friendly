import { Router } from "express";
import passport from "passport";
import * as authController from "../controllers/auth.controller";
import { authenticateJwt } from "../middleware/auth.middleware";

const router = Router();

// Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get("/profile", authenticateJwt, authController.getProfile);

// Social login routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.socialLogin
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  authController.socialLogin
);

router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);
router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft"),
  authController.socialLogin
);

export const authRoutes = router;
