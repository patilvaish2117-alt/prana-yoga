import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, getFromStorage, saveToStorage } from '../utils/storage';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return getFromStorage(STORAGE_KEYS.CART, []);
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync cart to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, cart);
  }, [cart]);

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  /**
   * Add item to cart
   * Handles both digital yoga programs and physical shop products
   */
  const addToCart = (item, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const itemType = item.type || (item.sessions ? 'program' : 'product');
    const itemTitle = item.title || item.name;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);

      if (existingIndex > -1) {
        // If digital program already in cart, inform user
        if (itemType === 'program') {
          showToast(`"${itemTitle}" is already in your cart!`, 'info');
          return prev;
        }

        // For physical products, increment quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        showToast(`Updated "${itemTitle}" quantity in cart (${updated[existingIndex].quantity})`, 'success');
        return updated;
      }

      // Add fresh item
      const newItem = {
        id: item.id,
        title: itemTitle,
        price: item.price,
        image: item.image,
        type: itemType,
        category: item.category,
        quantity: qty,
        duration: item.duration || null,
        level: item.level || null,
      };

      showToast(`Added "${itemTitle}" to your cart!`, 'success');
      return [...prev, newItem];
    });
  };

  // Update item quantity
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove single item
  const removeFromCart = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        showToast(`Removed "${item.title}" from cart.`, 'info');
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscountPercent(0);
  };

  // Coupon promo code logic
  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a valid coupon code.' };

    if (cleanCode === 'PRANA10') {
      setCouponCode('PRANA10');
      setCouponDiscountPercent(10);
      showToast('10% discount applied with code PRANA10!', 'success');
      return { success: true, message: '10% discount applied!' };
    }
    if (cleanCode === 'PEACE20') {
      setCouponCode('PEACE20');
      setCouponDiscountPercent(20);
      showToast('20% discount applied with code PEACE20!', 'success');
      return { success: true, message: '20% discount applied!' };
    }

    return { success: false, message: 'Invalid promo code. Try "PRANA10" or "PEACE20".' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    showToast('Promo coupon removed.', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const hasPhysicalItems = cart.some((item) => item.type === 'product');
  const hasDigitalPrograms = cart.some((item) => item.type === 'program');

  // Shipping: free for orders ₹999+ or if solely digital
  const shippingFee = hasPhysicalItems ? (subtotal >= 999 ? 0 : 99) : 0;
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        total,
        discountAmount,
        shippingFee,
        couponCode,
        couponDiscountPercent,
        hasPhysicalItems,
        hasDigitalPrograms,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        showToast,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
