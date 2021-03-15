import { NextFunction, Response, Request } from 'express';
import { NotesService } from './notes.service';

export class NotesController {
  private readonly notesService = new NotesService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.notesService.create(req.body);
      res.status(201).json({ data: note });
    } catch (error) {
      next(error);
    }
  };
}
