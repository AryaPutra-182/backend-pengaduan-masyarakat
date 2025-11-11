const request = require('supertest');
const app = require('../src/index'); // Adjust the path if necessary

describe('Authentication API', () => {
  let token;

  beforeAll(async () => {
    // Register a test user
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nama_lengkap: 'Test User',
        nik: '1234567890123456',
        no_hp: '081234567890',
        alamat: 'Test Address',
        username: 'testuser',
        password: 'TestPassword123'
      });
    expect(res.statusCode).toBe(201);

    // Login to get the token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'TestPassword123'
      });
    expect(loginRes.statusCode).toBe(200);
    token = loginRes.body.data.token; // Adjust based on your response structure
  });

  afterAll(async () => {
    // Cleanup: Logout the test user
    await request(app)
      .post('/api/auth/logout')
      .set('Authorization', `Bearer ${token}`);
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nama_lengkap: 'Another User',
        nik: '9876543210123456',
        no_hp: '081234567891',
        alamat: 'Another Address',
        username: 'anotheruser',
        password: 'AnotherPassword123'
      });
    expect(res.statusCode).toBe(201);
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'TestPassword123'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'WrongPassword'
      });
    expect(res.statusCode).toBe(401);
  });

  it('should get current user profile', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('username', 'testuser');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/api/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nama_lengkap: 'Updated User',
        no_hp: '081234567892',
        alamat: 'Updated Address'
      });
    expect(res.statusCode).toBe(200);
  });

  it('should change user password', async () => {
    const res = await request(app)
      .put('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        current_password: 'TestPassword123',
        new_password: 'NewPassword123'
      });
    expect(res.statusCode).toBe(200);
  });

  it('should not change password with wrong current password', async () => {
    const res = await request(app)
      .put('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        current_password: 'WrongPassword',
        new_password: 'NewPassword123'
      });
    expect(res.statusCode).toBe(400);
  });
});