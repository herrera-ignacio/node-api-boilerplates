import { Response, Request, NextFunction } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { BadRequestException } from '../exceptions';

export const validationMiddleware = (
  type: ClassConstructor<any>,
  options = { skipMissingProperties: false },
) => async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { skipMissingProperties } = options;
    await validateOrReject(plainToClass(type, req.body), { skipMissingProperties });
    next();
  } catch (error) {
    const message = (error as ValidationError[]).map((e) => Object.values(e.constraints)).join(', ');
    next(new BadRequestException(message));
  }
};
