import { Product } from "@/types";

const catImg = (seed: string, size = 96) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=f3e8ff,fef3c7,fce7f3&size=${size}`;

export const coffeeProducts: Product[] = [
  {
    id: 1,
    name: "Persian Purrfection",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop",
    catImage: catImg("persian"),
    description:
      "Luxurious single-origin Ethiopian beans with hints of catnip and cream.",
    rating: 4.9,
    category: "Premium",
    roast: "Light",
    origin: "Ethiopia",
    isNew: true,
    stock: 12,
  },
  {
    id: 2,
    name: "Maine Coon Mocha",
    price: 21.99,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&auto=format&fit=crop",
    catImage: catImg("mainecoon"),
    description:
      "Bold and fluffy blend with chocolate undertones, like a big cozy hug.",
    rating: 4.7,
    category: "Signature",
    roast: "Dark",
    origin: "Guatemala",
    isNew: false,
    stock: 8,
  },
  {
    id: 3,
    name: "Siamese Supreme",
    price: 26.99,
    image:
      "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=900&auto=format&fit=crop",
    catImage: catImg("siamese"),
    description:
      "Elegant and refined with complex flavors that purr in harmony.",
    rating: 4.8,
    category: "Premium",
    roast: "Medium",
    origin: "Thailand",
    isNew: true,
    stock: 15,
  },
  {
    id: 4,
    name: "Tabby's Treat",
    price: 18.99,
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&auto=format&fit=crop",
    catImage: catImg("tabby"),
    description:
      "Playful everyday blend. Perfect for morning zoomies and cuddles.",
    rating: 4.6,
    category: "Classic",
    roast: "Medium",
    origin: "Colombia",
    isNew: false,
    stock: 22,
  },
  {
    id: 5,
    name: "Ragdoll Roast",
    price: 23.99,
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&auto=format&fit=crop",
    catImage: catImg("ragdoll"),
    description: "Smooth and mellow with a velvety finish.",
    rating: 4.5,
    category: "Signature",
    roast: "Light",
    origin: "Costa Rica",
    isNew: false,
    stock: 18,
  },
  {
  id: 6,
  name: "British Shorthair Blend",
  price: 22.99,
  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&auto=format&fit=crop",
  catImage: catImg("british"),
  description: "Dependable classic with a dignified character.",
  rating: 4.8,
  category: "Classic",
  roast: "Medium-Dark",
  origin: "Kenya",
  isNew: false,
  stock: 10,
},
];
