export class HttpException extends Error {
    constructor(status = 500, message = 'Something went wrong') {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const defaultHttpException = new HttpException();
