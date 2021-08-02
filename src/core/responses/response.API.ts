
import { Response } from 'express'

// API custom Code
enum ApiStatusCode {
    SUCCESS = 'PS00',
    FAILURE = 'PS40',
    RETRY = 'PS70',
    ACCESS_DENIED = 'PS99',
}

// Http status Code
enum HttpStatusCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

abstract class ApiResponse {

    constructor(
        protected apiStatusCode: ApiStatusCode,
        protected httpStatusCode: HttpStatusCode,
        protected message: string
    ) { }

    public send(res: Response): Response { return this.prepare<ApiResponse>(res, this) }

    protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
        return res.status(this.httpStatusCode).json(ApiResponse.sanitize(response))
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.httpStatusCode;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i]
        return clone
    }

}

// Error Responses

export class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
      super(ApiStatusCode.FAILURE, HttpStatusCode.UNAUTHORIZED, message);
    }
}

export class NotFoundResponse extends ApiResponse {
    private url: string | undefined;

    constructor(message = 'Not Found') {
        super(ApiStatusCode.FAILURE, HttpStatusCode.NOT_FOUND, message);
    }

    send(res: Response): Response {
        this.url = res.req?.originalUrl;
        return super.prepare<NotFoundResponse>(res, this);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(ApiStatusCode.FAILURE, HttpStatusCode.FORBIDDEN, message);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(ApiStatusCode.FAILURE, HttpStatusCode.BAD_REQUEST, message);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(ApiStatusCode.FAILURE, HttpStatusCode.INTERNAL_ERROR, message);
    }
}

export class SuccessMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(ApiStatusCode.SUCCESS, HttpStatusCode.SUCCESS, message);
    }
}

export class FailureMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(ApiStatusCode.FAILURE, HttpStatusCode.SUCCESS, message);
    }
}


// Responses

export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data: T) {
        super(ApiStatusCode.SUCCESS, HttpStatusCode.SUCCESS, message);
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
}