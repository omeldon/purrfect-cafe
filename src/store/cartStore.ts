import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartState {
  cart: CartItem[];
  wishlist: number[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  clearWishlist: () => void;
  getCartItem: (id: number) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);
          
          if (existingItem) {
            // Check stock limit
            if (existingItem.quantity >= product.stock) {
              return state; // Don't add if would exceed stock
            }
            
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          // Add new item if stock available
          if (product.stock > 0) {
            return { 
              cart: [...state.cart, { ...product, quantity: 1 }] 
            };
          }
          
          return state;
        });
      },

      removeFromCart: (id) => {
        set((state) => ({ 
          cart: state.cart.filter((item) => item.id !== id) 
        }));
      },

      updateQuantity: (id, qty) => {
        if (qty < 0) return;
        
        set((state) => {
          if (qty === 0) {
            return { 
              cart: state.cart.filter((item) => item.id !== id) 
            };
          }
          
          return {
            cart: state.cart.map((item) => {
              if (item.id === id) {
                // Don't exceed stock limit
                const newQuantity = Math.min(qty, item.stock);
                return { ...item, quantity: newQuantity };
              }
              return item;
            }),
          };
        });
      },

      toggleWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((itemId) => itemId !== id)
            : [...state.wishlist, id],
        }));
      },

      isInWishlist: (id) => get().wishlist.includes(id),

      getTotalPrice: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      clearCart: () => set({ cart: [] }),

      clearWishlist: () => set({ wishlist: [] }),

      getCartItem: (id) => {
        return get().cart.find((item) => item.id === id);
      },
    }),
    {
      name: "purrfect-brew-storage", // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      // Only persist cart and wishlist, not functions
      partialize: (state) => ({ 
        cart: state.cart, 
        wishlist: state.wishlist 
      }),
    }
  )
);