import request from 'supertest';
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
      expect(response.statusCode).toBe(200);
    });

    test('It should reject if send a invalid data', async () => {
      const response = await request(app).post('/tasks').send({ description: 'Todo something' });
      expect(response.statusCode).toBe(400);
    });
  });
});
