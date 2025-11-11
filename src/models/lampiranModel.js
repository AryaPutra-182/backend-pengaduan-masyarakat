import mongoose from 'mongoose';

const lampiranSchema = new mongoose.Schema({
  pengaduanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pengaduan',
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lampiran = mongoose.model('Lampiran', lampiranSchema);

export default Lampiran;