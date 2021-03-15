import { ModelService } from '../model.service';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { UserEntity } from './user.serializer';
import { UserQueryOptions } from './interfaces';

export class UsersService extends ModelService<
User,
UserEntity,
UserQueryOptions,
UsersRepository
> {
  constructor(repo = UsersRepository) {
    super(repo);
  }
}
