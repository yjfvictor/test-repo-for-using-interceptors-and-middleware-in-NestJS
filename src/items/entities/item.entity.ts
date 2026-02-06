import { Exclude, Expose } from 'class-transformer';

/**
 * @brief Entity representing an item in the application.
 * @details This entity is used with ClassSerializerInterceptor to control
 * serialisation of response data. Properties marked with @Exclude() are
 * omitted from the JSON output, while @Expose() ensures specified
 * properties are included. This helps prevent sensitive data from
 * being exposed in API responses.
 */
export class ItemEntity {
  /**
   * @brief Unique identifier for the item.
   */
  @Expose()
  public readonly id: number;

  /**
   * @brief Display name of the item.
   */
  @Expose()
  public readonly name: string;

  /**
   * @brief Optional description of the item.
   */
  @Expose()
  public readonly description: string | undefined;

  /**
   * @brief Internal secret field excluded from serialisation.
   * @details This property is not included in API responses when
   * ClassSerializerInterceptor is used, protecting sensitive data.
   */
  @Exclude()
  public readonly internalSecret: string;

  /**
   * @brief Creates an instance of ItemEntity.
   * @param id Unique identifier.
   * @param name Display name.
   * @param description Optional description.
   * @param internalSecret Internal secret (excluded from responses).
   */
  public constructor(
    id: number,
    name: string,
    description?: string,
    internalSecret?: string,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.internalSecret = internalSecret ?? 'hidden';
  }
}
