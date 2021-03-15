import { NextFunction, Response, Request } from 'express';
import { NotesService } from './notes.service';

export class NotesController {
  private readonly notesService = new NotesService();

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notes = await this.notesService.get(req.query);
      res.status(200).json({ data: notes });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.notesService.getById(req.params.id);
      res.status(200).json({ data: note });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.notesService.create(req.body);
      res.status(201).json({ data: note });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.notesService.update({ id: req.params.id, ...req.body });
      res.status(200).json({ data: note });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.notesService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
