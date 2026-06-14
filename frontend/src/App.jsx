import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import ProtectedRoute from './components/ProtectedRoute';
import InteractiveEffects from './components/InteractiveEffects';
import SEOManager from './components/SEOManager';

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
import NotFound from './pages/NotFound';

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
      <SEOManager />
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/pitchers" element={<CategoryPage />} />
          <Route path="/tempers" element={<CategoryPage />} />
          <Route path="/scales" element={<CategoryPage />} />
          <Route path="/accessories" element={<CategoryPage />} />
          <Route path="/coffee-machines" element={<CategoryPage />} />

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

          <Route path="*" element={<NotFound />} />
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