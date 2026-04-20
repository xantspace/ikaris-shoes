import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { mockStories } from '../data/mockData';

const categories = ['All Stories', 'Craftsmanship', 'Lifestyle', 'Materials', 'Inspiration'];

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');

  const filteredStories = selectedCategory === 'All Stories' 
    ? mockStories 
    : mockStories.filter(story => story.category === selectedCategory);

  return (
    <div className="pt-24 min-h-screen bg-primary-bg font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
            alt="IkarisShoes™ Craft" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </motion.div>
        <div className="relative text-center text-white px-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm uppercase tracking-[0.3em] mb-4 text-accent font-semibold"
          >
            EDITORIAL
          </motion.p>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6"
          >
            The Atelier Stories
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-24 h-px bg-accent mx-auto"
          />
        </div>
      </section>

      {/* Filter / Category Header (Minimal) */}
      <div className="border-b border-border sticky top-20 z-40 bg-primary-bg/80 backdrop-blur-md">
        <div className="container-custom py-6 flex flex-wrap justify-center gap-6 md:gap-12">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative py-2 ${
                selectedCategory === cat ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat}
              {selectedCategory === cat && (
                <motion.div 
                  layoutId="categoryUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <section className="container-custom py-24 min-h-[600px]">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        >
          <AnimatePresence mode='popLayout'>
            {filteredStories.map((story) => (
              <motion.article 
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-secondary-bg">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute top-6 left-6 bg-white px-4 py-1.5 text-[9px] font-bold tracking-widest uppercase text-text-primary shadow-sm">
                    {story.category}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-text-secondary flex items-center gap-3">
                    <span>{story.date}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span>{story.readTime} read</span>
                  </p>
                  <h3 className="text-2xl font-display font-medium leading-tight group-hover:text-accent transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed line-clamp-3 font-sans text-sm">
                    {story.excerpt}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
                      Discover More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary font-display text-xl uppercase tracking-widest italic">No stories found in this category.</p>
          </div>
        )}
      </section>

      {/* Featured Quote / Interstitial */}
      <section className="py-32 bg-primary-bg overflow-hidden border-t border-border">
        <div className="container-custom text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-6xl font-serif text-accent opacity-30">"</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium italic leading-tight">
              A shoe is not a piece of clothing. It's a sculpture that carries your weight and your history.
            </h2>
            <p className="text-xs uppercase tracking-widest font-semibold text-text-secondary">â€” The Atelier Philosophy</p>
          </motion.div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="bg-secondary-bg py-32 overflow-hidden border-t border-border">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-32">
            <div className="w-full md:w-1/2 space-y-10 order-2 md:order-1">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold">The Heritage</p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium leading-tight tracking-tight">
                  Born in the heart <br/> of Tuscany.
                </h2>
              </div>
              <p className="text-text-secondary text-lg leading-relaxed font-sans max-w-xl">
                Founded in 1984, IkarisShoes™ was born from a singular vision: to bridge the gap between traditional Italian craftsmanship and modern aesthetic expression. Each pair is a testament to the artisans who have spent decades perfecting their craft in our Florence workshop.
              </p>
              <div className="pt-4">
                <button className="px-10 py-5 bg-text-primary text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-colors duration-300">
                  Our Complete History
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative order-1 md:order-2">
              <div className="aspect-[4/5] relative z-10 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1200&auto=format&fit=crop" 
                  alt="Artisan at work" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-12 -right-12 w-full h-full border border-accent opacity-20 -z-0 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 border-t border-border">
        <div className="container-custom text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-display font-medium">Join the IkarisShoes™ Collective</h2>
            <p className="text-text-secondary">Be the first to receive exclusive insights into our upcoming archives, craftsmanship stories, and limited availability releases.</p>
            <form className="flex flex-col md:flex-row gap-4 pt-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="flex-grow bg-secondary-bg border-none px-6 py-4 text-[10px] tracking-widest font-bold focus:ring-1 focus:ring-accent outline-none"
              />
              <button className="bg-text-primary text-white px-8 py-4 text-[10px] tracking-widest font-bold hover:bg-accent transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

