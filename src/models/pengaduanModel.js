import prisma from '../utils/prisma.js';

const normalize = (p) => (p ? { ...p, _id: p.id } : null);

class PengaduanModel {
  constructor(data = {}) {
    this.data = data;
  }

  async save() {
    // Map possible kategori_id -> kategoriId
    const payload = { ...this.data };
    if (payload.kategori_id) {
      payload.kategoriId = Number(payload.kategori_id);
      delete payload.kategori_id;
    }
    if (payload.userId) payload.userId = Number(payload.userId);

    const created = await prisma.pengaduan.create({ data: payload });
    return normalize(created);
  }

  static async find() {
    const list = await prisma.pengaduan.findMany();
    return list.map(normalize);
  }

  static async findById(id) {
    const p = await prisma.pengaduan.findUnique({ where: { id: Number(id) } });
    return normalize(p);
  }

  static async findByIdAndUpdate(id, data) {
    const payload = { ...data };
    if (payload.kategori_id) {
      payload.kategoriId = Number(payload.kategori_id);
      delete payload.kategori_id;
    }
    if (payload.userId) payload.userId = Number(payload.userId);
    const updated = await prisma.pengaduan.update({ where: { id: Number(id) }, data: payload });
    return normalize(updated);
  }

  static async findByIdAndDelete(id) {
    const deleted = await prisma.pengaduan.delete({ where: { id: Number(id) } });
    return normalize(deleted);
  }
}

export default PengaduanModel;