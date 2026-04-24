import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import StoriesPage from './pages/StoriesPage';
import AccountPage from './pages/AccountPage';
import CraftsmanshipPage from './pages/CraftsmanshipPage';
import CheckoutPage from './pages/CheckoutPage';
import PromoGiftbox from './components/PromoGiftbox';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ScrollToTop />
          <Header />
          <CartDrawer />
          <PromoGiftbox />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
