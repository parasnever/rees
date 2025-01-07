import { Request, Response, NextFunction } from "express";
import { noteService } from "../../services/note";
import { InvalidNotePayLoad } from "../../services/note-errors";
import { CreateNoteSchema } from "../../services/note-validations";

export async function createNoteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;

  const parsed = CreateNoteSchema.safeParse(body);
  if (!parsed.success) {
    const parseError = parsed.error.flatten();
    const invalidPayloadError = new InvalidNotePayLoad(parseError);
    next(invalidPayloadError);
    return;
  }

  // if (typeof body.priority !== "number") {
  //   const invalidPayloadError = new InvalidNotePayload();
  //   next(invalidPayloadError);
  //   return;
  // }

  // if (!body.name.length) {
  //   const invalidPayloadError = new InvalidNotePayload();
  //   next(invalidPayloadError);
  //   return;
  // }

  noteService.create({
    name: parsed.data.name,
    description: parsed.data.description,
    priority: parsed.data.priority,
  });

  res.json({
    message: "Note created successfully!",
  });
}
