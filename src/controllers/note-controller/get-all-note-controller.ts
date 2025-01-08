import { Request, Response, NextFunction } from "express";
import { noteService, TSort } from "../../services/note";

export async function getAllNotesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("req query parasm", req.query);

  const sortKey = (req.query.sort_key as string) || "created_at";
  const sortDirection = (req.query.direction as TSort) || "asc";
  const notes = await noteService.getAll({
    sortKey: sortKey,
    direction: sortDirection,
  });

  res.json({
    data: notes,
    message: "get all notes successfully",
  });
}
