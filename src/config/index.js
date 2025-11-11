const db = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sistem_pengaduan',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
};

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const port = process.env.PORT || 3000;

const database = {
  uri: process.env.DATABASE_URI || `mongodb://${db.host}:${db.port}/${db.database}`,
};

export default {
  db,
  database,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  port,
};