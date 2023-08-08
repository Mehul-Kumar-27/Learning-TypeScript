import express from "express";
import * as NotesController from "../controllers/notes_controllers";

const routes = express.Router()

routes.get("/", NotesController.getNotes);
routes.get("/:noteId", NotesController.getParticulatNote);
routes.post("/", NotesController.createNotes);
routes.patch("/:noteId", NotesController.updateNote);
routes.delete("/:noteId", NotesController.deleteNote)


export default routes;