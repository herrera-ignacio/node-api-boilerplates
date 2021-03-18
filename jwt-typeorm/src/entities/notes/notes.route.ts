import { Router } from 'express';
import { Route } from '../../common/interfaces';
import { NoteEntity } from './note.serializer';
import { NoteInputDto, NoteUpdateInputDto } from './dtos/noteInput.dto';
import { NotesController } from './notes.controller';
import {
  parseQueryParams,
  createResourceLink,
  addResourceLinks,
  validationMiddleware,
} from '../../common/middlewares';
import { ClassDescriber } from '../../common/libs/classDescriber';

export class NotesRoute implements Route {
  public path = '/notes';

  public router = Router();

  public links = {
    read: createResourceLink({ method: 'GET', url: this.path }),
    readById: createResourceLink({ method: 'GET', url: `${this.path}/:id` }),
    update: createResourceLink({ method: 'PUT', url: `${this.path}/:id` }),
    create: createResourceLink({ method: 'POST', url: this.path }),
    delete: createResourceLink({ method: 'DELETE', url: `${this.path}/:id` }),
  };

  private notesController = new NotesController();

  private classDescriber = new ClassDescriber();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(
      this.links.read.url,
      addResourceLinks(this.links),
      parseQueryParams({
        where: this.classDescriber.describeClass(NoteEntity),
        whereRelationIds: true,
      }),
      this.notesController.get,
    );

    this.router.get(
      this.links.readById.url,
      addResourceLinks(this.links),
      this.notesController.getById,
    );

    this.router.put(
      this.links.update.url,
      validationMiddleware(NoteUpdateInputDto, { skipMissingProperties: true }),
      addResourceLinks(this.links),
      this.notesController.update,
    );

    this.router.post(
      this.links.create.url,
      validationMiddleware(NoteInputDto),
      addResourceLinks(this.links),
      this.notesController.create,
    );

    this.router.delete(
      this.links.delete.url,
      addResourceLinks(this.links),
      this.notesController.delete,
    );
  }
}
