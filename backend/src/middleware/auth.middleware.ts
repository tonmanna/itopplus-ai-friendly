import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticateJwt = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: any, user: User | false, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Access denied: Admin only" });
    return;
  }
  next();
};
