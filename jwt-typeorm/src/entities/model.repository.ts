import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial } from 'typeorm';
import { ModelEntity } from './model.serializer';
import { ModelQueryOptions } from './model.interface';

export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  async get(queryOptions: ModelQueryOptions = {}): Promise<K[]> {
    const { where, relations } = queryOptions;

    const entities = await this.find({
      relations: relations || [],
      where: where ? { ...where } : {},
    });

    return this.transformMany(entities);
  }

  async getById(id: string, queryOptions?: ModelQueryOptions): Promise<K> {
    const entity = await this.findOne({
      where: { id },
      relations: queryOptions?.relations,
    });

    return this.transform(entity);
  }

  async saveEntity(input: DeepPartial<T>, queryOptions?: ModelQueryOptions): Promise<K> {
    const entity = await this.save(this.create(input));

    if (queryOptions) {
      return this.getById((entity as any).id, queryOptions);
    }

    return this.transform(entity);
  }

  async updateEntity(
    input: { id: string } & DeepPartial<T>,
    queryOptions?: ModelQueryOptions,
  ): Promise<K> {
    const entity = await this.save(await this.preload(input));

    if (queryOptions) {
      return this.getById((entity as any).id, queryOptions);
    }

    return this.transform(entity);
  }

  async deleteEntity(id: string): Promise<{ success: boolean }> {
    const result = await this.delete(id);

    if (!result || result.affected === 0) return { success: false };

    return { success: true };
  }

  transform = (model: T, transformOptions = {}): K => plainToClass(
    ModelEntity,
    model,
    transformOptions,
  ) as K;

  transformMany = (models: T[], transformOptions = {}): K[] => models.map(
    (model) => this.transform(model, transformOptions),
  );
}
