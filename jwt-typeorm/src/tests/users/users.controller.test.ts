/* eslint-disable @typescript-eslint/no-unused-vars */
import * as sinon from 'sinon';
import { Response, Request } from 'express';
import {
  UsersController,
  UsersService,
  UserInput,
  UserUpdateInput,
} from '../../entities/users';
import { getUserMocks } from '../fixtures';

describe('User / Controller', () => {
  const sandbox = sinon.createSandbox();

  const {
    userMock,
    userInputMock,
    userUpdateInputMock,
    updatedUserMock,
  } = getUserMocks();

  const usersController = new UsersController();

  const resSpy = {
    json: sinon.spy(function json(_json: JSON) { return this; }),
    status: sinon.spy(function status(_code: number) { return this; }),
    send: sinon.spy(function text(_text: string) { return this; }),
  };

  const nextSpy = sinon.spy(() => null);

  afterEach(() => {
    resSpy.json.resetHistory();
    resSpy.status.resetHistory();
    resSpy.send.resetHistory();
    nextSpy.resetHistory();
    sandbox.restore();
  });

  describe('User / Controller / Get', () => {
    it('Get users', async () => {
      const get = sandbox.spy(() => Promise.resolve([userMock]));

      sandbox.replace(UsersService.prototype, 'get', get);

      await usersController.get({} as Request, resSpy as unknown as Response, nextSpy);

      expect(get.calledOnce).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(200);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: [userMock] });
    });

    it('Get user by id', async () => {
      const getById = sandbox.spy((_id: string) => Promise.resolve(userMock));

      sandbox.replace(UsersService.prototype, 'getById', getById);

      await usersController.getById(
        { params: { id: userMock.id } } as unknown as Request,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(getById.calledOnce).toBe(true);
      expect(getById.getCall(0).args[0]).toEqual(userMock.id);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(200);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: userMock });
    });
  });

  describe('User / Controller / Post', () => {
    it('Create user', async () => {
      const create = sandbox.spy((_input: UserInput) => Promise.resolve(userMock));

      sandbox.replace(UsersService.prototype, 'create', create);

      await usersController.create(
        { body: userInputMock } as unknown as Request,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(create.calledOnce).toBe(true);
      expect(create.getCall(0).args[0]).toEqual(userInputMock);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(201);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: userMock });
    });
  });

  describe('User / Controller / Put', () => {
    it('Update user', async () => {
      const update = sandbox.spy((_input: UserUpdateInput) => Promise.resolve(updatedUserMock));

      sandbox.replace(UsersService.prototype, 'update', update);

      await usersController.update(
        {
          params: { id: userUpdateInputMock.id },
          body: userUpdateInputMock,
        } as unknown as Request,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(update.calledOnce).toBe(true);
      expect(update.getCall(0).args[0]).toEqual(userUpdateInputMock);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(200);
      expect(resSpy.json.calledOnce).toBe(true);
      expect(resSpy.json.getCall(0).args[0]).toEqual({ data: updatedUserMock });
    });
  });

  describe('User / Controller / Delete', () => {
    it('Update user', async () => {
      const deleteSpy = sandbox.spy((_id: string) => Promise.resolve());

      sandbox.replace(UsersService.prototype, 'delete', deleteSpy);

      await usersController.delete(
        { params: { id: userMock.id } } as unknown as Request,
        resSpy as unknown as Response,
        nextSpy,
      );

      expect(deleteSpy.calledOnce).toBe(true);
      expect(deleteSpy.getCall(0).args[0]).toEqual(userMock.id);
      expect(nextSpy.notCalled).toBe(true);
      expect(resSpy.status.calledOnce).toBe(true);
      expect(resSpy.status.getCall(0).args[0]).toEqual(204);
      expect(resSpy.send.calledOnce).toBe(true);
      expect(resSpy.send.getCall(0).args[0]).toBeUndefined();
    });
  });
});