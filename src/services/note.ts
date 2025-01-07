import { conn } from "../db";

type TNote = {
  id: number;
  name: string;
  description: string;
  priority: number;
};

let notes: TNote[] = [];

// create
function create(input: Omit<TNote, "id">) {
  // notes.push({
  //   id: notes.length + 1,
  //   name: input.name,
  //   description: input.description,
  //   priority: input.priority,
  // });
  conn.query(
    `INSERT INTO notes (name,description, priority) VALUES ("${input.name}","${input.description}","${input.priority}");`,
    (err, result) => {
      if (err) {
        console.error("Error creating notes in db", err);
      } else {
        console.log("note is created in db", result);
      }
    }
  );
}

// update
function update(toUpdateNoteId: number, input: Omit<TNote, "id">) {
  const updatedNotes = notes.map((note) => {
    if (note.id === toUpdateNoteId) {
      return {
        id: note.id,
        name: input.name,
        description: input.description,
        priority: input.priority,
      };
    } else {
      return note;
    }
  });

  notes = updatedNotes;
}

// delete
function deleteNote(toDeleteNoteId: number) {
  const notesAfterDeletion = notes.filter((note) => {
    if (note.id === toDeleteNoteId) {
      return false;
    } else {
      return true;
    }
  });

  notes = notesAfterDeletion;
}

// getById
function getById(noteId: number) {
  const note = notes.find((note) => {
    if (note.id === noteId) {
      return true;
    } else {
      return false;
    }
  });
  return note;
}

// getAll
function getAll() {
  return notes;
}

export const noteService = {
  create,
  update,
  deleteNote,
  getById,
  getAll,
};
