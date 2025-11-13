import prisma from '../utils/prisma.js';

export const getAllCategories = async () => {
  try {
    return await prisma.kategori.findMany();
  } catch (error) {
    throw new Error('Error fetching categories: ' + error.message);
  }
};

export const createCategory = async (categoryData) => {
  try {
    return await prisma.kategori.create({ data: categoryData });
  } catch (error) {
    throw new Error('Error creating category: ' + error.message);
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const updated = await prisma.kategori.update({ where: { id: Number(id) }, data: categoryData });
    return updated;
  } catch (error) {
    throw new Error('Error updating category: ' + error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const deleted = await prisma.kategori.delete({ where: { id: Number(id) } });
    return deleted;
  } catch (error) {
    throw new Error('Error deleting category: ' + error.message);
  }
};

export const getCategoryById = async (id) => {
  try {
    const category = await prisma.kategori.findUnique({ where: { id: Number(id) } });
    if (!category) throw new Error('Category not found');
    return category;
  } catch (error) {
    throw new Error('Error fetching category: ' + error.message);
  }
};

export default {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};