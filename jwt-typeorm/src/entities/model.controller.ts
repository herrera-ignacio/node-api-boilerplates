import { NextFunction, Response, Request } from 'express';
import { ModelQueryOptions } from './model.interface';
import { ModelRepository } from './model.repository';
import { ModelEntity } from './model.serializer';
import { ModelService } from './model.service';

export class ModelController<
  T,
  K extends ModelEntity,
  Service extends ModelService<T, K, ModelQueryOptions, ModelRepository<T, K>>,
> {
  private readonly modelService: Service;

  constructor(modelService: Service) {
    this.modelService = modelService;
  }

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const notes = await this.modelService.get(req.query as any);
      res.status(200).json({ data: notes });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.modelService.getById(req.params.id);
      res.status(200).json({ data: note });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.modelService.create(req.body);
      res.status(201).json({ data: note });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const note = await this.modelService.update({ id: req.params.id, ...req.body });
      res.status(200).json({ data: note });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.modelService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
