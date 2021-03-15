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
    this.router.get(this.path, this.notesController.get);
    this.router.get(`${this.path}/:id`, this.notesController.getById);
    this.router.put(`${this.path}/:id`, this.notesController.update);
    this.router.post(this.path, this.notesController.create);
    this.router.delete(`${this.path}/:id`, this.notesController.delete);
  }
}
