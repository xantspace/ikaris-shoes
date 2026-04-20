import { ArrowRight } from 'lucide-react';
import { mockProducts, mockCollections } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CircularTestimonials } from '../components/ui/circular-testimonials';
import { TestimonialCarousel } from '../components/TestimonialCarousel';


const shoeGallery = [
  { src: '/shoe1.jpg' },
  { src: '/shoe2.jpg' },
  { src: '/shoe3.jpg' }
];

export default function HomePage() {
  const covetedProducts = mockProducts.filter(p => p.featured);

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center bg-primary-bg pt-20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-16 items-center">
          
          {/* Left: Hero Text */}
          <div className="relative z-10 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-text-secondary font-mono mb-6 block">
                IkarisShoes™ • Florence
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-[0.9] mb-8 tracking-tighter">
                THE ART OF <br />
                <span className="text-accent italic pr-4">MOTION.</span>
              </h1>
              <p className="text-lg md:text-xl font-body font-light text-text-secondary mb-12 leading-relaxed">
                Refined silhouettes, handcrafted from the finest Tuscan leathers. Engineered for the modern nomad who values endurance as much as aesthetics.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/shop" className="btn-primary px-10 py-5">
                  Explore Collection
                </Link>
                <Link to="/stories" className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest hover:text-accent transition-colors group">
                  Our Stories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Circular UI Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full flex justify-center lg:justify-end"
          >
            <CircularTestimonials 
              testimonials={shoeGallery}
            />
          </motion.div>
        </div>


        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-10 hidden lg:flex flex-col items-center gap-2 text-text-secondary/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] vertical-text mb-4">Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-border relative overflow-hidden"
          >
            <motion.div 
              animate={{ y: [-48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-text-primary"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-primary-bg">
        <div className="container-custom">
          <div className="mb-12 md:mb-16">
            <h2 className="text-sm uppercase tracking-[0.4em] text-text-secondary font-mono mb-4 block">Collections</h2>
            <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight">THE CURATIONS</h3>
          </div>
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0">
            {mockCollections.map((collection, index) => (
              <motion.div 
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer min-w-[80vw] md:min-w-0 snap-center mr-4 md:mr-0 last:mr-0"
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-secondary-bg">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full md:w-1/2">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1549468057-5b6fbca58999?q=80&w=1000&auto=format&fit=crop" 
                  alt="Craftsman working on a shoe" 
                  className="w-full h-full object-cover"
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
                <Link to="#" className="btn-secondary">
                  Discover our story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Coveted (Product Grid) */}
      <section className="py-[var(--spacing-section-y-mobile)] md:py-[var(--spacing-section-y)] bg-primary-bg">
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
            {covetedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
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

