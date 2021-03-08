import { Role } from '../models';

export class RoleService {
	
	async getRoles({ names }) {
		return Role.find({ name: { $in: names } });
	}
}
