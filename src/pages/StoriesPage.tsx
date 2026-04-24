import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockStories } from '../data/mockData';
import SEO from '../components/SEO';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All Stories', 'Craftsmanship', 'Lifestyle', 'Materials', 'Inspiration'];

export default function StoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Stories');
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredStories = selectedCategory === 'All Stories' 
    ? mockStories 
    : mockStories.filter(story => story.category === selectedCategory);

  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.from('.stories-hero-img', { scale: 1.1, opacity: 0, duration: 1.5 })
      .from('.stories-hero-text p', { y: 20, opacity: 0 }, "-=1")
      .from('.stories-hero-text h1', { y: 30, opacity: 0 }, "-=0.8")
      .from('.stories-hero-line', { scaleX: 0, opacity: 0 }, "-=0.6");

    gsap.fromTo('.category-btn', 
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
        delay: 1,
        ease: 'power2.out',
        clearProps: 'all'
      }
    );

    // Quote section fade in
    gsap.fromTo('.quote-container',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.quote-container',
          start: 'top 80%',
        }
      }
    );

    // Parallax Legacy Image
    gsap.from('.legacy-img', {
      scrollTrigger: {
        trigger: '.legacy-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 15,
      ease: 'none'
    });

  }, { scope: containerRef });

  // Handle filter changes — scoped to containerRef to prevent global DOM conflicts
  useGSAP(() => {
    if (filteredStories.length > 0) {
      gsap.fromTo('.story-article', 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out', clearProps: 'all' }
      );
    }

    // Animate underline to active category
    const activeBtn = containerRef.current?.querySelector(`.category-btn[data-active="true"]`) as HTMLElement | null;
    const underline = containerRef.current?.querySelector('.category-underline') as HTMLElement | null;
    if (activeBtn && underline) {
      gsap.to(underline, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.5,
        ease: 'elastic.out(1, 0.75)'
      });
    }
  }, { dependencies: [selectedCategory], scope: containerRef });

  // Story grid scroll animations — reinitialise when filter changes
  useEffect(() => {
    const articles = containerRef.current?.querySelectorAll('.story-article');
    if (!articles || articles.length === 0) return;

    gsap.fromTo(articles,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  }, [filteredStories]);

  return (
    <div className="pt-24 min-h-screen bg-primary-bg font-sans" ref={containerRef}>
      <SEO 
        title="Journal: Italian Luxury & Footwear Heritage"
        description="A visual journey through the streets of Florence and the halls of our atelier. Explore stories of craftsmanship, lifestyle, and the modern nomad."
        canonical="https://ikaris-shoes.vercel.app/stories"
      />
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden flex items-center justify-center">
        <div className="stories-hero-img absolute inset-0">
          <img 
            src="/images/craftsmanship/lasting.png" 
            alt="IkarisShoes™ Craft" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>
        <div className="stories-hero-text relative text-center text-white px-6">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-accent font-semibold">
            EDITORIAL
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">
            The Atelier Stories
          </h1>
          <div className="stories-hero-line w-24 h-px bg-accent mx-auto" />
        </div>
      </section>

      {/* Filter Bar */}
      <div className="border-b border-border sticky top-[72px] z-40 bg-primary-bg/80 backdrop-blur-md transition-all duration-300">
        <div className="container-custom py-6 flex flex-wrap justify-center gap-6 md:gap-12 relative">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              data-active={selectedCategory === cat}
              className={`category-btn text-[10px] uppercase tracking-[0.2em] font-bold relative py-2 ${
                selectedCategory === cat ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="category-underline absolute bottom-6 left-0 h-0.5 bg-accent w-0" />
        </div>
      </div>

      {/* Stories Grid */}
      <section className="container-custom py-24 min-h-[600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filteredStories.map((story) => (
            <Link 
              to={`/stories/${story.id}`}
              key={story.id}
              className="story-article group cursor-pointer block"
            >
              <article>
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
              </article>
            </Link>
          ))}
        </div>
        
        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-secondary font-display text-xl uppercase tracking-widest italic">No stories found in this category.</p>
          </div>
        )}
      </section>

      {/* Featured Quote / Interstitial */}
      <section className="py-32 bg-primary-bg overflow-hidden border-t border-border">
        <div className="container-custom text-center max-w-4xl">
          <div className="quote-container space-y-8">
            <span className="text-6xl font-serif text-accent opacity-30">"</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium italic leading-tight">
              A shoe is not a piece of clothing. It's a sculpture that carries your weight and your history.
            </h2>
            <p className="text-xs uppercase tracking-widest font-semibold text-text-secondary">— The Atelier Philosophy</p>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="legacy-section bg-secondary-bg py-32 overflow-hidden border-t border-border">
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
                  className="legacy-img w-full h-full object-cover"
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

