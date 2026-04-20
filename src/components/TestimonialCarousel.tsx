import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "The attention to detail in the stitching is something I haven't seen in decades. Truly master-class craftsmanship.",
    author: "James Sterling",
    role: "Bespoke Tailor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Finally, a brand that understands that luxury isn't just about the price tagâ€”it's about the feeling of the leather against your skin.",
    author: "Marcello Rossi",
    role: "Fashion Consultant",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "I've worn these to Milan Fashion Week and on a 12-hour travel day. They are the only shoes I've ever owned that do both perfectly.",
    author: "Elena Vance",
    role: "Travel Journalist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "The silhouette is avant-garde yet timeless. It's rare to find a brand that can balance those two extremes so effortlessly.",
    author: "David K. Chen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    quote: "Every time I step into my IkarisShoes™ oxfords, it feels like a ritual. The scent of the leather alone is worth the investment.",
    author: "Sarah Jenkins",
    role: "Gallery Curator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  }
];

export function TestimonialCarousel() {
  return (
    <div className="w-full relative px-4 md:px-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((t, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3">
              <Card className="border-none bg-secondary-bg/50 backdrop-blur-sm hover:bg-secondary-bg transition-colors duration-500 h-full">
                <CardContent className="flex flex-col p-6 md:p-8 h-full justify-between">
                  <div>
                    <Quote className="w-6 h-6 md:w-8 md:h-8 text-accent mb-4 md:mb-6 opacity-20" />
                    <p className="text-base md:text-lg font-body leading-relaxed text-text-primary italic mb-6 md:mb-8">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <img 
                      src={t.image} 
                      alt={t.author} 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover grayscale brightness-110"
                    />
                    <div>
                      <h4 className="font-display font-medium text-xs md:text-sm tracking-wide uppercase">{t.author}</h4>
                      <p className="font-mono text-[9px] md:text-[10px] text-text-secondary uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-16 hover:bg-accent hover:text-white transition-all duration-300 border-none shadow-sm" />
        <CarouselNext className="hidden md:flex -right-16 hover:bg-accent hover:text-white transition-all duration-300 border-none shadow-sm" />
      </Carousel>
    </div>
  )
}

