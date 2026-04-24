import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, Minus, Plus, ShoppingBag, Check, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [hasPlacedOrder, setHasPlacedOrder] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      setShouldRender(true);
    }
  }, [isCartOpen]);

  useGSAP(() => {
    if (isCartOpen && shouldRender) {
      // Entrance animation
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(drawerRef.current, 
        { y: '100%' },
        { y: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else if (!isCartOpen && shouldRender) {
      // Exit animation
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(drawerRef.current, { 
        y: '100%', 
        duration: 0.4, 
        ease: 'power3.in',
        onComplete: () => setShouldRender(false)
      });
    }
  }, [isCartOpen, shouldRender]);

  useGSAP(() => {
    if (hasPlacedOrder && successRef.current) {
      gsap.fromTo(successRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [hasPlacedOrder]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleClose = () => {
    if (hasPlacedOrder) {
      clearCart();
      setHasPlacedOrder(false);
    }
    setIsCartOpen(false);
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        style={{ opacity: 0 }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed bottom-0 left-0 right-0 mx-auto h-[70vh] md:h-[50vh] w-full max-w-3xl bg-primary-bg z-[101] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] flex flex-col rounded-t-2xl sm:rounded-t-3xl"
        style={{ transform: 'translateY(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            {hasPlacedOrder ? (
              <Check className="w-5 h-5 text-accent" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
            <h2 className="text-xl font-display font-medium uppercase tracking-tight">
              {hasPlacedOrder ? 'Order Confirmed' : 'Your Selection'}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-secondary-bg rounded-full transition-colors"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {!hasPlacedOrder ? (
            <div className="p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary-bg rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag className="w-6 h-6 text-text-secondary" />
                  </div>
                  <p className="text-text-secondary font-sans">Your contemporary archive is currently empty.</p>
                  <Link 
                    to="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="btn-primary px-10"
                  >
                    Explore Collection
                  </Link>
                </div>
              ) : (
                items.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${item.color.name}-${item.size}`} 
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-32 bg-secondary-bg flex-shrink-0 overflow-hidden relative">
                      <img 
                        src={item.color.images.main} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-display font-medium text-base leading-tight">{item.product.name}</h3>
                          <p className="font-mono text-sm tracking-tighter">${item.product.price}</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-text-secondary">
                          {item.color.name} • Size {item.size}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-border rounded-sm">
                          <button 
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="px-2 py-1 hover:bg-secondary-bg transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-secondary-bg transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="text-[10px] uppercase tracking-widest text-text-secondary hover:text-accent transition-colors font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            /* SUCCESS STATE */
            <div 
              ref={successRef}
              className="p-8 pb-12"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-3xl font-display font-medium mb-3">Thank You</h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[280px] mx-auto">
                  Your selection has been processed. We are preparing your order at our Florence atelier.
                </p>
              </div>

              <div className="space-y-8">
                {/* Order Meta */}
                <div className="bg-secondary-bg/50 p-6 rounded-sm border border-border">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-4">
                    <span>Status</span>
                    <span className="text-accent">AWAITING CRAFTSMANSHIP</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-text-secondary">Order Number</span>
                    <span className="font-mono">#AN-2024-8842</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-text-secondary">Est. Delivery</span>
                    <span>May 12 - May 15</span>
                  </div>
                </div>

                {/* Shipping Summary */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <Package className="w-4 h-4" />
                    <span>Shipping Manifest</span>
                  </div>
                  <div className="pl-6 border-l border-border space-y-1">
                    <p className="text-sm">Luca Moretti</p>
                    <p className="text-xs text-text-secondary">Via dei Tornabuoni, 14</p>
                    <p className="text-xs text-text-secondary">Florence, 50123 Italy</p>
                  </div>
                </div>

                {/* Order Summary Placeholder */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Summary</span>
                  </div>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary">{item.product.name} (x{item.quantity})</span>
                        <span className="font-mono">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!hasPlacedOrder ? (
          items.length > 0 && (
            <div className="p-8 border-t border-border bg-secondary-bg/30">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">Subtotal</span>
                  <span className="text-2xl font-mono">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">White Glove Delivery</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">COMPLIMENTARY</span>
                </div>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-text-primary text-white py-6 text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden relative group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Proceed to Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <p className="text-[9px] text-center text-text-secondary uppercase tracking-[0.2em]">
                  Secure server • Duties & Taxes included
                </p>
              </div>
            </div>
          )
        ) : (
          <div className="p-8 border-t border-border bg-secondary-bg/30">
            <button 
              onClick={handleClose}
              className="w-full border border-text-primary py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-text-primary hover:text-white transition-all duration-300"
            >
              Return to Boutique
            </button>
          </div>
        )}
      </div>
    </>
  );
}
