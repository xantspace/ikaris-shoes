import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { ChevronRight, Heart, Share2, Info, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ShoeViewer from '../components/ShoeViewer';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0]; 
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [is3DView, setIs3DView] = useState(true);
  const [activeImage, setActiveImage] = useState(product.images.main);
  const [openAccordions, setOpenAccordions] = useState<string[]>(['description']);
  const [showSizeError, setShowSizeError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [product.images.main, product.images.hover, ...product.images.gallery],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "IkarisShoes™"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://ikaris-shoes.vercel.app/product/${product.id}`,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviewCount
    }
  };

  useGSAP(() => {
    // Page Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.from('.product-breadcrumb', { y: 20, opacity: 0 })
      .from('.product-gallery', { x: -30, opacity: 0 }, "-=0.7")
      .from('.product-info', { x: 30, opacity: 0 }, "-=0.7");

    // Scroll Progress for 3D Viewer
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
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

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    setShowSizeError(false);
    addToCart({
      product,
      color: selectedColor,
      size: selectedSize
    });
  };

  return (
    <div ref={containerRef} className="pt-24 pb-20 container-custom">
      <SEO 
        title={`${product.name} | Handcrafted Footwear`}
        description={product.description}
        canonical={`https://ikaris-shoes.vercel.app/product/${product.id}`}
        ogType="product"
        ogImage={product.images.main}
        schema={productSchema}
      />
      <div className="product-breadcrumb mb-8 hidden md:flex items-center gap-2 text-xs text-text-secondary uppercase tracking-widest font-mono">
        <Link to="/" className="hover:text-text-primary transition-colors">Home</Link> 
        <ChevronRight className="w-3 h-3" />
        <Link to="/shop" className="hover:text-text-primary transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-text-primary">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        {/* Image / 3D Gallery */}
        <div className="product-gallery w-full lg:w-[60%] flex flex-col md:flex-row-reverse gap-4">
          {/* Main View */}
          <div className="w-full bg-secondary-bg aspect-[4/5] md:aspect-auto md:h-[800px] relative overflow-hidden">
            {is3DView ? (
              <div className="w-full h-full opacity-100 transition-opacity duration-500">
                <ShoeViewer color={selectedColor.hex} scrollProgress={scrollProgress} />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-text-primary/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-tighter text-text-primary pointer-events-none">
                  Scroll to Rotate & Explore
                </div>
              </div>
            ) : (
              <img 
                src={activeImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto hide-scrollbar md:w-24 flex-shrink-0">
            {/* 3D Toggle Thumbnail */}
            <button 
              onClick={() => setIs3DView(true)}
              className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-32 bg-secondary-bg border-2 transition-colors flex flex-col items-center justify-center gap-2 ${is3DView ? 'border-text-primary' : 'border-transparent'}`}
            >
              <div className="w-8 h-8 rounded-full border border-text-primary/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-text-primary rounded-full animate-ping" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">3D View</span>
            </button>

            {[selectedColor.images.main, selectedColor.images.hover, ...selectedColor.images.gallery, ...product.images.gallery].slice(0, 4).map((img, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setActiveImage(img);
                  setIs3DView(false);
                }}
                className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-32 bg-secondary-bg border-2 transition-colors ${!is3DView && activeImage === img ? 'border-text-primary' : 'border-transparent'}`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info container */}
        <div className="product-info w-full lg:w-[40%]">
          <div className="sticky top-28">
            <p className="text-xs uppercase tracking-widest text-text-secondary font-mono mb-2">{product.brand}</p>
            <h1 className="text-3xl md:text-4xl font-display font-medium mb-1">{product.name}</h1>
            <p className="text-lg text-text-secondary mb-6">{product.tagline}</p>
            
            <div className="flex items-center gap-4 mb-8">
              {product.compareAtPrice && (
                <span className="text-text-secondary line-through font-mono text-xl">${product.compareAtPrice}</span>
              )}
              <span className="font-mono text-xl font-medium">${product.price}</span>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="font-medium">Color</span>
                <span className="text-text-secondary">{selectedColor.name}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      setActiveImage(color.images.main);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${selectedColor.name === color.name ? 'border-text-primary' : 'border-transparent'}`}
                  >
                    <span 
                      className="w-8 h-8 rounded-full border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3 justify-between text-sm">
                <span className={`font-medium ${showSizeError ? 'text-red-500' : ''}`}>
                  Size (US) {showSizeError && 'â€” Please select a size'}
                </span>
                <button className="text-text-secondary underline hover:text-text-primary transition-colors flex items-center gap-1">
                  <Info className="w-4 h-4" /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setShowSizeError(false);
                    }}
                    className={`h-12 border text-sm font-medium transition-colors ${
                      selectedSize === size 
                        ? 'border-text-primary bg-text-primary text-white' 
                        : 'border-border bg-transparent hover:border-text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4 mb-10">
              <button 
                onClick={handleAddToCart}
                className="btn-primary flex-1 h-14 btn-magnetic"
              >
                Add to Cart - ${product.price}
              </button>
              <button className="w-14 h-14 border border-border flex items-center justify-center hover:border-text-primary transition-colors rounded-[2px]">
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-border">
              {[
                { id: 'description', title: 'Details', content: product.description },
                { id: 'materials', title: 'Materials & Care', content: product.materials },
                { id: 'shipping', title: 'Shipping & Returns', content: 'Complimentary express shipping on all orders. Returns accepted within 14 days of delivery in original condition.' }
              ].map(section => (
                <div key={section.id} className="border-b border-border">
                  <button 
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full py-5 flex justify-between items-center text-left font-medium hover:text-accent transition-colors"
                  >
                    {section.title}
                    <div className={`transition-transform duration-300 ${openAccordions.includes(section.id) ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${openAccordions.includes(section.id) ? 'max-h-96 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="text-text-secondary text-sm leading-relaxed">
                      {section.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
