import { ModelController } from '../model.controller';
import { User } from './user.entity';
import { UserEntity } from './user.serializer';
import { UsersService } from './users.service';

export class UsersController extends ModelController<User, UserEntity, UsersService> {
  constructor(modelService = new UsersService()) {
    super(modelService);
  }
}
