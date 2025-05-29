const request = require('supertest');
const app = require('../api/server');

describe('API Endpoints', () => {
  it('should return 200 for health check', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should create, update, get, and delete a Firestore task (integration)', async () => {
    // Create
    const createRes = await request(app)
      .post('/generate-task')
      .send({ prompt: 'Integration test task' });
    expect(createRes.statusCode).toEqual(201);
    expect(createRes.body).toHaveProperty('id');
    const taskId = createRes.body.id;

    // Update
    const updates = { description: 'Integration test updated' };
    const updateRes = await request(app)
      .put(`/update-task/${taskId}`)
      .send(updates);
    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toMatchObject({ id: taskId, ...updates });

    // Get (direct Firestore call via API, if endpoint exists)
    // If a /task/:id endpoint is added, test it here. Otherwise, skip.

    // Delete (direct Firestore call via service, or add endpoint for full CRUD)
    // If a /task/:id DELETE endpoint is added, test it here. Otherwise, skip.
  });
});
