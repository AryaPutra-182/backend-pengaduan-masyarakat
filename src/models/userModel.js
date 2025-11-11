import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nama_lengkap: { type: String, required: true },
  nik: { type: String, required: true, unique: true },
  no_hp: { type: String, required: true },
  alamat: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;