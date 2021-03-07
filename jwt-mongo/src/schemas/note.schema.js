import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
	{
		name: String,
		folder: String,
		content: String,
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
