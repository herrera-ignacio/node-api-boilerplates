import { AuthService } from "../services";

export class AuthController {
	authService = new AuthService();

	signIn = async (req, res, next) => {
		try {
			const signInData = await this.authService.signIn(req.body);
			res.status(200).json({ data: signInData });
		} catch (error) {
			next(error);
		}
	}

	signUp = async (req, res, next) => {
		try {
			const signUpData = await this.authService.signUp(req.body);
			res.status(201).json({ data: signUpData });
		} catch (error) {
			next(error);
		}
	}
}
