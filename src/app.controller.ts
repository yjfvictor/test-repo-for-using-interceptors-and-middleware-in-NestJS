import { Controller, Get } from '@nestjs/common';

/**
 * @brief Root controller for the application.
 * @details Exposes a simple GET / endpoint that returns application info.
 * This route receives global middleware but not the route-specific
 * RequestLoggerMiddleware (which is applied only to ItemsController).
 */
@Controller()
export class AppController {
  /**
   * @brief Returns basic application info.
   * @returns Object with message and available endpoints.
   */
  @Get()
  public getInfo(): { message: string; endpoints: string[] } {
    const message: string =
      'NestJS Interceptors and Middleware Demo';
    const endpoints: string[] = [
      'GET /items',
      'GET /items/:id',
      'POST /items',
      'PUT /items/:id',
      'DELETE /items/:id',
    ];
    const result: { message: string; endpoints: string[] } = {
      message,
      endpoints,
    };
    return result;
  }
}
