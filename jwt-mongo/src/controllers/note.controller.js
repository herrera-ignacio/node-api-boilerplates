import { NoteService } from '../services';

export class NoteController {
	noteService = new NoteService();

	getNotes = async (req, res, next) => {
		try {
			const notes = await this.noteService.getNotes(req.query || {});
			res.status(200).json({ data: notes });
		} catch (error) {
			next(error);
		}
	}

	getNote = async (req, res, next) => {
		try {
			const note = await this.noteService.getNote(req.params);
			res.status(200).json({ data: note });
		} catch (error) {
			next(error);
		}
	}

	createNote = async (req, res, next) => {
		try {
			const note = await this.noteService.createNote(req.body);
			res.status(201).json({ data: note });
		} catch (error) {
			next(error);
		}
	}
}
