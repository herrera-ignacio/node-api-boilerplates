import { getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';
import { UserQueryOptions } from './interfaces/query.interface';

export class UsersService {
  private getRepository = (): UsersRepository => getCustomRepository(UsersRepository);

  async get(queryOptions?: UserQueryOptions): Promise<UserEntity[]> {
    return this.getRepository().get(queryOptions);
  }

  async getById(id: string, queryOptions?: UserQueryOptions): Promise<UserEntity> {
    return this.getRepository().getById(id, queryOptions);
  }

  async create(inputs: Partial<User>, queryOptions?: UserQueryOptions): Promise<UserEntity> {
    return this.getRepository().createEntity(inputs, queryOptions);
  }

  async update(
    inputs: { id: string } & Partial<User>,
    queryOptions?: UserQueryOptions,
  ): Promise<UserEntity> {
    return this.getRepository().updateEntity(inputs, queryOptions);
  }
}
