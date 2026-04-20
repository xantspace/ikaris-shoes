import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../data/mockData';

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] bg-secondary-bg overflow-hidden mb-4 block">
        <img 
          src={product.images.main} 
          alt={product.name} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img 
          src={product.images.hover} 
          alt={`${product.name} lifestyle`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
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
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm text-text-primary px-3 py-1.5 md:py-2.5 text-[10px] md:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-text-primary hover:text-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            // Handle Add to cart logic here
          }}
        >
          <Plus className="w-3 h-3 md:w-3.5 md:h-3.5" />
          <span className="hidden sm:inline">Quick Add</span>
          <span className="sm:hidden">Add</span>
        </motion.button>
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
