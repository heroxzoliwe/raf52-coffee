import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type = 'success', show, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-black text-white';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '!';
      default:
        return 'i';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center space-x-3 ${getStyles()}`}
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold">
            {getIcon()}
          </div>
          <p className="font-medium">{message}</p>
          <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;