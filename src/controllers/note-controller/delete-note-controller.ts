import { Request, Response, NextFunction } from "express";
import { noteService } from "../../services/note";
import { InvalidNotePayLoad, NoteNotFound } from "../../services/note-errors";
import { AppError } from "../../error";
import { any } from "zod";

export function deleteNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const noteId = Number(req.params.noteId);

    if (!noteId) {
      const invalidPayLoadError = new InvalidNotePayLoad({ noteId });
      next(invalidPayLoadError);
      return;
    }

    const note = noteService.getById(noteId);
    if (!note) {
      const noteNotFoundError = new NoteNotFound();
      next(noteNotFoundError);
      return;
    }

    noteService.deleteNote(noteId);
    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    const appError = new AppError("Not found the noteId", 500);
    next(appError);
  }
}
