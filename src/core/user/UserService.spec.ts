import { UserRepositoryMock } from '@spec/mocks';
import Container from 'typedi';
import { UserService } from './UserService';

describe('UserService Test Suite', () => {
  const userService = Container.get(UserService);
  describe('createUser', () => {
    test('It should create a new user and return a id', async () => {
      const saveSpy = jest.spyOn(UserRepositoryMock, 'save');
      const newUser = {
        name: 'Joe',
        email: 'joe@email.com',
      };

      const result = await userService.createUser(newUser);

      expect(typeof result).toBe('string');
      expect(saveSpy).toHaveBeenCalled();
    });

    test('It should throw an error if try to create an user without name', async () => {
      const saveSpy = jest.spyOn(UserRepositoryMock, 'save');
      const newUser = {
        name: '',
        email: 'joe@email.com',
      };

      const result = userService.createUser(newUser);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
    });

    test('It should throw an error if try to create an user without email', async () => {
      const saveSpy = jest.spyOn(UserRepositoryMock, 'save');
      const newUser = {
        name: 'Joe',
        email: '',
      };

      const result = userService.createUser(newUser);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
    });
  });

  describe('addPenalty', () => {
    test('It should add a point to penalties count on an existing user', async () => {
      const getSpy = jest.spyOn(UserRepositoryMock, 'getbyEmail');
      const updateSpy = jest.spyOn(UserRepositoryMock, 'update');
      const user = {
        name: 'Joe',
        email: 'joe@email.com',
      };

      await expect(userService.addPenalty(user)).resolves.not.toThrow();

      expect(getSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalled();
    });
    test('It should create a new user if did not exist and add a penalty', async () => {
      const getSpy = jest.spyOn(UserRepositoryMock, 'getbyEmail').mockImplementation(async () => null);
      const saveSpy = jest.spyOn(UserRepositoryMock, 'save');
      const updateSpy = jest.spyOn(UserRepositoryMock, 'update');
      const user = {
        name: 'Joe',
        email: 'joe@email.com',
      };

      await expect(userService.addPenalty(user)).resolves.not.toThrow();

      expect(getSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();
      expect(updateSpy).toHaveBeenCalled();
    });
  });
});
