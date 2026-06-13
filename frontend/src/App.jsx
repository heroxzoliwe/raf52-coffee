import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import ProtectedRoute from './components/ProtectedRoute';
import InteractiveEffects from './components/InteractiveEffects';

import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Buy from './pages/Buy';
import Privacy from './pages/Privacy';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Feedback from './pages/Feedback';

import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';

import './index.css';

const NotificationWrapper = () => {
  const { notification, hideNotification } = useCart();

  return (
    <Notification
      message={notification.message}
      show={notification.show}
      onClose={hideNotification}
    />
  );
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/buy" element={<Buy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/feedback" element={<Feedback />} />

          <Route path="/product/:category/:slug" element={<ProductPage />} />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </main>

      <Footer />

      <InteractiveEffects />
      <NotificationWrapper />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;