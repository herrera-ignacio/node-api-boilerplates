import { EntityRepository } from 'typeorm';
import { classToPlain, plainToClass } from 'class-transformer';
import { User } from './user.entity';
import { ModelRepository } from '../model.repository';
import { defaultUserGroupsForSerializing, UserEntity } from './serializers';

@EntityRepository(User)
export class UsersRepository extends ModelRepository<User, UserEntity> {
  transform = (model: User): UserEntity => {
    const transformOptions = {
      groups: defaultUserGroupsForSerializing,
    };

    return plainToClass(
      UserEntity,
      classToPlain(model, transformOptions),
      transformOptions,
    );
  };

  transformMany = (models: User[]): UserEntity[] => models.map(
    (model) => this.transform(model),
  );
}
