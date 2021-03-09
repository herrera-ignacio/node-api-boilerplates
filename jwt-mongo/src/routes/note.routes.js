import { Router } from 'express';
import { NoteController } from '../controllers';
import { verifyToken, verifyNoteOwnership } from '../middlewares';

export class NoteRoute {
	constructor() {
		this.path = '/notes';
		this.router = Router();
		this.noteController = new NoteController()
		this.setRoutes();
	}

	setRoutes() {
		this.router.get(this.path, this.noteController.getNotes);
		this.router.get(`${this.path}/:id`, this.noteController.getNote);
		this.router.post(this.path, this.noteController.createNote);
		this.router.put(`${this.path}/:id`, verifyToken, verifyNoteOwnership, this.noteController.updateNote);
	}
}
