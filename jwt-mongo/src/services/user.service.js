import { User } from '../models';
import { RoleService } from '../services';
import { HttpException } from '../exceptions';
import { isEmptyObject } from '../libs/objectUtils';

export class UserService {
	roleService = new RoleService();

	async getUsers({ roles }) {
		let query = {};

		if (roles) {
			const rolesFound = await this.roleService.getRoles({ names: roles });

			if (rolesFound) {
				query.roles = { $in: rolesFound };
			}
		}

		return User.find(query);
	}

	async getUser({ id, username }, { withRoles } = {}) {
		const user = id ? await User.findById(id) : await User.findOne({ username });

		if (!user) throw new HttpException(400, 'User not found');

		if (withRoles) {
			await (user.populate('roles').execPopulate());
		}
		
		return user;
	}

	async createUser(userInput) {
		if (isEmptyObject(userInput)) throw new HttpException(400, 'Invalid user data');

		const roles = userInput.roles ? await this.roleService.getRoles({ names: userInput.roles }) : [];

		const user = new User({
			...userInput,
			roles: roles.map(role => role._id),
		});

		return user.save();
	}
}
