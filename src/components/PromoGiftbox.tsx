import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Gift, X, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PromoGiftbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderModal, setShouldRenderModal] = useState(false);
  
  const triggerRef = useRef<HTMLButtonElement>(null);
  const giftIconRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderModal(true);
    }
  }, [isOpen]);

  useGSAP(() => {
    // Initial trigger entrance
    if (!isOpen) {
      gsap.fromTo(triggerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
      
      // Looping wiggle animation for the gift icon
      gsap.to(giftIconRef.current, {
        rotate: 15,
        duration: 0.15,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2,
        repeatDelay: 2
      });
    }
  }, [isOpen]);

  useGSAP(() => {
    if (isOpen && shouldRenderModal) {
      // Modal Entrance
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    } else if (!isOpen && shouldRenderModal) {
      // Modal Exit
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setShouldRenderModal(false)
      });
    }
  }, [isOpen, shouldRenderModal]);

  return (
    <>
      {/* Floating Gift Box Trigger */}
      {!isOpen && (
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-accent text-white p-3 md:p-4 shadow-lg hover:pl-6 md:hover:pl-8 transition-all duration-300 group overflow-hidden focus:outline-none flex items-center"
          style={{ borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}
        >
          <div className="flex items-center gap-3">
            <span className="hidden group-hover:block whitespace-nowrap text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold pl-1">
              Unlock Gift
            </span>
            <div ref={giftIconRef}>
              <Gift className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
            </div>
          </div>
        </button>
      )}

      {/* Promo Banner Modal */}
      {shouldRenderModal && (
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            style={{ opacity: 0 }}
          />

          {/* Banner Content */}
          <div
            ref={modalRef}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-primary-bg z-[101] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col md:flex-row"
            style={{ opacity: 0 }}
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
          </div>
        </>
      )}
    </>
  );
}
