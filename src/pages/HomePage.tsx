import { ArrowRight } from 'lucide-react';
import { mockProducts, mockCollections } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { CircularTestimonials } from '../components/ui/circular-testimonials';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);


const shoeGallery = [
  { src: '/shoe1.jpg' },
  { src: '/shoe2.jpg' },
  { src: '/shoe3.jpg' }
];

import SEO from '../components/SEO';

export default function HomePage() {
  const covetedProducts = mockProducts.filter(p => p.featured);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Magnetic Button Logic for all .btn-magnetic elements
    const magneticButtons = gsap.utils.toArray<HTMLElement>('.btn-magnetic');
    
    magneticButtons.forEach((btn) => {
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        gsap.to(btn, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)"
        });
      };

      btn.addEventListener('mousemove', onMouseMove);
      btn.addEventListener('mouseleave', onMouseLeave);
    });

    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    tl.from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 })
      .from('.hero-title span', { 
        y: 100, 
        rotateX: -45, 
        opacity: 0, 
        stagger: 0.1,
        transformOrigin: "0% 50% -50"
      }, "-=0.6")
      .from('.hero-p', { opacity: 0, y: 30 }, "-=0.8")
      .from('.hero-btns', { opacity: 0, y: 20 }, "-=0.8")
      .from('.hero-visual', { opacity: 0, scale: 0.9 }, "-=1")
      .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.5");

    // Scroll Indicator Animations
    gsap.to('.scroll-dot', {
      y: 8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to('.scroll-line-fill', {
      y: 48,
      duration: 2,
      repeat: -1,
      ease: "none"
    });

    // Collection Cards Stagger
    gsap.from('.collection-card', {
      scrollTrigger: {
        trigger: '.collections-section',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });

    // Storytelling Image Parallax
    gsap.from('.story-image', {
      scrollTrigger: {
        trigger: '.story-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 15,
      ease: 'none'
    });

    // Product Grid Stagger
    gsap.from('.product-grid-item', {
      scrollTrigger: {
        trigger: '.products-section',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });

  }, { scope: containerRef });

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "IkarisShoes™",
    "url": "https://ikaris-shoes.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ikaris-shoes.vercel.app/shop?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IkarisShoes™",
    "url": "https://ikaris-shoes.vercel.app/",
    "logo": "https://ikaris-shoes.vercel.app/logo.png",
    "sameAs": [
      "https://instagram.com/ikarisshoes",
      "https://twitter.com/ikarisshoes"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via dei Fossi",
      "addressLocality": "Florence",
      "addressRegion": "FI",
      "postalCode": "50123",
      "addressCountry": "IT"
    }
  };

  return (
    <div className="w-full overflow-hidden" ref={containerRef}>
      <SEO 
        title="IkarisShoes™ | The Art of Motion - Handcrafted Luxury Footwear" 
        description="Experience the Art of Motion with IkarisShoes™. Refined silhouettes handcrafted in Florence from premium Tuscan leathers. Sustainable, artisan-made luxury footwear for the modern nomad."
        schema={{ "@graph": [homeSchema, orgSchema] }}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center bg-primary-bg pt-20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 items-center">
          
          {/* Left: Hero Text */}
          <div className="relative z-10 max-w-xl" ref={heroTextRef}>
            <div>
              <span className="hero-sub text-xs uppercase tracking-[0.4em] text-text-secondary font-mono mb-6 block">
                IkarisShoes™ • Florence
              </span>
              <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] mb-8 tracking-tighter">
                <span className="inline-block">THE</span> <span className="inline-block">ART</span> <span className="inline-block">OF</span> <br />
                <span className="text-accent italic pr-4 inline-block">MOTION.</span>
              </h1>
              <p className="hero-p text-lg md:text-xl font-body font-light text-text-secondary mb-12 leading-relaxed">
                Refined silhouettes, handcrafted from the finest Tuscan leathers. Engineered for the modern nomad who values endurance as much as aesthetics.
              </p>
              
              <div className="hero-btns flex flex-col sm:flex-row gap-6">
                <Link to="/shop" className="btn-primary px-10 py-5 btn-magnetic">
                  Explore Collection
                </Link>
                <Link to="/stories" className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors group">
                  Our Stories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Circular UI Component */}
          <div className="hero-visual w-full flex justify-center lg:justify-end">
            <CircularTestimonials 
              testimonials={shoeGallery}
            />
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-10 left-10 hidden lg:flex flex-col items-center gap-2 text-text-secondary/50">
          <span className="text-[10px] uppercase tracking-[0.3em] vertical-text mb-4">Explore</span>
          <div className="scroll-dot-container w-px h-12 bg-border relative overflow-hidden">
            <div className="scroll-dot w-full h-2 bg-text-primary absolute top-0 left-0" />
            <div className="scroll-line-fill absolute top-0 left-0 w-full h-full bg-text-primary -translate-y-full" />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="collections-section py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-primary-bg">
        <div className="container-custom">
          <div className="mb-12 md:mb-16">
            <h2 className="text-sm uppercase tracking-[0.4em] text-text-secondary font-mono mb-4 block">Collections</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight">THE CURATIONS</h3>
          </div>
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0">
            {mockCollections.map((collection) => (
              <div 
                key={collection.id}
                className="collection-card group relative aspect-[3/4] overflow-hidden cursor-pointer min-w-[80vw] md:min-w-0 snap-center mr-4 md:mr-0 last:mr-0"
              >
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/40" />
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
                  <h3 className="text-lg md:text-2xl font-display font-medium mb-1 line-clamp-2">{collection.name}</h3>
                  <p className="opacity-80 text-[10px] md:text-sm font-mono">{collection.productCount} pieces</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="story-section py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-secondary-bg overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full md:w-1/2">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src="/man.jpg" 
                  alt="Craftsman working on a shoe" 
                  className="story-image w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-sm uppercase tracking-widest text-text-secondary font-mono">The Atelier</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight">
                A dedication to materials and motion.
              </h3>
              <p className="text-text-secondary leading-relaxed max-w-md">
                Every pair begins with sourcing the finest Tuscan leathers, followed by 180 distinct steps performed by master artisans. We don't just make shoes; we engineer objects of motion designed to endure.
              </p>
              <div className="pt-4">
                <Link to="/stories" className="btn-secondary btn-magnetic">
                  Discover our story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Coveted (Product Grid) */}
      <section className="products-section py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-primary-bg">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-medium">Most Coveted</h2>
              <p className="text-text-secondary mt-2">The silhouettes defining this season.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 hover:text-accent font-medium transition-colors link-underline">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 gap-y-8 md:gap-y-12">
            {covetedProducts.map((product) => (
              <div
                key={product.id}
                className="product-grid-item"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="btn-secondary w-full">
              View all
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-primary-bg overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.4em] text-text-secondary font-mono mb-4">Experts</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium">VOICES OF ATELIER</h3>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-secondary-bg">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-4">SEEN IN THE WORLD</h2>
            <p className="text-sm text-text-secondary uppercase tracking-widest">Tag @ikarisshoes to be featured</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1478641300939-0ec5188d3802?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=400&auto=format&fit=crop"
            ].map((img, idx) => (
              <div key={idx} className="aspect-square bg-gray-200 overflow-hidden cursor-pointer group">
                <img src={img} alt="Social proof" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

