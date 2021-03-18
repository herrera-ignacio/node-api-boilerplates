export interface NoteInput {
  title: string;
  folder: string;
  content: string;
  creatorId: string;
}

export interface NoteUpdateInput extends Partial<NoteInput> {
  id: string;
}
