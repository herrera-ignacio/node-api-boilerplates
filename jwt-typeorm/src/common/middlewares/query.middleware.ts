import { Response, NextFunction } from 'express';
import { RequestWithWhereQuery } from '../interfaces';

export const parseQueryParams = (
  { where, whereRelationIds } : { where?: string[], whereRelationIds?: boolean },
) => (
  req: RequestWithWhereQuery,
  _res: Response,
  next: NextFunction,
): void => {
  if (where) {
    req.query.where = where.reduce(
      (whereParams: Record<string, any>, key: string) => (req.query[key] ? {
        ...whereParams,
        [key]: req.query[key],
      } : whereParams),
      {},
    );
  }

  if (whereRelationIds) {
    const keys = Object.keys(req.query).filter((k) => k.endsWith('Id')).map((k) => k.slice(0, -2));

    keys.forEach((k) => {
      req.query.where[k] = { id: req.query[`${k}Id`] };
    });
  }

  next();
};
