// Import existing dummy data and functions from firebaseApi.js
import {
  getDashboardStats as getFirebaseDashboardStats,
  getCategoryDistribution as getFirebaseCategoryDistribution,
  getExpiringProducts as getFirebaseExpiringProducts,
  getSalesAnalysis as getFirebaseSalesAnalysis,
  getProducts as getFirebaseProducts,
  createProduct as createFirebaseProduct,
  updateProduct as updateFirebaseProduct,
  deleteProduct as deleteFirebaseProduct,
  getExpiryPredictions as getFirebaseExpiryPredictions,
  getStockPredictions as getFirebaseStockPredictions,
  getVelocityAnalysis as getFirebaseVelocityAnalysis,
  getNotifications as getFirebaseNotifications,
  getExpiringSoon as getFirebaseExpiringSoon,
  markNotificationAsRead as markFirebaseNotificationAsRead,
  markAllNotificationsAsRead as markAllFirebaseNotificationsAsRead,
  getAlertSummary as getFirebaseAlertSummary
} from './firebaseApi';

// Re-export all functions to maintain the same API interface
export const getDashboardStats = getFirebaseDashboardStats;
export const getCategoryDistribution = getFirebaseCategoryDistribution;
export const getExpiringProducts = getFirebaseExpiringProducts;
export const getSalesAnalysis = getFirebaseSalesAnalysis;
export const getProducts = getFirebaseProducts;
export const createProduct = createFirebaseProduct;
export const updateProduct = updateFirebaseProduct;
export const deleteProduct = deleteFirebaseProduct;
export const getExpiryPredictions = getFirebaseExpiryPredictions;
export const getStockPredictions = getFirebaseStockPredictions;
export const getVelocityAnalysis = getFirebaseVelocityAnalysis;
export const getNotifications = getFirebaseNotifications;
export const getExpiringSoon = getFirebaseExpiringSoon;
export const markNotificationAsRead = markFirebaseNotificationAsRead;
export const markAllNotificationsAsRead = markAllFirebaseNotificationsAsRead;
export const getAlertSummary = getFirebaseAlertSummary;

// Add missing function that's not in firebaseApi.js
export const updateAlertConfig = async (config) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { message: "Alert config updated", config };
};
