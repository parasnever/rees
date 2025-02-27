import express, { Request, Response, NextFunction } from "express";
import { homeController } from "./controllers/home-controller";
import { createNoteRoutes } from "./routes/note-route";
import { AppError } from "./error";
import "./db";
const app = express();
//json parser
app.use(express.json());
app.get("/", homeController);

// note routes
createNoteRoutes(app);

//global error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error("Caught error::", error);
  res.status(error.status || 500).json({
    message: error.message,
    meta: error.meta,
  });
});

app.listen(4001, () => {
  console.log("Server startedd on http://localhost:4001");
});
