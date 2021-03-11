import { getCustomRepository } from 'typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UserEntity } from './serializers/user.serializer';

export class UsersService {
  private getRepository = (): UsersRepository => getCustomRepository(UsersRepository);

  async getById(id: string, relations?: string[]): Promise<UserEntity> {
    return this.getRepository().getById(id, relations);
  }

  async create(inputs: Partial<User>, relations?: string[]): Promise<UserEntity> {
    return this.getRepository().createEntity(inputs, relations);
  }
}
