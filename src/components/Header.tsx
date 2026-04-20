import { useState, useEffect } from 'react';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, setIsCartOpen } = useCart();
  const { pathname } = useLocation();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomepage = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || !isHomepage
            ? 'bg-primary-bg/95 backdrop-blur-md border-b border-border py-4 shadow-sm'
            : 'bg-primary-bg/80 backdrop-blur-md py-5 border-b border-border/50'
        } text-text-primary`}
      >
        <div className="container-custom flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-display font-semibold tracking-wide uppercase mx-auto md:mx-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0"
          >
            IkarisShoes™
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            <Link to="/shop" className="text-sm font-medium hover:text-accent transition-colors">
              Collection
            </Link>
            <Link to="/stories" className="text-sm font-medium hover:text-accent transition-colors">
              Our Stories
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-accent transition-colors">
              Craftsmanship
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block hover:text-accent transition-colors">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <Link 
              to="/account" 
              className="hidden md:block hover:text-accent transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-accent transition-colors"
            >
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] w-4 h-4 flex items-center justify-center rounded-full bg-text-primary text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-primary-bg flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <span className="text-xl font-display font-semibold uppercase">IkarisShoes™</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-6 text-lg font-display">
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Explore Collection</Link>
              <Link to="/stories" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
              <Link to="#" onClick={() => setIsMobileMenuOpen(false)}>Craftsmanship</Link>
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)}>Account</Link>
            </nav>
            <div className="mt-auto p-6 bg-secondary-bg">
              <p className="text-sm text-text-secondary uppercase tracking-wider mb-4">Client Services</p>
              <div className="space-y-3 text-sm">
                <p>Complimentary Shipping</p>
                <p>Contact the Atelier</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

