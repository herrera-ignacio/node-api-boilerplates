import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(401, message || 'Resource not found');
  }
}
