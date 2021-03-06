import { HttpException } from '../exceptions';

export const httpErrorMiddleware = (error = new HttpException(), _req, res, _next) => {
    const status = error.status;
    const message = error.message;

    console.error('[ERROR] ', status, message);

    res.status(status).json({ message });
}
