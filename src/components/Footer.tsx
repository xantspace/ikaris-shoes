import { ArrowRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary-bg border-t border-border pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-xl font-display font-semibold uppercase mb-6">IkarisShoes™</h2>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Crafting exceptional footwear through traditional methods. 
              Designed in Milan, handmade in Florence.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-widest text-text-secondary mb-6 font-semibold">The House</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/stories" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/stories" className="hover:text-accent transition-colors">Craftsmanship</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors">Atelier Menu</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-text-secondary mb-6 font-semibold">Client Services</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Shoe Care</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Bespoke Orders</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-text-secondary mb-6 font-semibold">Join the Atelier</h3>
            <p className="text-sm mb-4">Receive updates on new releases, events, and archive pricing.</p>
            <form className="flex border-b border-text-primary pb-2 items-center">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-secondary"
                required
              />
              <button type="submit" className="text-text-primary hover:text-accent transition-colors ml-2">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border text-xs text-text-secondary">
          <p>Â© {new Date().getFullYear()} IkarisShoes™. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors text-text-primary">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

