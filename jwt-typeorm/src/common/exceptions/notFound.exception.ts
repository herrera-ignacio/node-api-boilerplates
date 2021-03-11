import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor() {
    super(401, 'Resource not found');
  }
}
