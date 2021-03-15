import { Router } from 'express';
import { Route } from '../../common/interfaces';
import { UsersController } from './users.controller';

export class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  private usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get(this.path, this.usersController.get);
    this.router.get(`${this.path}/:id`, this.usersController.getById);
    this.router.post(this.path, this.usersController.create);
    this.router.put(`${this.path}/:id`, this.usersController.update);
  }
}
