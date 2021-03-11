import { NextFunction, Response, Request } from 'express';
import { UsersService } from './users.service';

export class UsersController {
  private readonly usersService = new UsersService();

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
}
