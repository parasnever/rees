import { Request, Response, NextFunction } from "express";
import { noteService } from "../../services/note";

export function getAllNotesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notes = noteService.getAll();

  res.json({
    data: notes,
    message: "get all notes successfully",
  });
}
