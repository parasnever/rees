import { Request, Response, NextFunction } from "express";
import { noteServices } from "../../services/note";

export function getAllNotesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notes = noteServices.getAll();

  res.json({
    data: notes,
    message: "get all notes successfully",
  });
}
