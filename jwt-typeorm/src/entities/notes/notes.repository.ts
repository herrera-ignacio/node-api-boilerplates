import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { Note } from './note.entity';
import { ModelRepository } from '../model.repository';
import { allNoteGroupsForSerializing, NoteEntity } from './note.serializer';

@EntityRepository(Note)
export class NotesRepository extends ModelRepository<Note, NoteEntity> {
  transform = (model: Note): NoteEntity => {
    const transformOptions = {
      groups: allNoteGroupsForSerializing,
    };

    return plainToClass(
      NoteEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  };

  transformMany = (models: Note[]): NoteEntity[] => models.map(
    (model) => this.transform(model),
  );
}
