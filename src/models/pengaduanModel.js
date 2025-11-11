import mongoose from 'mongoose';

const pengaduanSchema = new mongoose.Schema({
  kategori_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Kategori',
    required: true,
  },
  judul: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'proses', 'disetujui', 'selesai', 'ditolak'],
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  lampiran: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lampiran',
  }],
  tanggapan: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tanggapan',
  }],
});

pengaduanSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

const Pengaduan = mongoose.model('Pengaduan', pengaduanSchema);

export default Pengaduan;