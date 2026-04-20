export interface ProductColor {
  name: string;
  hex: string;
  images: {
    main: string;
    hover: string;
    gallery: string[];
  };
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  tagline: string;
  price: number;
  compareAtPrice: number | null;
  colors: ProductColor[];
  sizes: number[];
  category: string;
  materials: string;
  description: string;
  images: {
    main: string;
    hover: string;
    gallery: string[];
  };
  featured: boolean;
  rating: number;
  reviewCount: number;
  newRelease?: boolean;
  archivePricing?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export const mockCollections: Collection[] = [
  {
    id: "derby-oxfords",
    name: "Derby & Oxfords",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80",
    productCount: 12
  },
  {
    id: "loafers",
    name: "Loafers",
    image: "https://images.unsplash.com/photo-1621315213173-1d2a13bc8160?auto=format&fit=crop&q=80",
    productCount: 8
  },
  {
    id: "boots",
    name: "Boots",
    image: "https://images.unsplash.com/photo-1620612284347-190b39678393?auto=format&fit=crop&q=80",
    productCount: 15
  }
];

export const mockProducts: Product[] = [
  {
    id: "derby-001",
    brand: "IkarisShoes™",
    name: "Milano Whole-Cut Derby",
    tagline: "Handcrafted in Florence",
    price: 850,
    compareAtPrice: null,
    colors: [
      { 
        name: "Black", 
        hex: "#111111", 
        images: {
          main: "https://images.unsplash.com/photo-1614252209825-9fa501cb6c04?auto=format&fit=crop&q=80",
          hover: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80",
          gallery: []
        }
      },
      { 
        name: "Cognac", 
        hex: "#8B4513", 
        images: {
          main: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80",
          hover: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80",
          gallery: []
        } 
      }
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
    category: "Derby",
    materials: "Italian calfskin leather, Goodyear welted construction",
    description: "A timeless silhouette refined through generations. Hand-cut from a single piece of premium calfskin, offering unparalleled elegance and durability.",
    images: {
      main: "https://images.unsplash.com/photo-1614252209825-9fa501cb6c04?auto=format&fit=crop&q=80",
      hover: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1614252209825-9fa501cb6c04?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80"
      ]
    },
    featured: true,
    rating: 4.8,
    reviewCount: 24,
    newRelease: true
  },
  {
    id: "loafer-001",
    brand: "IkarisShoes™",
    name: "Sorrento Penny Loafer",
    tagline: "Unstructured Comfort",
    price: 650,
    compareAtPrice: 850,
    colors: [
      { 
        name: "Suede Tan", 
        hex: "#C19A6B", 
        images: {
          main: "https://images.unsplash.com/photo-1621315213173-1d2a13bc8160?auto=format&fit=crop&q=80",
          hover: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80",
          gallery: []
        } 
      }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    category: "Loafer",
    materials: "Repello suede, unlined interior, leather sole",
    description: "The quintessential warm-weather shoe. Unlined for immediate comfort without the break-in period.",
    images: {
      main: "https://images.unsplash.com/photo-1621315213173-1d2a13bc8160?auto=format&fit=crop&q=80",
      hover: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80",
      gallery: []
    },
    featured: true,
    rating: 4.9,
    reviewCount: 42,
    archivePricing: true
  },
  {
    id: "boot-001",
    brand: "IkarisShoes™",
    name: "Alps Chelsea Boot",
    tagline: "All-weather Craftsmanship",
    price: 950,
    compareAtPrice: null,
    colors: [
      { 
        name: "Black Suede", 
        hex: "#222222", 
        images: {
          main: "https://images.unsplash.com/photo-1620612284347-190b39678393?auto=format&fit=crop&q=80",
          hover: "https://images.unsplash.com/photo-1620152865506-699ee9b9da48?auto=format&fit=crop&q=80",
          gallery: []
        } 
      }
    ],
    sizes: [8, 9, 10, 11],
    category: "Boot",
    materials: "Water-resistant suede, Dainite rubber sole",
    description: "Built for versatility. The Alps boot seamlessly transitions from city streets to countryside escapes.",
    images: {
      main: "https://images.unsplash.com/photo-1620612284347-190b39678393?auto=format&fit=crop&q=80",
      hover: "https://images.unsplash.com/photo-1620152865506-699ee9b9da48?auto=format&fit=crop&q=80",
      gallery: []
    },
    featured: true,
    rating: 5.0,
    reviewCount: 18
  },
  {
    id: "oxford-002",
    brand: "IkarisShoes™",
    name: "Venezia Cap-Toe",
    tagline: "The Diplomat's Choice",
    price: 790,
    compareAtPrice: null,
    colors: [
      { 
        name: "Burgundy", 
        hex: "#4A0404", 
        images: {
          main: "https://images.unsplash.com/photo-1638908724353-832ae9902868?auto=format&fit=crop&q=80",
          hover: "https://images.unsplash.com/photo-1614252339475-533eba8cb34e?auto=format&fit=crop&q=80",
          gallery: []
        } 
      }
    ],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5],
    category: "Oxford",
    materials: "Museum calf leather, Oak bark tanned sole",
    description: "Our most formal offering. Hand-patinated leather gives each pair a completely unique finish.",
    images: {
      main: "https://images.unsplash.com/photo-1638908724353-832ae9902868?auto=format&fit=crop&q=80",
      hover: "https://images.unsplash.com/photo-1614252339475-533eba8cb34e?auto=format&fit=crop&q=80",
      gallery: []
    },
    featured: true,
    rating: 4.7,
    reviewCount: 31
  }
];

export interface Story {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
}

export const mockStories: Story[] = [
  {
    id: "story-001",
    title: "The Art of the Last: A Study in Form",
    category: "Craftsmanship",
    date: "October 12, 2023",
    excerpt: "Exploring the traditional wooden forms that define the silhouette of every IkarisShoes™ shoe.",
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1200&auto=format&fit=crop",
    author: "Luca Moretti",
    readTime: "8 min"
  },
  {
    id: "story-002",
    title: "From Florence with Love: Autumn in Tuscany",
    category: "Lifestyle",
    date: "September 28, 2023",
    excerpt: "A visual journey through the streets of Florence, where our legacy began and continues today.",
    image: "https://images.unsplash.com/photo-1518118014470-877298647ba3?q=80&w=1200&auto=format&fit=crop",
    author: "Elena Rossi",
    readTime: "5 min"
  },
  {
    id: "story-003",
    title: "The Museum Calf: Nature's Unique Grain",
    category: "Materials",
    date: "August 15, 2023",
    excerpt: "Understanding the intricate tanning process that creates the marbled effect of museum calf leather.",
    image: "https://images.unsplash.com/photo-1531303435785-3853ba035cda?q=80&w=1200&auto=format&fit=crop",
    author: "Marco Valli",
    readTime: "6 min"
  }
];

