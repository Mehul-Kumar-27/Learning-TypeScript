import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes_routes"
import morgan from "morgan";
import createHttpError, {isHttpError} from "http-errors";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/notes", notesRoutes)

app.use((req, res, next) => {

   next(createHttpError(404, "Route does not exists"))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, nest: NextFunction) => {
    console.error(error);
    let errorMessage = "Unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status; 
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});


export default app;