import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  ChevronLeft, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Lock, 
  Info,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('information');
  const [isProcessing, setIsProcessing] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (step) {
      gsap.fromTo('.checkout-step', 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      );
    }
  }, { dependencies: [step], scope: mainRef });

  // Redirect if cart is empty and not on confirmation step
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="pt-32 flex flex-col items-center justify-center min-h-[70vh] gap-6">
        <h2 className="text-2xl font-display uppercase tracking-widest text-text-primary">Your archive is empty</h2>
        <Link to="/shop" className="btn-primary px-12">Return to Boutique</Link>
      </div>
    );
  }

  const handleNext = () => {
    if (step === 'information') setStep('shipping');
    else if (step === 'shipping') setStep('payment');
    else if (step === 'payment') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('confirmation');
        clearCart();
      }, 2500);
    }
  };

  const handlePrev = () => {
    if (step === 'shipping') setStep('information');
    else if (step === 'payment') setStep('shipping');
  };

  return (
    <div className="min-h-screen bg-primary-bg pt-20 flex flex-col font-sans">
      <SEO 
        title="Checkout | IkarisShoes™ Secure Ordering"
        description="Complete your selection with our secure, white-glove checkout process."
        canonical="https://ikaris-shoes.vercel.app/checkout"
      />

      <div className="flex-grow flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-grow lg:w-[60%] px-6 py-12 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Breadcrumbs / Steps */}
            <nav className="flex items-center gap-4 mb-12 text-[9px] uppercase tracking-[0.2em] font-bold">
              <span className={step === 'information' ? 'text-text-primary' : 'text-text-secondary'}>Information</span>
              <span className="w-4 h-px bg-border" />
              <span className={step === 'shipping' ? 'text-text-primary' : 'text-text-secondary'}>Shipping</span>
              <span className="w-4 h-px bg-border" />
              <span className={step === 'payment' ? 'text-text-primary' : 'text-text-secondary'}>Payment</span>
            </nav>

            <div ref={mainRef}>
              {step === 'information' && (
                <div className="checkout-step space-y-10">
                  <header>
                    <h1 className="text-3xl font-display font-medium tracking-tight mb-2 uppercase">Private Information</h1>
                    <p className="text-sm text-text-secondary">Please provide your contact details for artisan validation.</p>
                  </header>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">E-mail Address</label>
                      <input 
                        type="email" 
                        placeholder="luca.moretti@artisan.it"
                        className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-text-secondary/30"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">First Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    className="w-full lg:w-max px-12 py-5 bg-text-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 group"
                  >
                    Continue to Shipping <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {step === 'shipping' && (
                <div className="checkout-step space-y-10">
                  <header className="flex items-center gap-4">
                    <button onClick={handlePrev} className="p-2 -ml-2 hover:bg-secondary-bg rounded-full transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-3xl font-display font-medium tracking-tight mb-2 uppercase">Shipping Manifest</h1>
                      <p className="text-sm text-text-secondary">Where should we deliver your handcrafted selection?</p>
                    </div>
                  </header>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Street Address</label>
                      <input 
                        type="text" 
                        placeholder="Via dei Tornabuoni, 14"
                        className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none placeholder:text-text-secondary/30"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">City</label>
                        <input type="text" className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Postal Code</label>
                        <input type="text" className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-border bg-secondary-bg/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-accent" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest">White Glove Express</p>
                          <p className="text-[10px] text-text-secondary font-mono">Climate-neutral delivery (2-4 Business Days)</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Complimentary</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    className="w-full lg:w-max px-12 py-5 bg-text-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 group"
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {step === 'payment' && (
                <div className="checkout-step space-y-10">
                  <header className="flex items-center gap-4">
                    <button onClick={handlePrev} className="p-2 -ml-2 hover:bg-secondary-bg rounded-full transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h1 className="text-3xl font-display font-medium tracking-tight mb-2 uppercase">Secure Payment</h1>
                      <p className="text-sm text-text-secondary">All transactions are encrypted and processed securely.</p>
                    </div>
                  </header>

                  <div className="space-y-8">
                    {/* Simulated Card Form */}
                    <div className="bg-text-primary text-white p-8 rounded-xl shadow-2xl relative overflow-hidden">
                      <div className="relative z-10 space-y-12">
                        <div className="flex justify-between items-start">
                          <CreditCard className="w-10 h-10 stroke-[1.5]" />
                          <div className="w-12 h-8 bg-white/20 rounded-md" />
                        </div>
                        <div className="space-y-4">
                          <div className="text-xl font-mono tracking-[0.2em]">**** **** **** 8842</div>
                          <div className="flex justify-between items-end">
                            <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Luca Moretti</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">12 / 26</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 blur-3xl rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Security Code</label>
                        <input type="password" placeholder="CVV" className="w-full bg-secondary-bg border-none px-5 py-4 text-sm focus:ring-1 focus:ring-accent outline-none" />
                      </div>
                      <div className="flex items-end text-[9px] text-text-secondary uppercase tracking-widest leading-relaxed">
                        The 3-digit code on the back of your card.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <button 
                      onClick={handleNext}
                      disabled={isProcessing}
                      className="w-full px-12 py-6 bg-text-primary text-white text-[10px] font-bold uppercase tracking-[0.4em] relative group disabled:opacity-70"
                    >
                      <span className={isProcessing ? 'opacity-0' : 'opacity-100 flex items-center justify-center gap-3 transition-opacity'}>
                        Finalize Order <ShieldCheck className="w-4 h-4" />
                      </span>
                      {isProcessing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </div>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-text-secondary text-[10px] uppercase tracking-widest font-bold">
                      <Lock className="w-3 h-3" />
                      <span>End-to-End Encryption Enabled</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 'confirmation' && (
                <div className="checkout-step space-y-12 text-center py-12">
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-medium uppercase">Order Confirmed</h1>
                    <p className="text-text-secondary max-w-sm mx-auto leading-relaxed text-sm">
                      Your selection is now entering our Florence atelier. We will notify you once the craftsmanship is complete.
                    </p>
                  </div>

                  <div className="bg-secondary-bg border border-border p-8 text-left space-y-4 max-w-md mx-auto">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-text-secondary">Identifier</span>
                      <span className="font-mono text-text-primary">#AN-2024-8842</span>
                    </div>
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span className="text-text-secondary">Status</span>
                      <span className="text-accent animate-pulse">PENDING CRAFTSMANSHIP</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link to="/" className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors">
                      Return Home <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Sidebar / Order Summary */}
        {step !== 'confirmation' && (
          <aside className="lg:w-[40%] bg-secondary-bg/30 border-l border-border px-8 py-12 md:px-12 lg:px-16 hidden lg:block overflow-y-auto sticky top-20 h-[calc(100vh-80px)]">
            <div className="max-w-sm ml-0">
               <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-secondary mb-10 flex items-center gap-3">
                <Info className="w-3.5 h-3.5" />
                Your Selection ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>

              <div className="space-y-10 mb-12">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-20 h-28 bg-secondary-bg overflow-hidden relative border border-border/50">
                      <img 
                        src={item.color.images.main} 
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute -top-1 -right-1 bg-text-primary text-white w-6 h-6 text-[10px] rounded-full flex items-center justify-center font-mono shadow-sm">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center gap-1.5">
                      <h4 className="text-sm font-display font-medium leading-tight uppercase tracking-tight">{item.product.name}</h4>
                      <p className="text-[9px] text-text-secondary uppercase tracking-widest font-bold">
                        {item.color.name} • EU {item.size}
                      </p>
                      <p className="text-xs font-mono mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-10 border-t border-border space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary font-medium uppercase tracking-widest text-[10px]">Subtotal</span>
                  <span className="font-mono text-base">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary font-medium uppercase tracking-widest text-[10px]">Shipping</span>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Free Express</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-secondary font-medium uppercase tracking-widest text-[10px]">Taxes & Duties</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold opacity-40">Included</span>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <span className="font-display uppercase tracking-[0.2em] text-sm font-bold">Total</span>
                  <span className="font-mono text-2xl">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-12 bg-white/40 p-6 space-y-4 border border-border">
                <p className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  White Glove Protection
                </p>
                <p className="text-[10px] text-text-secondary leading-relaxed font-sans italic">
                  "Complimentary returns within 30 days. Includes our signature protective dust bags and aromatic cedar trees."
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
