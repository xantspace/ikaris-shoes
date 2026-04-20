import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/mockData';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col relative w-full h-full">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-secondary-bg overflow-hidden mb-4 block">
        {/* Main image (visible by default, hidden on hover) */}
        <img 
          src={product.images.main} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0"
        />
        {/* Hover image (hidden by default, visible on hover) */}
        <img 
          src={product.images.hover} 
          alt={`${product.name} lifestyle`} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.newRelease && (
            <span className="text-[10px] uppercase font-mono tracking-wider bg-white px-2 py-1">Latest Release</span>
          )}
          {product.archivePricing && (
            <span className="text-[10px] uppercase font-mono tracking-wider bg-accent text-white px-2 py-1">Archive Pricing</span>
          )}
        </div>

        {/* Quick Add Button */}
        <button 
          className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-text-primary px-3 py-1.5 md:py-2.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-text-primary hover:text-white transition-all duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20"
          onClick={(e) => {
            e.preventDefault();
            // Handle Add to cart logic here
          }}
        >
          <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span className="hidden sm:inline">Quick Add</span>
          <span className="sm:hidden">Add</span>
        </button>
      </Link>

      <div className="flex flex-col flex-grow">
        <p className="text-[10px] font-mono uppercase tracking-widest text-text-secondary mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="text-base font-body font-medium mb-1 group-hover:text-accent transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-auto pt-1">
          {product.compareAtPrice && (
            <span className="text-text-secondary line-through font-mono text-sm">${product.compareAtPrice}</span>
          )}
          <span className="font-mono font-medium">${product.price}</span>
        </div>
        
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.map(color => (
            <div 
              key={color.name}
              className="w-3 h-3 rounded-full border border-border"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 2 && (
            <span className="text-xs text-text-secondary ml-1">+{product.colors.length - 2}</span>
          )}
        </div>
      </div>
    </div>
  );
}
