import { NextFunction, Response, Request } from 'express';
import { UsersService } from './users.service';

export class UsersController {
  private readonly usersService = new UsersService();

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.usersService.get(req.query);
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.usersService.getById(req.params.id);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.usersService.create(req.body);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await this.usersService.update({ id: req.params.id, ...req.body });
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}
