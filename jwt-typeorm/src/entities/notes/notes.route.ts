import { Router } from 'express';
import { Route } from '../../common/interfaces';
import { NoteEntity } from './note.serializer';
import { NotesController } from './notes.controller';
import { parseQueryParams } from '../../common/middlewares';
import { ClassDescriber } from '../../common/libs/classDescriber';

export class NotesRoute implements Route {
  public path = '/notes';
  public router = Router();
  private notesController = new NotesController();
  private classDescriber = new ClassDescriber();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(
      this.path,
      parseQueryParams({
        where: this.classDescriber.describeClass(NoteEntity),
        whereRelationIds: true,
      }),
      this.notesController.get,
    );
    this.router.get(`${this.path}/:id`, this.notesController.getById);
    this.router.put(`${this.path}/:id`, this.notesController.update);
    this.router.post(this.path, this.notesController.create);
    this.router.delete(`${this.path}/:id`, this.notesController.delete);
  }
}
