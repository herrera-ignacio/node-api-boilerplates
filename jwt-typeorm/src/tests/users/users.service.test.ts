/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon';
import {
  UserInput,
  UsersRepository,
  UsersService,
  UserUpdateInput,
} from '../../entities/users';
import { BadRequestException, NotFoundException } from '../../common/exceptions';
import { getUserMocks } from '../fixtures/users.fixture';

describe('User / Service', () => {
  const sandbox = sinon.createSandbox();

  const {
    userMock,
    userInputMock,
    userUpdateInputMock,
    updatedUserMock,
  } = getUserMocks();

  const usersService = new UsersService();

  const usersRepository = new UsersRepository();

  const getRepositorySpy: sinon.SinonSpy<[], UsersRepository> = sinon.spy(() => usersRepository);

  beforeEach(() => {
    getRepositorySpy.resetHistory();
    sandbox.replace(UsersService.prototype, 'getRepository' as any, getRepositorySpy);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('User / Service / Read', () => {
    it('Read all users', async () => {
      const get = sandbox.spy(() => Promise.resolve([userMock]));

      sandbox.replace(UsersRepository.prototype, 'get', get);

      const resSpy = await usersService.get();

      expect(resSpy).toEqual([userMock]);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(get.calledOnce).toBe(true);
    });

    it('Read user by id', async () => {
      const getById = sandbox.spy((_id: string) => Promise.resolve(userMock));

      sandbox.replace(UsersRepository.prototype, 'getById', getById);

      const resSpy = await usersService.getById(userMock.id);

      expect(resSpy).toEqual(userMock);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(getById.calledOnce).toBe(true);
      expect(getById.getCall(0).args[0]).toEqual(userMock.id);
    });

    it('Read user by invalid id throws', async () => {
      const getById = sandbox.spy(() => Promise.resolve(undefined));

      sandbox.replace(UsersRepository.prototype, 'getById', getById);

      await expect(usersService.getById('0')).rejects.toThrow(new NotFoundException());

      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(getById.calledOnce).toBe(true);
    });
  });

  describe('User / Service / Create', () => {
    it('Create user', async () => {
      const saveEntity = sandbox.spy((_input: UserInput) => Promise.resolve(userMock));

      sandbox.replace(UsersRepository.prototype, 'saveEntity', saveEntity);

      const resSpy = await usersService.create(userInputMock);

      expect(resSpy).toEqual(userMock);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(saveEntity.calledOnce).toBe(true);
      expect(saveEntity.getCall(0).args[0]).toEqual(userInputMock);
    });

    it('Create user with missing params throws', async () => {
      await expect(usersService.create({})).rejects.toThrow(new BadRequestException('Missing parameters'));

      expect(getRepositorySpy.notCalled).toBe(true);
    });
  });

  describe('User / Service / Update', () => {
    it('Update user', async () => {
      const getById = sandbox.spy((_id: string) => Promise.resolve(userMock));

      sandbox.replace(UsersService.prototype, 'getById', getById);

      const updateEntity = sandbox.spy(
        (_input: UserUpdateInput) => Promise.resolve(updatedUserMock),
      );

      sandbox.replace(UsersRepository.prototype, 'updateEntity', updateEntity);

      const resSpy = await usersService.update(userUpdateInputMock);

      expect(resSpy).toEqual(updatedUserMock);
      expect(getById.calledOnce).toBe(true);
      expect(getById.getCall(0).args[0]).toEqual(userMock.id);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(updateEntity.calledOnce).toBe(true);
      expect(updateEntity.getCall(0).args[0]).toEqual({ ...updatedUserMock });
    });
  });

  describe('User / Service / Delete', () => {
    it('Delete user by id', async () => {
      const deleteEntity = sandbox.spy((_id: string) => Promise.resolve({ success: true }));

      sandbox.replace(UsersRepository.prototype, 'deleteEntity', deleteEntity);

      const resSpy = await usersService.delete(userMock.id);

      expect(resSpy).toEqual(undefined);
      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(deleteEntity.calledOnce).toBe(true);
      expect(deleteEntity.getCall(0).args[0]).toEqual(userMock.id);
    });

    it('Delete user with invalid id throws', async () => {
      const invalidId = '0';

      const deleteEntity = sandbox.spy((_id: string) => Promise.resolve({ success: false }));

      sandbox.replace(UsersRepository.prototype, 'deleteEntity', deleteEntity);

      await expect(usersService.delete(invalidId)).rejects.toThrow(new NotFoundException());

      expect(getRepositorySpy.calledOnce).toBe(true);
      expect(deleteEntity.calledOnce).toBe(true);
      expect(deleteEntity.getCall(0).args[0]).toEqual(invalidId);
    });
  });
});