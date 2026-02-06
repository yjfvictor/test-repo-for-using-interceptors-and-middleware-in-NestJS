import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { AppController } from './app.controller';
import { ItemsController } from './items/items.controller';
import { ItemsModule } from './items/items.module';

/**
 * @brief Root application module.
 * @details Configures the application modules and applies RequestLoggerMiddleware
 * to specific routes (ItemsController). The middleware runs before guards, pipes,
 * and interceptors in the request lifecycle. Global middleware is applied in main.ts.
 */
@Module({
  controllers: [AppController],
  imports: [ItemsModule],
})
export class AppModule implements NestModule {
  /**
   * @brief Configures middleware for the application.
   * @details Applies RequestLoggerMiddleware to ItemsController so that
   * all routes defined in that controller (GET /items, GET /items/:id,
   * POST /items, PUT /items/:id, DELETE /items/:id) receive request
   * logging. To apply globally, use forRoutes('*') instead.
   * @param consumer MiddlewareConsumer for applying middleware.
   */
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes(ItemsController);
  }
}
