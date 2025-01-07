import { Request, Response, NextFunction } from "express";
import { noteService } from "../../services/note";
import { InvalidNotePayLoad, NoteNotFound } from "../../services/note-errors";
import { AppError } from "../../error";

export function updateNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const noteId = Number(req.params.noteId);
    const body = req.body;
    if (typeof body.priority !== "number") {
      const invalidPayLoadError = new InvalidNotePayLoad({
        message: "Priority should be a number.",
      });
      next(invalidPayLoadError);
      return;
    }

    const note = noteService.getById(noteId);
    if (!note) {
      const noteNotFoundError = new NoteNotFound();
      next(noteNotFoundError);
      return;
    }
    noteService.update(noteId, {
      name: body.name,
      description: body.description,
      priority: body.priority,
    });

    res.json({
      message: "Note updated successfully.",
    });
  } catch (error) {
    // console.error("Caught error", error);
    // next({
    //   message: "Failed to update the note .Something went wrong in server!",
    //   status: 500,
    const appError = new AppError(
      "Failed to update the note.Something went wrong in server!",
      500
    );
    next(appError);
  }
}
