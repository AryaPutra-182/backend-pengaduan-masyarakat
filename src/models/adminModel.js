import prisma from '../utils/prisma.js';

const normalize = (a) => (a ? { ...a, _id: a.id } : null);

class AdminModel {
  constructor(data = {}) {
    this.data = data;
  }

  async save() {
    const created = await prisma.admin.create({ data: this.data });
    return normalize(created);
  }

  static async find() {
    const list = await prisma.admin.findMany();
    return list.map(normalize);
  }

  static async findByIdAndUpdate(id, data) {
    const updated = await prisma.admin.update({ where: { id: Number(id) }, data });
    return normalize(updated);
  }

  static async findByIdAndDelete(id) {
    const deleted = await prisma.admin.delete({ where: { id: Number(id) } });
    return normalize(deleted);
  }
}

export default AdminModel;