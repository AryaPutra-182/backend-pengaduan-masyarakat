import prisma from '../utils/prisma.js';

const normalize = (u) => {
  if (!u) return null;
  return { ...u, _id: u.id };
};

class UserModel {
  constructor(data = {}) {
    this.data = data;
  }

  async save() {
    const created = await prisma.user.create({ data: this.data });
    return normalize(created);
  }

  static async findOne(query = {}) {
    const where = {};
    if (query.username) where.username = query.username;
    if (query.nik) where.nik = query.nik;
    if (query._id || query.id) where.id = Number(query._id ?? query.id);

    const user = await prisma.user.findFirst({ where });
    return normalize(user);
  }

  static async findById(id) {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    return normalize(user);
  }

  static async findByIdAndUpdate(id, data) {
    const updated = await prisma.user.update({ where: { id: Number(id) }, data });
    return normalize(updated);
  }

  static async findByIdAndDelete(id) {
    const deleted = await prisma.user.delete({ where: { id: Number(id) } });
    return normalize(deleted);
  }
}

export default UserModel;