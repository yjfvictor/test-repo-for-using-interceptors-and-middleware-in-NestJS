import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * @brief Middleware that logs incoming requests before they reach route handlers.
 * @details This middleware runs early in the request lifecycle, before guards,
 * pipes, and interceptors. It logs the HTTP method and URL of each request,
 * then calls next() to pass control to the next middleware or route handler.
 * It is suitable for request-level logging including 404s and other early
 * request processing.
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  /**
   * @brief Processes the request and logs basic request information.
   * @details Invoked for each matching request. Logs the method and original URL,
   * then invokes next() to continue the request-response cycle. Does not modify
   * the request or response objects.
   * @param req Express Request object.
   * @param res Express Response object.
   * @param next NextFunction to pass control to the next middleware.
   */
  public use(req: Request, res: Response, next: NextFunction): void {
    const method: string = req.method;
    const url: string = req.originalUrl ?? req.url;
    // eslint-disable-next-line no-console
    console.log(`[RequestLoggerMiddleware] ${method} ${url}`);
    next();
  }
}
