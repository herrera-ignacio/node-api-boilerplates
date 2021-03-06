import { Router } from 'express';
import { NoteController } from '../controllers';

export class NoteRoute {
	constructor() {
		this.path = '/notes';
		this.router = Router();
		this.noteController = new NoteController()
		this.setRoutes();
	}

	setRoutes() {
		this.router.get(this.path, this.noteController.getNotes);
	}
}
