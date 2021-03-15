import { getCustomRepository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.serializer';
import { UserQueryOptions, UserInput, UserUpdateInput } from './interfaces';
import { NotFoundException } from '../../common/exceptions';

export class UsersService {
  private getRepository = (): UsersRepository => getCustomRepository(UsersRepository);

  async get(queryOptions?: UserQueryOptions): Promise<UserEntity[]> {
    return this.getRepository().get(queryOptions);
  }

  async getById(id: string, queryOptions?: UserQueryOptions): Promise<UserEntity> {
    const user = await this.getRepository().getById(id, queryOptions);

    if (!user) throw new NotFoundException();

    return user;
  }

  async create(input: UserInput, queryOptions?: UserQueryOptions): Promise<UserEntity> {
    return this.getRepository().saveEntity(input, queryOptions);
  }

  async delete(id: string): Promise<void> {
    const { success } = await this.getRepository().deleteEntity(id);

    if (!success) throw new NotFoundException();
  }

  async update(
    input: UserUpdateInput,
    queryOptions?: UserQueryOptions,
  ): Promise<UserEntity> {
    const user = await this.getById(input.id);

    return this.getRepository().saveEntity(Object.assign(user, input), queryOptions);
  }
}
