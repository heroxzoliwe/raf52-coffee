import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, show, onClose }) => {
  const notificationVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={notificationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-4 right-4 z-[100] bg-green-500 text-white rounded-xl shadow-2xl max-w-sm"
        >
          <div className="flex items-center space-x-3 p-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold">Товар добавлен!</p>
              <p className="text-sm opacity-90">{message}</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 3, ease: "linear" }}
            className="h-1 bg-green-600 rounded-b-xl"
            onAnimationComplete={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;