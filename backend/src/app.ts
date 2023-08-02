import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes_routes"
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes", notesRoutes)

app.use((req, res, next) => {
    next(Error("Route Not Found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, nest: NextFunction) => {
    console.error(error);
    let errorMessage = "Unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;