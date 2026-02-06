import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { ItemEntity } from './entities/item.entity';
import { ItemsService } from './items.service';

/**
 * @brief Controller for item CRUD endpoints.
 * @details Exposes REST endpoints for managing items. Uses LoggingInterceptor
 * at the controller level to log requests and responses, and
 * ClassSerializerInterceptor to serialise ItemEntity with @Exclude()
 * and @Expose() decorators.
 */
@Controller('items')
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
export class ItemsController {
  /**
   * @brief Creates an instance of ItemsController.
   * @param itemsService Injected ItemsService for business logic.
   */
  public constructor(private readonly itemsService: ItemsService) {}

  /**
   * @brief Lists all items.
   * @returns Array of all items (internalSecret excluded by ClassSerializerInterceptor).
   */
  @Get()
  public findAll(): ItemEntity[] {
    const items: ItemEntity[] = this.itemsService.findAll();
    return items;
  }

  /**
   * @brief Retrieves a single item by id.
   * @param id Item id from path parameter.
   * @returns The item if found (internalSecret excluded).
   */
  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): ItemEntity | undefined {
    const item: ItemEntity | undefined = this.itemsService.findOne(id);
    return item;
  }

  /**
   * @brief Creates a new item.
   * @param body Request body with name and optional description.
   * @returns The created item.
   */
  @Post()
  public create(
    @Body() body: { name: string; description?: string },
  ): ItemEntity {
    const name: string = body.name;
    const description: string | undefined = body.description;
    const item: ItemEntity = this.itemsService.create(name, description);
    return item;
  }

  /**
   * @brief Updates an existing item.
   * @param id Item id from path parameter.
   * @param body Request body with name and optional description.
   * @returns The updated item if found.
   */
  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; description?: string },
  ): ItemEntity | undefined {
    const name: string = body.name;
    const description: string | undefined = body.description;
    const item: ItemEntity | undefined = this.itemsService.update(
      id,
      name,
      description,
    );
    return item;
  }

  /**
   * @brief Deletes an item.
   * @param id Item id from path parameter.
   * @returns Object indicating success.
   */
  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): { deleted: boolean } {
    const deleted: boolean = this.itemsService.remove(id);
    const result: { deleted: boolean } = { deleted };
    return result;
  }
}
