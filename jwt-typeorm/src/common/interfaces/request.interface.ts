import * as core from 'express-serve-static-core';
import { Request } from 'express';

interface QueryWithWhere extends core.Query {
  where: Record<string, any>;
}

export interface RequestWithWhereQuery extends Request {
  query: QueryWithWhere;
}
