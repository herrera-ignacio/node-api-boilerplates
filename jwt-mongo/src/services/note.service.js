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

	async getNote({ id, withCreator }) {
		return Note.findById(id).populate(withCreator ? "creator": null);
	}

	async createNote(noteInput) {
		if (isEmptyObject(noteInput)) throw new HttpException(400, 'Invalid note data');

		return new Note(noteInput).save();
	}

	async updateNote(id, noteUpdateInput) {
		if (isEmptyObject(noteUpdateInput)) throw new HttpException(400, 'Invalid update data');

		return Note.findByIdAndUpdate(id, noteUpdateInput, { new: true });
	}
}