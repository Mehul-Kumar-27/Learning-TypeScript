import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import NoteModel from "./notes";

const app = express();

app.get("/", async (req, res, next) => {
    try {

        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {

        next(error);

    }

});

app.use((req, res, next) => {
    next(Error("Route Not Found"));
});

app.use((error: unknown, req: Request, res: Response, nest: NextFunction) => {
    console.error(error);
    let errorMessage = "Unknown error occured";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});

export default app;