import { Router } from 'express';
import { IndexController } from '../controllers';

export class IndexRoute {

	constructor() {
		this.path = '/';
		this.router = Router();
		this.indexController = new IndexController();

		this.setRoutes();
	}

	setRoutes() {
		this.router.get(`${this.path}`, this.indexController.index);
	}
}
