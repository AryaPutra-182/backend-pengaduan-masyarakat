import prisma from '../utils/prisma.js';
import path from 'path';
import fs from 'fs';

export const uploadLampiran = async (req, res) => {
  try {
    const pengaduanId = parseInt(req.params.id);

    if (!req.file) {
      return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const lampiran = await prisma.lampiran.create({
      data: {
        pengaduanId,
        filePath,
      },
    });

    res.status(201).json({
      message: 'Lampiran berhasil diunggah',
      lampiran,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Gagal mengunggah lampiran',
      error: error.message,
    });
  }
};

export const downloadLampiran = async (req, res) => {
  try {
    const { fileId } = req.params;
    const lampiran = await prisma.lampiran.findUnique({
      where: { id: parseInt(fileId) },
    });

    if (!lampiran) {
      return res.status(404).json({ message: 'Lampiran tidak ditemukan' });
    }

    const filePath = path.join(process.cwd(), lampiran.filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File tidak ditemukan di server' });
    }

    res.download(filePath);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      message: 'Gagal mengunduh lampiran',
      error: error.message,
    });
  }
};
