import { model } from 'mongoose';
import { RoleSchema } from '../schemas';

export const ROLES = ['user', 'admin', 'moderator'];

export const Role = model('Role', RoleSchema);
