import { Request, Response, NextFunction } from "express";

export function homeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.json({
    message: "Hello from note app!",
  });
}
