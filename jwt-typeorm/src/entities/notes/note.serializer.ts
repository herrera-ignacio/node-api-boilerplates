import { Expose } from 'class-transformer';
import { INote } from './interfaces';
import { ModelEntity } from '../model.serializer';
import { UserEntity } from '../users';

export const defaultNoteGroupsForSerializing: string[] = ['note.timestamps'];

export const creatorNoteGroupForSerializing: string[] = ['note.creator'];

export const allNoteGroupsForSerializing: string[] = [
  ...defaultNoteGroupsForSerializing,
  ...creatorNoteGroupForSerializing,
];

export class NoteEntity extends ModelEntity implements INote {
  id = '';

  title = '';

  content = '';

  folder = '';

  @Expose({ groups: creatorNoteGroupForSerializing })
  creator: UserEntity;

  @Expose({ groups: defaultNoteGroupsForSerializing })
  createdAt = new Date();

  @Expose({ groups: defaultNoteGroupsForSerializing })
  updatedAt = new Date();
}
