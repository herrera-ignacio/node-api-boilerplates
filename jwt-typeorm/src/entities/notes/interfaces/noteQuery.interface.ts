import { ModelQueryOptions } from '../../model.interface';

export interface NoteQueryOptions extends ModelQueryOptions {
  where: {
    folder?: string;
    creatorId?: string;
  }
}
