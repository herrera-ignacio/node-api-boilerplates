import { ModelController } from '../model.controller';
import { Note } from './note.entity';
import { NoteEntity } from './note.serializer';
import { NotesService } from './notes.service';

export class NotesController extends ModelController<Note, NoteEntity, NotesService> {
  constructor(modelService = new NotesService()) {
    super(modelService);
  }
}
