import { Request, Response, NextFunction } from "express";
import { noteService, TSort } from "../../services/note";

export async function getAllNotesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("req query parasm", req.query);

    const sortKey = (req.query.sort_key as string) || "created_at";
    const sortDirection = (req.query.direction as TSort) || "asc";
    const page = (req.query.page as string) || 1;
    const perPage = (req.query.per_page as string) || 10;
    const notes = await noteService.getAll(
      {
        sortKey: sortKey,
        direction: sortDirection,
      },
      {
        page: Number(page),
        perPage: Number(perPage),
      }
    );

    res.json({
      data: notes,
      message: "get all notes successfully",
    });
  } catch (error) {
    console.error("error: ", error);
    next((error as any).message);
  }
}
