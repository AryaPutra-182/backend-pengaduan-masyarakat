import express from 'express';
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
import prisma from './utils/prisma.js';

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/api-specs.json" with { type: "json" };

const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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

// Prisma DB connection
prisma.$connect()
  .then(() => console.log('Prisma connected successfully'))
  .catch((err) => console.error('Prisma connection error:', err));

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});