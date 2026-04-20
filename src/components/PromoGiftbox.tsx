import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoGiftbox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Gift Box Trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-accent text-white p-3 md:p-4 shadow-lg hover:pl-6 md:hover:pl-8 transition-all duration-300 group overflow-hidden focus:outline-none flex items-center"
            style={{ borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}
          >
            <div className="flex items-center gap-3">
              <span className="hidden group-hover:block whitespace-nowrap text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold pl-1">
                Unlock Gift
              </span>
              <motion.div
                animate={{ rotate: [0, -15, 15, -15, 15, 0, 0, 0, 0, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <Gift className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Promo Banner Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            />

            {/* Banner Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-primary-bg z-[101] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col md:flex-row"
            >
              {/* Image Half */}
              <div className="relative h-40 md:h-auto md:w-[45%] w-full">
                <img 
                  src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80" 
                  alt="Exclusive Offer Lifestyle" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
                
                {/* Close Button on Mobile */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="md:hidden absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Text Half */}
              <div className="p-6 md:p-8 md:w-[55%] flex flex-col justify-center text-center md:text-left relative">
                {/* Close Button on Desktop */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hidden md:flex absolute top-3 right-3 p-1.5 text-text-secondary hover:bg-secondary-bg hover:text-text-primary rounded-full transition-colors"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>

                <div className="inline-flex items-center justify-center p-2.5 bg-secondary-bg rounded-full mb-4 self-center md:self-start relative">
                  <div className="absolute inset-0 bg-accent/10 rounded-full animate-ping" />
                  <Tag className="w-4 h-4 text-accent relative z-10" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-medium text-text-primary mb-2">
                  An Exclusive Welcome
                </h3>
                <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-6">
                  Enjoy complimentary worldwide delivery and <span className="text-accent font-medium">15% off</span> your first order from our contemporary archive.
                </p>

                <div className="bg-secondary-bg p-4 rounded-sm border border-border border-dashed mb-6 text-center">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-1.5">Use Code at Checkout</p>
                  <p className="text-xl md:text-2xl font-mono font-bold tracking-widest text-text-primary">FIRENZE15</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-text-primary text-white py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-1.5 group"
                  >
                    Claim Offer
                  </button>
                  <Link 
                    to="/shop"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 border border-text-primary text-text-primary py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-text-primary hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
