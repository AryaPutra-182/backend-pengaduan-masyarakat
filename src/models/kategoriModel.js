import prisma from '../utils/prisma.js';

const normalize = (k) => (k ? { ...k, _id: k.id } : null);

class KategoriModel {
  constructor(data = {}) {
    this.data = data;
  }

  async save() {
    const created = await prisma.kategori.create({ data: this.data });
    return normalize(created);
  }

  static async find() {
    const list = await prisma.kategori.findMany();
    return list.map(normalize);
  }

  static async findByIdAndUpdate(id, data) {
    const updated = await prisma.kategori.update({ where: { id: Number(id) }, data });
    return normalize(updated);
  }

  static async findByIdAndDelete(id) {
    const deleted = await prisma.kategori.delete({ where: { id: Number(id) } });
    return normalize(deleted);
  }

  static async findById(id) {
    const k = await prisma.kategori.findUnique({ where: { id: Number(id) } });
    return normalize(k);
  }
}

export default KategoriModel;