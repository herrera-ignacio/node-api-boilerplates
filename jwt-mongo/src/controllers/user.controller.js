import { UserService } from '../services';

export class UserController {
		constructor() {
			this.userService = new UserService();
		}

		getUsers = async (req, res, next) => {
			const { roles } = req.query || {};
			try {
				const users = await this.userService.getUsers({ roles: roles && roles.split(',') });
				return res.status(200).json({ data: users });
			} catch (error) {
				next(error);
			}
		}

		getUser = async (req, res, next) => {
			const { id } = req.params;
			const { username } = req.query || {};

			try {
				const user = await this.userService.getUser({ id, username });
				return res.status(200).json({ data: user });
			} catch (error) {
				next(error);
			}
		}

		createUser = async (req, res, next) => {
			try {
				const user = await this.userService.createUser(req.body);
				return res.status(201).json({ data: user });
			} catch (error) {
				next(error)
			}
		}
}