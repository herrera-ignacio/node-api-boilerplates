import { model } from 'mongoose';
import { RoleSchema } from '../schemas';

export const Roles = {
	ADMIN: 'admin',
	MODERATOR: 'moderator',
	USER: 'user',
};

export const Role = model('Role', RoleSchema);
