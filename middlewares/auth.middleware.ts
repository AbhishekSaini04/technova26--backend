import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
interface JwtPayload {
  id: number;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  // console.log(token);
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
