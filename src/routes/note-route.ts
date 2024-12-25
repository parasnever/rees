import { createNoteController } from "../controllers/note-controller/create-note-controller";
import { deleteNoteController } from "../controllers/note-controller/delete-note-controller";
import { getAllNotesController } from "../controllers/note-controller/get-all-note-controller";
import { getByIdController } from "../controllers/note-controller/get-by-id-controller";
import { updateNoteController } from "../controllers/note-controller/update-note-controller";
import { Express } from "express";

export function createNoteRoutes(app: Express) {
  //mutation
  app.post("/notes/create", createNoteController);
  app.put("/notes/update/:noteId", updateNoteController);
  app.delete("/notes/delete/:noteId", deleteNoteController);

  // queries

  app.get("/notes", getAllNotesController);
  app.get("/notes/:noteId", getByIdController);
}
