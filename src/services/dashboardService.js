// Minimal dashboard service stub to avoid module-not-found after ESM conversion.
// Replace with real implementation as needed.

export const getStatistics = async () => {
  // return placeholder statistics
  return {
    totalPengaduan: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  };
};

export const getSystemStatistics = async () => {
  return {
    users: 0,
    admins: 0,
    categories: 0,
  };
};

export default {
  getStatistics,
  getSystemStatistics,
};
