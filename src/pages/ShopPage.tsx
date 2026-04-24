import { useState, useRef } from 'react';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ShopPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['Derby', 'Loafer', 'Boot', 'Oxford'];
  const materials = ['Leather', 'Suede', 'Patent'];

  useGSAP(() => {
    // Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.from('.shop-header > *', {
      y: 30,
      opacity: 0,
      stagger: 0.1
    })
    .from('.shop-sidebar', {
      x: -20,
      opacity: 0
    }, "-=0.5")
    .from('.shop-toolbar', {
      y: 20,
      opacity: 0
    }, "-=0.8");

    // Grid Items Batch Reveal
    ScrollTrigger.batch('.shop-product-item', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            duration: 0.8, 
            ease: 'power2.out',
            overwrite: true 
          }
        );
      },
      start: 'top 90%',
    });

    // Magnetic Buttons
    const magneticButtons = gsap.utils.toArray<HTMLElement>('.btn-magnetic');
    magneticButtons.forEach((btn) => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
      };
      const onMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
      };
      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
    });

  }, { scope: containerRef });

  return (
    <div className="pt-24 pb-20 container-custom" ref={containerRef}>
      <SEO 
        title="Shop Luxury Italian Shoes & Handcrafted Leather Boots" 
        description="Explore our curated collection of handcrafted Oxfords, Loafers, and Chelsea Boots. Made in Italy with sustainable Tuscan leather. Worldwide shipping available."
        canonical="https://ikaris-shoes.vercel.app/shop"
      />
      
      {/* Breadcrumb & Header */}
      <div className="shop-header">
        <div className="mb-8 hidden md:block">
          <p className="text-xs text-text-secondary uppercase tracking-widest font-mono">
            <a href="/" className="hover:text-text-primary transition-colors">Home</a> <span className="mx-2">/</span> Shop
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 lg:mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-medium mb-4 text-center md:text-left">The Collection</h1>
            <p className="text-text-secondary max-w-lg text-center md:text-left">
              Discover our complete range of meticulously handcrafted footwear, designed to stand the test of time.
            </p>
          </div>
          
          {/* Toolbar */}
          <div className="shop-toolbar w-full md:w-auto mt-8 md:mt-0 flex justify-between items-center gap-6 border-t border-b md:border-none border-border py-4 md:py-0">
            <button 
              className="md:hidden flex items-center gap-2 text-sm uppercase tracking-widest font-medium"
              onClick={() => {
                const filterEl = document.querySelector('.mobile-filters');
                if (!isFilterOpen) {
                  setIsFilterOpen(true);
                  gsap.fromTo(filterEl, 
                    { height: 0, opacity: 0 }, 
                    { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
                  );
                } else {
                  gsap.to(filterEl, { 
                    height: 0, 
                    opacity: 0, 
                    duration: 0.4, 
                    ease: 'power3.inOut',
                    onComplete: () => setIsFilterOpen(false)
                  });
                }
              }}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              <span className="text-text-secondary">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer hover:text-accent transition-colors pb-1"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>

            <div className="hidden md:flex items-center gap-2 border-l border-border pl-6">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <div className="md:hidden text-sm text-text-secondary">
              {mockProducts.length} Results
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Dropdown */}
      <div 
        className="mobile-filters lg:hidden overflow-hidden bg-secondary-bg border-b border-border mb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 h-0 opacity-0"
        style={{ display: isFilterOpen ? 'block' : 'none' }}
      >
        <div className="py-8 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-secondary mb-5">By Collection</h4>
              <div className="space-y-4">
                {categories.map(category => (
                  <label key={category} className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-4 h-4 border border-border group-hover:border-text-primary transition-colors"></div>
                    <span className="text-sm tracking-wide">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-secondary mb-5">By Material</h4>
              <div className="space-y-4">
                {materials.map(material => (
                  <label key={material} className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-4 h-4 border border-border group-hover:border-text-primary transition-colors"></div>
                    <span className="text-sm tracking-wide">{material}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-secondary mb-8">Price Scale</h4>
            <div className="px-2">
              <input type="range" className="w-full accent-text-primary mb-4" min="500" max="2000" />
              <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase">
                <span>From $500</span>
                <span>To $2000+</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             <button 
              className="flex-1 bg-text-primary text-white py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-accent transition-colors"
              onClick={() => {
                const filterEl = document.querySelector('.mobile-filters');
                gsap.to(filterEl, { 
                  height: 0, 
                  opacity: 0, 
                  duration: 0.4, 
                  ease: 'power3.inOut',
                  onComplete: () => setIsFilterOpen(false)
                });
              }}
            >
              Apply Selection
            </button>
            <button 
              className="px-6 border border-border text-text-secondary py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-text-primary transition-colors"
              onClick={() => {
                const filterEl = document.querySelector('.mobile-filters');
                gsap.to(filterEl, { 
                  height: 0, 
                  opacity: 0, 
                  duration: 0.4, 
                  ease: 'power3.inOut',
                  onComplete: () => setIsFilterOpen(false)
                });
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar Filter */}
        <aside className="shop-sidebar hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-lg">Filters</h3>
              <button className="text-xs text-text-secondary hover:text-text-primary underline">Clear all</button>
            </div>
            
            {/* Filter Sections */}
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Style</h4>
                <div className="space-y-2.5">
                  {categories.map(category => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-border flex items-center justify-center group-hover:border-text-primary transition-colors"></div>
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Material</h4>
                <div className="space-y-2.5">
                  {materials.map(material => (
                    <label key={material} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-border flex items-center justify-center group-hover:border-text-primary transition-colors"></div>
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{material}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Price Range</h4>
                <div className="px-2">
                  <input type="range" className="w-full mb-4 accent-text-primary" min="500" max="2000" />
                  <div className="flex justify-between text-xs font-mono text-text-secondary">
                    <span>$500</span>
                    <span>$2000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-6 hidden lg:flex">
            {/* Active filter pills would go here */}
          </div>
          
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-2 xl:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12"
              : "flex flex-col gap-12"
          }>
            {mockProducts.map((product) => (
              <div key={product.id} className="shop-product-item opacity-0">
                <ProductCard product={product} />
              </div>
            ))}
            
            {/* Duplicate to make grid look full */}
            {mockProducts.map((product) => (
              <div key={`${product.id}-2`} className="shop-product-item opacity-0">
                <ProductCard product={{...product, id: product.id + '2'}} />
              </div>
            ))}
          </div>
          
          {/* Pagination/Load More */}
          <div className="mt-20 text-center">
            <button className="btn-secondary btn-magnetic">Load More Designs</button>
          </div>
        </div>
      </div>
    </div>
  );
}
