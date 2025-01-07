import { AppError } from "../error";

export class NoteNotFound extends AppError {
  constructor() {
    super("Note not found", 404);
    Error.captureStackTrace(this);
  }
}

export class InvalidNotePayLoad extends AppError {
  constructor(meta: any) {
    super("Invalid Payload", 400, meta);
    Error.captureStackTrace(this);
  }
}
