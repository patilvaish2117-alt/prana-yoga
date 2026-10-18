/**
 * Storage helpers for localStorage with safe JSON parsing and error handling
 */

export const STORAGE_KEYS = {
  USERS: 'prana_users',
  ACTIVE_USER: 'prana_active_user',
  CART: 'prana_cart',
  ORDERS: 'prana_orders',
  SAVED_ITEMS: 'prana_saved_items',
  NEWSLETTER: 'prana_newsletter_subscribers',
  CONTACT_MESSAGES: 'prana_contact_messages',
};

export const getFromStorage = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};
