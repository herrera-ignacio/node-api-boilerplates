import { HttpException, defaultHttpException } from '../exceptions';

export function httpErrorMiddleware(error, _req, res, _next) {
    const status = error.status || defaultHttpException.status;
    const message = error.message || defaultHttpException.message;

    console.error('[ERROR] ', status, message);

    return res.status(status).json({ message });
}
