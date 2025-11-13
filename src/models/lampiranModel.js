import prisma from '../utils/prisma.js';

const normalize = (l) => (l ? { ...l, _id: l.id } : null);

class LampiranModel {
  constructor(data = {}) {
    this.data = data;
  }

  async save() {
    const payload = { ...this.data };
    if (payload.pengaduanId) payload.pengaduanId = Number(payload.pengaduanId);
    const created = await prisma.lampiran.create({ data: payload });
    return normalize(created);
  }

  static async findById(id) {
    const l = await prisma.lampiran.findUnique({ where: { id: Number(id) } });
    return normalize(l);
  }

  static async findManyByPengaduan(pengaduanId) {
    const list = await prisma.lampiran.findMany({ where: { pengaduanId: Number(pengaduanId) } });
    return list.map(normalize);
  }

  static async deleteById(id) {
    const deleted = await prisma.lampiran.delete({ where: { id: Number(id) } });
    return normalize(deleted);
  }
}

export default LampiranModel;