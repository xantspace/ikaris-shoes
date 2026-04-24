import { motion } from 'framer-motion';
import { Hammer, Waves, Sun, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const processes = [
  {
    title: 'Aniline Selection',
    description: 'We source only the top 3% of Tuscan hides. Each piece is inspected under specialized light for grain consistency and natural character.',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1524292332407-264ad97aed9a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Hand-Lasting',
    description: 'Our master cobblers shape each upper over a custom wooden last for 48 hours to ensure a perfect, anatomical fit that evolves with you.',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1549468057-5b6fbca58999?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Burnishing',
    description: 'A multi-step hand-finishing process using natural waxes creates a deep, multidimensional patina unique to every pair.',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop'
  }
];

export default function CraftsmanshipPage() {
  return (
    <div className="pt-20 bg-primary-bg overflow-hidden">
      <SEO 
        title="The Artisan Process: Handcrafting Luxury in Florence"
        description="Discover the 180-step process behind every pair of IkarisShoes™. From Tuscan calfskin selection to hand-burnishing by master artisans in our Florence atelier."
        canonical="https://ikaris-shoes.vercel.app/craftsmanship"
      />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#121212] text-white">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?q=80&w=2000&auto=format&fit=crop" 
            alt="Leather detail" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-mono mb-6 block">The Atelier Heritage</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium leading-[0.9] mb-8 tracking-tighter">
              OBSESSIVE <br />
              <span className="italic">DETAIL.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed mb-12">
              In a world of mass production, we choose the deliberate path. Our workshop in Florence remains a sanctuary for the forgotten arts of shoemaking.
            </p>
            <div className="w-px h-24 bg-accent/50" />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-display font-medium">Built for the <br />modern nomad.</h2>
              <div className="space-y-6 text-text-secondary leading-relaxed text-lg">
                <p>
                  Every Ikaris shoe is a dialogue between technical innovation and centuries-old tradition. We believe that footwear should be an extension of the self—a resilient companion for the journey ahead.
                </p>
                <p>
                  We don't just build shoes; we engineer movement. From the reinforced arch support to the breathable linings, every design choice is made with endurance in mind.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-2">
                  <h4 className="text-3xl font-display">120+</h4>
                  <p className="text-xs uppercase tracking-widest text-text-secondary font-mono">Manual Operations</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-display">48h</h4>
                  <p className="text-xs uppercase tracking-widest text-text-secondary font-mono">Resting Period</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] bg-secondary-bg overflow-hidden rounded-[2px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop" 
                alt="Shoe detailed stitching" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Process - Horizontal Alternating */}
      <section className="py-24 bg-secondary-bg">
        <div className="container-custom">
          <div className="mb-20 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-text-secondary font-mono mb-4 block">The Stages</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium">The Making of a Legacy</h2>
          </div>
          
          <div className="space-y-32 md:space-y-48">
            {processes.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                <div className="w-full md:w-1/2">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[16/9] overflow-hidden"
                  >
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-accent/5 mix-blend-overlay" />
                  </motion.div>
                </div>
                <div className="w-full md:w-5/12 space-y-6">
                  <step.icon className="w-8 h-8 text-accent" strokeWidth={1} />
                  <span className="text-accent font-mono text-sm tracking-widest">Stage {index + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-display font-medium">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-24 md:py-40">
        <div className="container-custom">
          <div className="bg-[#121212] text-white p-12 md:p-24 rounded-[2px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 transform translate-x-1/2" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-medium mb-8 leading-tight">The Ikaris <br />Guarantee.</h2>
                <p className="text-lg opacity-70 mb-12 max-w-md">
                  We stand by the longevity of our creations. Every pair includes our lifetime stitch repair service and a certificate of Tuscan authenticity.
                </p>
                <Link to="/shop" className="btn-accent text-sm uppercase tracking-widest px-8">
                  View the Collection
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 border border-white/10 hover:border-accent/40 transition-colors">
                  <ShieldCheck className="w-6 h-6 mb-4 text-accent" />
                  <h4 className="font-display text-xl mb-2">Lifetime Repair</h4>
                  <p className="text-sm opacity-50">Complimentary stitching repairs at any of our global ateliers.</p>
                </div>
                <div className="p-8 border border-white/10 hover:border-accent/40 transition-colors">
                  <Sun className="w-6 h-6 mb-4 text-accent" />
                  <h4 className="font-display text-xl mb-2">Authentic Hide</h4>
                  <p className="text-sm opacity-50">100% full-grain leather ethically sourced from Tuscany.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 border-t border-border">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl mb-12 font-display">Experience the atelier.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/stories" className="btn-secondary px-12">Our Stories</Link>
            <Link to="/shop" className="btn-primary px-12">Visit Shop</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
