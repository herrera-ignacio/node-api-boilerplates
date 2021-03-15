import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial } from 'typeorm';
import { ModelEntity } from './model.serializer';
import { UserQueryOptions } from './users/interfaces';
import { NotFoundException } from '../common/exceptions';

export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  async get(queryOptions: UserQueryOptions): Promise<K[]> {
    const { relations } = queryOptions;

    const entities = await this.find({ relations: relations || [] });

    return this.transformMany(entities);
  }

  async getById(id: string, queryOptions: UserQueryOptions): Promise<K> {
    const entity = await this.findOne({
      where: { id },
      relations: queryOptions.relations,
    });

    return this.transform(entity);
  }

  async createEntity(input: DeepPartial<T>, queryOptions?: UserQueryOptions): Promise<K> {
    const entity = await this.save(input);

    if (queryOptions) {
      return this.getById((entity as any).id, queryOptions);
    }

    return this.transform(entity);
  }

  async updateEntity(
    input: { id: string } & DeepPartial<T>,
    queryOptions?: UserQueryOptions,
  ): Promise<K> {
    const entity = await this.preload(input);

    if (!entity) throw new NotFoundException();

    await this.save(entity);

    if (queryOptions) {
      return this.getById((entity as any).id, queryOptions);
    }

    return this.transform(entity);
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
