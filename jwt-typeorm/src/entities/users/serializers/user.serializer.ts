import { Expose } from 'class-transformer';
import { IUser } from '../interfaces';
import { ModelEntity } from '../../model.serializer';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];

export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];

export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class UserEntity extends ModelEntity implements IUser {
  id: string;

  email: string;

  name: string;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: defaultUserGroupsForSerializing })
  createdAt: Date;

  @Expose({ groups: defaultUserGroupsForSerializing })
  updatedAt: Date;
}
