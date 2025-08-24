export type Roast = "Light" | "Medium" | "Medium-Dark" | "Dark";
export type Category = "Premium" | "Signature" | "Classic";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  catImage: string;
  description: string;
  rating: number;
  category: Category;
  roast: Roast;
  origin: string;
  isNew: boolean;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}
