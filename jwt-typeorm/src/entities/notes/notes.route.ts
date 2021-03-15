import { Router } from 'express';
import { Route } from '../../common/interfaces';
import { NotesController } from './notes.controller';

export class NotesRoute implements Route {
  public path = '/notes';
  public router = Router();
  private notesController = new NotesController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(this.path, this.notesController.create);
  }
}
