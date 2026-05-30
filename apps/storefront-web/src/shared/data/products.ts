// Product data used across Essentialized, Hero, Science sections

export interface ClothingItem {
  name: string;
  image: string;
  color: string;
}

export interface HeroClothing {
  src: string;
  width: number;
  height: number;
}

export interface DiscoverProduct {
  id: string;
  name: string;
  sizes: string;
  price: number;
  rating: number;
  image: string;
  blurred?: boolean;
}

export const TEES: ClothingItem[] = [
  { name: "White Boxy Tee", image: "/images/tees1.png", color: "#e8e8e8" },
  { name: "Earth Brown", image: "/images/tees2.png", color: "#6b4423" },
  { name: "Sage Boxy Tee", image: "/images/tees3.png", color: "#8da38a" },
  { name: "Vintage Grey", image: "/images/tees4.png", color: "#7a7a7a" },
  { name: "Charcoal Boxy", image: "/images/tees5.png", color: "#333333" },
  { name: "Cream Heavy", image: "/images/tees6.png", color: "#f5f5dc" },
  { name: "Olive Boxy", image: "/images/tees7.png", color: "#556b2f" },
];

export const JEANS: ClothingItem[] = [
  { name: "Blue Baggy", image: "/images/jeans1.png", color: "#2b4c7e" },
  { name: "Washed Black", image: "/images/jeans2.png", color: "#1a1a1a" },
  { name: "Light Wash", image: "/images/jeans3.png", color: "#5b84b1" },
  { name: "Deep Indigo", image: "/images/jeans4.png", color: "#16213e" },
  { name: "Faded Black", image: "/images/jeans5.png", color: "#2d2d2d" },
  { name: "Raw Selvedge", image: "/images/jeans6.png", color: "#0f172a" },
];

export const HERO_CLOTHING: HeroClothing[] = [
  { src: "tees1.png", width: 120, height: 120 },
  { src: "jeans1.png", width: 100, height: 140 },
  { src: "tees3.png", width: 110, height: 110 },
  { src: "jeans2.png", width: 110, height: 130 },
  { src: "tees6.png", width: 90, height: 90 },
  { src: "tees4.png", width: 130, height: 130 },
  { src: "jeans6.png", width: 100, height: 140 },
  { src: "tees5.png", width: 110, height: 110 },
];

export const DISCOVER_PRODUCTS: DiscoverProduct[] = [
  { id: "1", name: "Sage Green Boxy Tee", sizes: "S - XXL", price: 250, rating: 5, image: "tees3.png" },
  { id: "2", name: "Charcoal Boxy Tee", sizes: "S - XXL", price: 350, rating: 4, image: "tees5.png" },
  { id: "3", name: "White Boxy Tee", sizes: "S - XXL", price: 250, rating: 5, image: "tees1.png", blurred: true },
];

export const CAROUSEL_IMAGES = [
  "/images/tees1.png",
  "/images/jeans1.png",
  "/images/tees3.png",
  "/images/jeans2.png",
  "/images/tees6.png",
  "/images/jeans6.png",
  "/images/tees4.png",
  "/images/tees5.png",
];
