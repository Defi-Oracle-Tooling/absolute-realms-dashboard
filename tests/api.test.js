const request = require('supertest');
const app = require('../api/server');

describe('API Endpoints', () => {
  it('should return 200 for health check', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/generate-task')
      .send({ prompt: 'Test task generation' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('description');
  });

  it('should update an existing task', async () => {
    const taskId = 'test-task-id';
    const updates = { description: 'Updated task description' };
    const res = await request(app)
      .put(`/update-task/${taskId}`)
      .send(updates);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ id: taskId, ...updates });
  });
});
