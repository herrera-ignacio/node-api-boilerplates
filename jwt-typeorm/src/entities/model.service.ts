import { DeepPartial, getCustomRepository, ObjectType } from 'typeorm';
import { ModelEntity } from './model.serializer';
import { ModelQueryOptions } from './model.interface';
import { BadRequestException, NotFoundException } from '../common/exceptions';
import { ModelRepository } from './model.repository';
import { isEmptyObject } from '../common/libs/objectUtils';

export class ModelService<
  T,
  K extends ModelEntity,
  QueryOptions extends ModelQueryOptions,
  Repo extends ModelRepository<T, K>,
> {
  private readonly repo: ObjectType<Repo>;

  constructor(repoEntity: ObjectType<Repo>) {
    this.repo = repoEntity;
  }

  getRepository(): Repo {
    return getCustomRepository(this.repo);
  }

  async get(queryOptions?: QueryOptions): Promise<K[]> {
    return this.getRepository().get(queryOptions);
  }

  async getById(id: string, queryOptions?: QueryOptions): Promise<K> {
    const note = await this.getRepository().getById(id, queryOptions);

    if (!note) throw new NotFoundException();

    return note;
  }

  async create(input: DeepPartial<T>, queryOptions?: QueryOptions): Promise<K> {
    if (isEmptyObject(input)) throw new BadRequestException('Missing parameters');

    return this.getRepository().saveEntity(input, queryOptions);
  }

  async update(
    input: { id: string } & DeepPartial<T>,
    queryOptions?: QueryOptions,
  ): Promise<K> {
    const note = await this.getById(input.id);

    return this.getRepository().updateEntity(Object.assign(note, input), queryOptions);
  }

  async delete(id: string): Promise<void> {
    const { success } = await this.getRepository().deleteEntity(id);

    if (!success) throw new NotFoundException();
  }
}
