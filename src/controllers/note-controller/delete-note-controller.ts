import { Request, Response, NextFunction } from "express";
import { noteServices } from "../../services/note";
import { NoteNotFound } from "../../services/note-errors";
import { AppError } from "../../error";

export function deleteNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const noteId = Number(req.params.noteId);

    if (!noteId) {
      const noteNotFoundError = new NoteNotFound();
      next(noteNotFoundError);
      return;
    }
    const note = noteServices.deleteNote(noteId);
    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    const appError = new AppError("Not found the noteId", 500);
    next(appError);
  }
}
