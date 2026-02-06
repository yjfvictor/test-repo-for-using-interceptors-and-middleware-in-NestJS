import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * @brief Interceptor that logs request and response data.
 * @details This interceptor captures the HTTP method, URL, and execution time
 * of each request. It logs this information before the route handler runs
 * and after the response is sent. It wraps the request-response stream using
 * RxJS tap operator so that logging occurs on both success and error paths
 * without modifying the response.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * @brief Intercepts the execution flow to add logging around the route handler.
   * @details Invoked before the route handler. Logs the method and URL, records
   * the start time, then passes control to the handler. After the handler
   * completes (or errors), logs the elapsed time. Uses tap() so that the
   * response stream is not modified.
   * @param context ExecutionContext providing access to the request and handler.
   * @param next CallHandler that invokes the route handler.
   * @returns Observable<any> The unmodified observable from the route handler.
   */
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const method: string = request.method;
    const url: string = request.url;
    const now: number = Date.now();

    // eslint-disable-next-line no-console
    console.log(`[LoggingInterceptor] ${method} ${url} - Before handler`);

    return next.handle().pipe(
      tap(() => {
        const elapsed: number = Date.now() - now;
        // eslint-disable-next-line no-console
        console.log(
          `[LoggingInterceptor] ${method} ${url} - After handler (${elapsed}ms)`,
        );
      }),
    );
  }
}
