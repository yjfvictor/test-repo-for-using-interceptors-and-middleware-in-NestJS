import { Injectable } from '@nestjs/common';
import { ItemEntity } from './entities/item.entity';

/**
 * @brief Service providing item business logic.
 * @details Manages an in-memory store of items and exposes methods for
 * CRUD operations. Returns ItemEntity instances that are serialised
 * by ClassSerializerInterceptor to exclude sensitive fields.
 */
@Injectable()
export class ItemsService {
  /**
   * @brief In-memory store of items keyed by id.
   */
  private readonly items: Map<number, ItemEntity> = new Map<number, ItemEntity>();

  /**
   * @brief Counter for generating unique item ids.
   */
  private nextId: number = 1;

  /**
   * @brief Retrieves all items.
   * @returns Array of all ItemEntity instances.
   */
  public findAll(): ItemEntity[] {
    const result: ItemEntity[] = Array.from(this.items.values());
    return result;
  }

  /**
   * @brief Retrieves a single item by id.
   * @param id The item id.
   * @returns The ItemEntity if found, otherwise undefined.
   */
  public findOne(id: number): ItemEntity | undefined {
    const item: ItemEntity | undefined = this.items.get(id);
    return item;
  }

  /**
   * @brief Creates a new item.
   * @param name The item name.
   * @param description Optional description.
   * @returns The created ItemEntity.
   */
  public create(name: string, description?: string): ItemEntity {
    const id: number = this.nextId;
    this.nextId += 1;
    const item: ItemEntity = new ItemEntity(
      id,
      name,
      description,
      `secret-${id}`,
    );
    this.items.set(id, item);
    return item;
  }

  /**
   * @brief Updates an existing item.
   * @param id The item id.
   * @param name The new name.
   * @param description Optional new description.
   * @returns The updated ItemEntity if found, otherwise undefined.
   */
  public update(
    id: number,
    name: string,
    description?: string,
  ): ItemEntity | undefined {
    const existing: ItemEntity | undefined = this.items.get(id);
    if (existing === undefined) {
      return undefined;
    }
    const secret: string = existing.internalSecret;
    const updated: ItemEntity = new ItemEntity(id, name, description, secret);
    this.items.set(id, updated);
    return updated;
  }

  /**
   * @brief Deletes an item by id.
   * @param id The item id.
   * @returns True if the item was deleted, false if not found.
   */
  public remove(id: number): boolean {
    const deleted: boolean = this.items.delete(id);
    return deleted;
  }
}
