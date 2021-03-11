import { plainToClass } from 'class-transformer';
import { Repository, DeepPartial } from 'typeorm';
import { ModelEntity } from './model.serializer';

export class ModelRepository<T, K extends ModelEntity> extends Repository<T> {
  async getById(id: string, relations: string [] = []): Promise<K> {
    const entity = await this.findOne({
      where: { id },
      relations,
    });

    return this.transform(entity);
  }

  async createEntity(inputs: DeepPartial<T>, relations: string[] = []): Promise<K> {
    const entity = await this.save(inputs);

    if (relations.length > 0) {
      return this.getById((entity as any).id, relations);
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
