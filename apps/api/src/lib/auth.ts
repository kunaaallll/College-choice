import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../middleware/error";

const SECRET = process.env.JWT_SECRET || "dev_insecure_secret_change_me";

export interface AuthPayload {
  userId: number;
  email?: string | null;
}

export function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload {
  return jwt.verify(token, SECRET) as AuthPayload;
}

// Express guard — attaches req.auth or 401s.
export interface AuthedRequest extends Request {
  auth?: AuthPayload;
}

export function requireAuth(req: AuthedRequest, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) throw new HttpError(401, "Missing bearer token");
  try {
    req.auth = verifyToken(header.slice(7));
    next();
  } catch {
    throw new HttpError(401, "Invalid or expired token");
  }
}
