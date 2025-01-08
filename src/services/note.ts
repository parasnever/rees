import { conn } from "../db";
import { connPromise } from "../db-promise";

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
  // const updatedNotes = notes.map((note) => {
  //   if (note.id === toUpdateNoteId) {
  //     return {
  //       id: note.id,
  //       name: input.name,
  //       description: input.description,
  //       priority: input.priority,
  //     };
  //   } else {
  //     return note;
  //   }
  // });

  // notes = updatedNotes;
  conn.query(
    `
    UPDATE notes SET  
    name = "${input.name}",
    description= "${input.description}",
    priority= ${input.priority}
    WHERE
    id = ${toUpdateNoteId}
    `,
    (err, result) => {
      if (err) {
        console.error("Failed to update", err);
      } else {
        console.log("updated", result);
      }
    }
  );
}

// delete
function deleteNote(toDeleteNoteId: number) {
  // const notesAfterDeletion = notes.filter((note) => {
  //   if (note.id === toDeleteNoteId) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // });

  // notes = notesAfterDeletion;
  conn.query(
    `
  DELETE FROM notes 
  WHERE 
  id = ${toDeleteNoteId}
  `,
    (err, result) => {
      if (err) {
        console.error("Failed to delete", err);
      } else {
        console.log("deleted", result);
      }
    }
  );
}

// getById
async function getById(noteId: number) {
  // const note = notes.find((note) => {
  //   if (note.id === noteId) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  // return note;
  const conn = await connPromise;

  const [rows] = await conn.execute(
    `
  SELECT * FROM notes
  WHERE id = ${noteId}
  `
  );

  //@ts-ignore
  return rows[0];
}

export type TSort = "asc" | "desc";
// getAll
async function getAll(sort: { sortKey: string; direction: TSort }) {
  const conn = await connPromise;
  const [rows] = await conn.execute(`SELECT * FROM notes`);
  return rows;
}

export const noteService = {
  create,
  update,
  deleteNote,
  getById,
  getAll,
};
