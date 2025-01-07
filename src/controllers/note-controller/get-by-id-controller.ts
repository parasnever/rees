import { Request, Response, NextFunction } from "express";
import { noteService } from "../../services/note";

export function getByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const noteId = Number(req.params.noteId);
  const note = noteService.getById(noteId);

  if (!note) {
    res.status(404).json({
      message: "Note not found",
    });
  }
  res.json({
    data: note,
    message: "get by id successfully",
  });
}
