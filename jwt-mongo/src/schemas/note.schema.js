import { Schema } from 'mongoose';

export const NoteSchema = new Schema(
	{
		title: String,
		folder: String,
		content: String,
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);
