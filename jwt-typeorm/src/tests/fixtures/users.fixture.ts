import { plainToClass } from 'class-transformer';
import { getRandomInt, getRandomString } from '../../common/libs/random';
import { UserEntity, allUserGroupsForSerializing, UserInput, UserUpdateInput } from '../../entities/users';

export const mockUser = (
  userInput: Partial<UserEntity> = {},
): UserEntity => {
  const dateMock = new Date();
  const userData = Object.assign(userInput, {
    id: getRandomInt(0, 100).toString(),
    email: `${getRandomString(getRandomInt(5, 10))}@example.com`,
    name: getRandomString(getRandomInt(5, 10)),
    password: getRandomString(getRandomInt(5, 10)),
    createdAt: dateMock,
    updatedAt: dateMock,
  });

  return plainToClass(
    UserEntity,
    userData,
    { groups: allUserGroupsForSerializing },
  );
};

export const mockUserInput = (user: UserEntity): UserInput => ({
  email: user.email,
  name: user.name,
  password: user.password,
});

export const mockUserUpdateInput = (user: UserEntity): UserUpdateInput => ({
  id: user.id,
  email: `${getRandomString(getRandomInt(5, 10))}@example.com`,
  name: getRandomString(getRandomInt(5, 10)),
});

export const getUserMocks = (): {
  userMock: UserEntity,
  userInputMock: UserInput,
  userUpdateInputMock: UserUpdateInput,
  updatedUserMock: UserEntity,
} => {
  const userMock = mockUser();

  const userInputMock = mockUserInput(userMock);

  const userUpdateInputMock = mockUserUpdateInput(userMock);

  const updatedUserMock = Object.assign(userMock, userUpdateInputMock) as UserEntity;

  return {
    userMock,
    userInputMock,
    userUpdateInputMock,
    updatedUserMock,
  };
};
