import KategoriModel from '../models/kategoriModel.js';

export const getAllCategories = async () => {
  try {
    const categories = await KategoriModel.find();
    return categories;
  } catch (error) {
    throw new Error('Error fetching categories: ' + error.message);
  }
};

export const createCategory = async (categoryData) => {
  try {
    const newCategory = new KategoriModel(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw new Error('Error creating category: ' + error.message);
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const updatedCategory = await KategoriModel.findByIdAndUpdate(id, categoryData, { new: true });
    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return updatedCategory;
  } catch (error) {
    throw new Error('Error updating category: ' + error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const deletedCategory = await KategoriModel.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error('Category not found');
    }
    return deletedCategory;
  } catch (error) {
    throw new Error('Error deleting category: ' + error.message);
  }
};

export const getCategoryById = async (id) => {
  try {
    const category = await KategoriModel.findById(id);
    if (!category) {
      throw new Error('Category not found');
    }
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
};