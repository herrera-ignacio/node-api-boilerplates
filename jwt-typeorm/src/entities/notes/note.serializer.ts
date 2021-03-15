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
  id: string;

  title: string;

  content: string;

  folder: string;

  @Expose({ groups: creatorNoteGroupForSerializing })
  creator: UserEntity;

  @Expose({ groups: defaultNoteGroupsForSerializing })
  createdAt: Date;

  @Expose({ groups: defaultNoteGroupsForSerializing })
  updatedAt: Date;
}
