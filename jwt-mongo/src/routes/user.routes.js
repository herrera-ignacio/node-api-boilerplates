import { Router } from 'express';
import { UserController } from '../controllers';
import { verifyToken, verifyAuthorization } from '../middlewares/authJwt';
import { Roles } from '../models';

export class UserRoute {
	constructor() {
		this.path = '/users';
		this.router = Router();
		this.userController = new UserController();
		this.setRoutes();
	}

	setRoutes() {
		this.router.get(`${this.path}`, this.userController.getUsers);
		this.router.get(`${this.path}/:id`, this.userController.getUser);
		this.router.post(`${this.path}`, verifyToken, verifyAuthorization({ roleName: Roles.ADMIN }), this.userController.createUser);
	}
}
