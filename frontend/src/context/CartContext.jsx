import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload
      };
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id && item.category === action.payload.category);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.category === action.payload.category
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => !(item.id === action.payload.id && item.category === action.payload.category))
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.category === action.payload.category
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, user } = useAuth();
  const [notification, setNotification] = useState({ show: false, message: '' });

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem(`vsk52_cart_${user.id}`, JSON.stringify(state.items));
    }
  }, [state.items, user, isAuthenticated]);

  // Загружаем корзину из localStorage при авторизации
  useEffect(() => {
    if (user && isAuthenticated) {
      const savedCart = localStorage.getItem(`vsk52_cart_${user.id}`);
      if (savedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
      }
    } else if (!isAuthenticated) {
      // Если не авторизован, очищаем корзину
      dispatch({ type: 'SET_CART', payload: [] });
    }
  }, [user, isAuthenticated]);

  const showNotification = (message) => {
    setNotification({ show: true, message });
    // Автоматическое скрытие через 3 секунды
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '' });
  };

  const addToCart = (product, quantity = 1) => {
    if (!isAuthenticated) {
      throw new Error('Для добавления товаров в корзину необходимо авторизоваться');
    }
    
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
    
    // Показываем уведомление
    showNotification(`${product.name} добавлен в корзину`);
  };

  const removeFromCart = (productId, category) => {
    if (!isAuthenticated) {
      throw new Error('Для изменения корзины необходимо авторизоваться');
    }
    
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id: productId, category }
    });
  };

  const updateQuantity = (productId, category, quantity) => {
    if (!isAuthenticated) {
      throw new Error('Для изменения корзины необходимо авторизоваться');
    }
    
    if (quantity <= 0) {
      removeFromCart(productId, category);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, category, quantity }
    });
  };

  const clearCart = () => {
    if (!isAuthenticated) {
      throw new Error('Для очистки корзины необходимо авторизоваться');
    }
    
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isAuthenticated,
      notification,
      hideNotification
    }}>
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