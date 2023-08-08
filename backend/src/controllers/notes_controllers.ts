import { RequestHandler } from "express";
import NoteModel from "../models/notes";
import createHttpError from "http-errors";
import mongoose from "mongoose";
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();

    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getParticulatNote: RequestHandler = async (req, res, next) => {
  const noteID = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteID)) {
      throw createHttpError(400, "Note ID not valid");
    }
    const note = await NoteModel.findById(noteID).exec();
    if (!note) {
      throw createHttpError(404, "Note Not Found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNotesBody {
  title?: string;
  text?: string;
}

export const createNotes: RequestHandler<
  unknown,
  unknown,
  CreateNotesBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title) {
      throw createHttpError(400, "Title cannot be Empty !!");
    }
    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNotesParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, text } = req.body;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Note ID not valid");
    }

    if (!title) {
      throw createHttpError(400, "Title of the Note cannot be empty");
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteId,
      { title, text },
      { new: true, runValidators: true }
    ).exec();

    if (!updatedNote) {
      throw createHttpError(404, "Note Not Found");
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler<
  UpdateNotesParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Note ID not valid");
    }

    const noteToDelete = await NoteModel.findByIdAndDelete(noteId).exec();
    if (!noteToDelete) {
      throw createHttpError(404, "Note Not Found");
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
