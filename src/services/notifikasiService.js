// Minimal notifikasi service stub to avoid module-not-found after ESM conversion.
// Replace with real implementation as needed.

export const getNotifikasi = async (userId, status) => {
  return [];
};

export const markAllAsRead = async (userId) => {
  return true;
};

export const markAsRead = async (userId, id) => {
  return true;
};

export default {
  getNotifikasi,
  markAllAsRead,
  markAsRead,
};
