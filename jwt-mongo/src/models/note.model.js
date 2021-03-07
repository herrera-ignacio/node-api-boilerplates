import { model } from 'mongoose';
import { NoteSchema } from '../schemas';

export const Note = model('Note', NoteSchema);
