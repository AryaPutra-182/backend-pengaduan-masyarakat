const db = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'PengaduanDB',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

const port = process.env.PORT || 3000;

const database = {
  uri: process.env.DATABASE_URL || `mysql://${encodeURIComponent(db.user)}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.database}`,
};

export default {
  db,
  database,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  port,
};