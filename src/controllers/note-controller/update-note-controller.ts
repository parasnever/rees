import { Request, Response, NextFunction } from "express";
import { noteServices } from "../../services/note";
import { NoteNotFound } from "../../services/note-errors";
import { AppError } from "../../error";

export function updateNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const noteId = Number(req.params.noteId);
    const body = req.body;
    const note = noteServices.getById(noteId);
    if (!note) {
      // next({
      //   status: 404,
      //   message: "Not not found",
      // });
      // return;

      const noteNotFoundError = new NoteNotFound();
      next(noteNotFoundError);
      return;
    }
    noteServices.update(noteId, {
      name: body.name,
      description: body.description,
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
