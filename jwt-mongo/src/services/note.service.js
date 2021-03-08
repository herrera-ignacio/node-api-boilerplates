import mongoose from "mongoose";
import { Note } from '../models';
import { HttpException } from '../exceptions';
import { isEmptyObject } from '../libs/objectUtils';
import { UserService } from "./user.service";

export class NoteService {
	userService = new UserService();
	
	async getNotes({ folder, creatorId, withCreator }) {
		const query = {};

		if (folder) query.folder = folder;
		if (creatorId) query.creator = creatorId;
		console.log(withCreator);

		return Note.find(query).populate(withCreator ? "creator" : null);
	}

	async getNote({ id }) {
		return Note.findById(id);
	}

	async createNote(noteInput) {
		if (isEmptyObject(noteInput)) throw new HttpException(400, 'Invalid note data');

		return new Note(noteInput).save();
	}
}