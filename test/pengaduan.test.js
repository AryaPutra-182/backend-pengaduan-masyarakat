const request = require('supertest');
const app = require('../src/index'); // Adjust the path if necessary

describe('Pengaduan API', () => {
  let token;

  beforeAll(async () => {
    // Assuming there's a login endpoint to get a token for testing
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'budisantoso',
        password: 'PasswordSangatKuat123'
      });
    token = response.body.data.token; // Adjust based on your response structure
  });

  describe('POST /pengaduan', () => {
    it('should create a new pengaduan', async () => {
      const response = await request(app)
        .post('/pengaduan')
        .set('Authorization', `Bearer ${token}`)
        .send({
          kategori_id: 1,
          judul: 'Jalan Rusak di Depan Balai RW',
          deskripsi: 'Aspal jalan berlubang besar...',
          lokasi: 'Jl. Merdeka, depan Balai RW 05'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Pengaduan berhasil dikirim');
    });

    it('should return 401 if not authenticated', async () => {
      const response = await request(app)
        .post('/pengaduan')
        .send({
          kategori_id: 1,
          judul: 'Jalan Rusak di Depan Balai RW',
          deskripsi: 'Aspal jalan berlubang besar...',
          lokasi: 'Jl. Merdeka, depan Balai RW 05'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /pengaduan/saya', () => {
    it('should return the user\'s pengaduan history', async () => {
      const response = await request(app)
        .get('/pengaduan/saya')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 401 if not authenticated', async () => {
      const response = await request(app)
        .get('/pengaduan/saya');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /pengaduan/saya/:id', () => {
    it('should return the detail of a specific pengaduan', async () => {
      const pengaduanId = 1; // Replace with a valid ID from your database
      const response = await request(app)
        .get(`/pengaduan/saya/${pengaduanId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty('judul');
    });

    it('should return 404 if pengaduan not found', async () => {
      const response = await request(app)
        .get('/pengaduan/saya/9999') // Assuming this ID does not exist
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});