import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserService } from '../services';
import { HttpException } from '../exceptions';

export class AuthService {
	userService = new UserService();

	createAuthToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: 900 });

	signUp = async (userInput) => {
		const user = await this.userService.createUser({ ...userInput, roles: ["user"] });

		const token = this.createAuthToken(user.id); 

		return { user, token };
	}

	signIn = async ({ username, password }) => {
		const user = await this.userService.getUser({ username });
		console.log(user);

		const isValidPassword = await user.validatePassword(password);

		if (!isValidPassword) throw new HttpException(401, 'Authentication failed');

		const token = this.createAuthToken(user.id); 

		return { user, token };
	}
}