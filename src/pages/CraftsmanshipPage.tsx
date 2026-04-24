
import { Hammer, Waves, Sun, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    title: 'Aniline Selection',
    description: 'We source only the top 3% of Tuscan hides. Each piece is inspected under specialized light for grain consistency and natural character.',
    icon: Sun,
    image: '/images/craftsmanship/aniline.png'
  },
  {
    title: 'Hand-Lasting',
    description: 'Our master cobblers shape each upper over a custom wooden last for 48 hours to ensure a perfect, anatomical fit that evolves with you.',
    icon: Hammer,
    image: '/images/craftsmanship/lasting.png'
  },
  {
    title: 'Burnishing',
    description: 'A multi-step hand-finishing process using natural waxes creates a deep, multidimensional patina unique to every pair.',
    icon: Waves,
    image: '/images/craftsmanship/burnishing.png'
  }
];

export default function CraftsmanshipPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.from('.craft-hero-bg', { scale: 1.2, opacity: 0, duration: 2 })
      .from('.craft-hero-text span', { y: 20, opacity: 0 }, "-=1.5")
      .from('.craft-hero-text h1', { y: 40, opacity: 0 }, "-=1.2")
      .from('.craft-hero-text p', { y: 30, opacity: 0 }, "-=1")
      .from('.craft-hero-line', { height: 0, opacity: 0 }, "-=0.8");

    // Scroll Animations
    gsap.from('.nomad-text', {
      scrollTrigger: {
        trigger: '.nomad-section',
        start: 'top 80%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.nomad-image', {
      scrollTrigger: {
        trigger: '.nomad-section',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.out'
    });

    // Process Stages
    const stages = gsap.utils.toArray('.process-stage');
    stages.forEach((stage: any) => {
      gsap.from(stage, {
        scrollTrigger: {
          trigger: stage,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // Parallax on scroll
    gsap.to('.craft-hero-bg img', {
      scrollTrigger: {
        trigger: '.craft-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      ease: 'none'
    });

  }, { scope: containerRef });

  return (
    <div className="pt-20 bg-primary-bg overflow-hidden" ref={containerRef}>
      <SEO 
        title="The Artisan Process: Handcrafting Luxury in Florence"
        description="Discover the 180-step process behind every pair of IkarisShoes™. From Tuscan calfskin selection to hand-burnishing by master artisans in our Florence atelier."
        canonical="https://ikaris-shoes.vercel.app/craftsmanship"
      />
      {/* Hero Section */}
      <section className="craft-hero relative py-24 md:py-32 overflow-hidden bg-[#121212] text-white">
        <div className="craft-hero-bg absolute inset-0 opacity-40">
          <img 
            src="/images/craftsmanship/hero.png" 
            alt="Leather detail" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        
        <div className="container-custom relative z-10">
          <div className="craft-hero-text max-w-3xl">
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-mono mb-6 block">The Atelier Heritage</span>
            <h1 className="text-5xl md:text-7xl font-display font-medium leading-[0.9] mb-8 tracking-tighter">
              OBSESSIVE <br />
              <span className="italic">DETAIL.</span>
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed mb-12">
              In a world of mass production, we choose the deliberate path. Our workshop in Florence remains a sanctuary for the forgotten arts of shoemaking.
            </p>
            <div className="craft-hero-line w-px h-24 bg-accent/50" />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="nomad-section py-24 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="nomad-text space-y-8">
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
            </div>
            
            <div className="nomad-image relative aspect-[4/5] bg-secondary-bg overflow-hidden rounded-[2px]">
              <img 
                src="/images/craftsmanship/nomad.png" 
                alt="Shoe detailed stitching" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
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
              <div key={index} className={`process-stage flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}>
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                    <div className="absolute top-0 left-0 w-full h-full bg-accent/5 mix-blend-overlay" />
                  </div>
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
