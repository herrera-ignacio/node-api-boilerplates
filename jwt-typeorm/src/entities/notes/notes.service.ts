import { ModelService } from '../model.service';
import { NotesRepository } from './notes.repository';
import { Note } from './note.entity';
import { NoteEntity } from './note.serializer';
import { NoteQueryOptions, NoteInput } from './interfaces';

export class NotesService extends ModelService<
Note,
NoteEntity,
NoteQueryOptions,
NotesRepository
> {
  constructor(repo = NotesRepository) {
    super(repo);
  }

  async create(input: NoteInput, queryOptions?: NoteQueryOptions): Promise<NoteEntity> {
    const noteInput = { ...input, creator: input.creatorId as any };

    return this.getRepository().saveEntity(noteInput, queryOptions);
  }
}
