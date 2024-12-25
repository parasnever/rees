import { Request, Response, NextFunction } from "express";
import { InvalidNotePayLoad } from "../../services/note-errors";
import { noteServices } from "../../services/note";
export function createNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  if (!body.name.length) {
    const invalidPayLoadError = new InvalidNotePayLoad();
    next(invalidPayLoadError);
    return;
  }
  noteServices.create({
    name: body.name,
    description: body.description,
  });

  res.json({ message: "Note created successfully" });
}
