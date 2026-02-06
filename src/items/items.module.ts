import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

/**
 * @brief Module encapsulating item-related functionality.
 * @details Registers ItemsController and ItemsService for the /items routes.
 */
@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
