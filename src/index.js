import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import pengaduanRoutes from './routes/pengaduan.js';
import adminRoutes from './routes/admin.js';
import masterRoutes from './routes/master.js';
import kategoriRoutes from './routes/kategori.js';
import fileRoutes from './routes/file.js';
import dashboardRoutes from './routes/dashboard.js';
import notifikasiRoutes from './routes/notifikasi.js';
import errorHandler from './middlewares/errorHandler.js';
import config from './config/index.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pengaduan', pengaduanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/master', masterRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifikasi', notifikasiRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose.connect(config.database.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connected successfully');
})
.catch(err => {
  console.error('Database connection error:', err);
});

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});