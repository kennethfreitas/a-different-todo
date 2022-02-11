import { TaskService } from '@core/task';
import request from 'supertest';
import Container from 'typedi';
import app from './server';

describe('E2E web app test suite', () => {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().slice(0, 10);

  describe('Test suite to tasks path', () => {
    test('It should create a new task', async () => {
      const response = await request(app)
        .post('/tasks')
        .send({ description: 'Todo something', dueDate: tomorrow, responsible: 'Joe', email: 'joe@email.com' });
      expect(response.statusCode).toBe(201);
    });

    test('It should reject if send a invalid data', async () => {
      const response = await request(app).post('/tasks').send({ description: 'Todo something' });
      expect(response.statusCode).toBe(400);
    });

    test('It should complete a task', async () => {
      const { body } = await request(app)
        .post('/tasks')
        .send({ description: 'Todo something', dueDate: tomorrow, responsible: 'Joe', email: 'joe@email.com' });

      const response = await request(app).post(`/tasks/${body.id}/done`);
      expect(response.statusCode).toBe(204);
    });

    test('It should fail to complete a task', async () => {
      jest.spyOn(Container.get(TaskService), 'completeTask').mockImplementation(() => {
        throw new Error();
      });

      const response = await request(app).post('/tasks/id/done');
      expect(response.statusCode).toBe(500);
    });
  });
});
