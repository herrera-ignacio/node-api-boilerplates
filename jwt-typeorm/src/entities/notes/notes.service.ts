import { getCustomRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { NotesRepository } from './notes.repository';
import { Note } from './note.entity';
import { NoteEntity } from './note.serializer';
import { NoteQueryOptions, NoteInput, NoteUpdateInput } from './interfaces';
import { NotFoundException } from '../../common/exceptions';

export class NotesService {
  private getRepository = (): NotesRepository => getCustomRepository(NotesRepository);

  async get(queryOptions?: NoteQueryOptions): Promise<NoteEntity[]> {
    return this.getRepository().get(queryOptions);
  }

  async getById(id: string, queryOptions?: NoteQueryOptions): Promise<NoteEntity> {
    const note = await this.getRepository().getById(id, queryOptions);

    if (!note) throw new NotFoundException();

    return note;
  }

  async create(input: NoteInput, queryOptions?: NoteQueryOptions): Promise<NoteEntity> {
    const noteInput = plainToClass(
      Note,
      { ...input, creator: input.creatorId },
    );

    return this.getRepository().saveEntity(noteInput, queryOptions);
  }

  async delete(id: string): Promise<void> {
    const { success } = await this.getRepository().deleteEntity(id);

    if (!success) throw new NotFoundException();
  }

  async update(
    input: NoteUpdateInput,
    queryOptions?: NoteQueryOptions,
  ): Promise<NoteEntity> {
    const note = await this.getById(input.id);

    return this.getRepository().saveEntity(Object.assign(note, input), queryOptions);
  }
}
