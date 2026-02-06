import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';

/**
 * @brief Functional middleware applied globally to all routes.
 * @details Logs every incoming request before it reaches any route handler.
 * Applied via app.use() so it runs for all paths. Class-based middleware
 * (RequestLoggerMiddleware) is applied to specific routes in AppModule.
 * @param req Express Request object.
 * @param res Express Response object.
 * @param next NextFunction to pass control.
 */
function globalLogger(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const method: string = req.method;
  const url: string = req.originalUrl ?? req.url;
  // eslint-disable-next-line no-console
  console.log(`[GlobalMiddleware] ${method} ${url}`);
  next();
}

/**
 * @brief Application entry point.
 * @details Bootstrap the NestJS application by creating an instance of AppModule
 * and listening on port 3000 (or the port specified in the PORT environment variable).
 * The application uses global middleware (globalLogger), route-specific middleware
 * (RequestLoggerMiddleware), and interceptors configured in AppModule.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.use(globalLogger);
  const port: number = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
}

bootstrap();
