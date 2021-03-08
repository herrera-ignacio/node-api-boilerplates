import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRoute {
	constructor() {
		this.path = '/auth';
		this.router = Router();
		this.authController = new AuthController();
		this.setRoutes();
	}

	setRoutes() {
		this.router.post(`${this.path}/login`, this.authController.signIn);
	}
}
