"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCartStore();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    toast.success("Processing checkout... 🐾", {
      icon: "💳",
    });
    
    // Simulate checkout process
    setTimeout(() => {
      toast.success("Order confirmed! Your coffee is brewing! ☕");
    }, 1500);
  };

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 0) return;
    updateQuantity(id, newQty);
    
    if (newQty === 0) {
      toast.success("Item removed from cart");
    }
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Cart Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l border-[#d0e3ff]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d0e3ff] p-4 bg-[#f9fcff]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-[#334eac]" />
                <h3 className="text-xl font-bold text-[#081f5c]">
                  Your Cart
                  {totalItems > 0 && (
                    <span className="ml-2 text-sm font-normal text-[#7096d1]">
                      ({totalItems} item{totalItems !== 1 ? 's' : ''})
                    </span>
                  )}
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="hover:bg-[#e7f1ff] rounded-full"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-[#7096d1]" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <motion.div 
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-6xl mb-4 opacity-50">🛒</div>
                  <h4 className="text-lg font-semibold text-[#334eac] mb-2">Your cart is empty</h4>
                  <p className="text-[#7096d1] mb-6">Add some delicious coffee to get started!</p>
                  <Button 
                    onClick={onClose}
                    className="bg-[#334eac] hover:bg-[#081f5c] text-white"
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="flex gap-4 rounded-2xl border border-[#d0e3ff] p-4 bg-white hover:shadow-sm transition-shadow"
                      >
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-16 w-16 rounded-xl object-cover"
                            loading="lazy"
                          />
                          <img
                            src={item.catImage}
                            alt="cat"
                            className="absolute -top-2 -right-2 h-8 w-8 rounded-full border-2 border-white shadow-sm"
                            loading="lazy"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#081f5c] truncate">{item.name}</h4>
                          <p className="text-sm text-[#7096d1] mb-3">${item.price.toFixed(2)} each</p>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 border-[#d0e3ff] hover:bg-[#e7f1ff] hover:border-[#7096d1]"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              
                              <span className="w-8 text-center font-medium text-[#334eac]">
                                {item.quantity}
                              </span>
                              
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 border-[#d0e3ff] hover:bg-[#e7f1ff] hover:border-[#7096d1]"
                                disabled={item.quantity >= item.stock}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Remove Button */}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-semibold text-[#334eac]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Free Shipping Banner */}
                  {subtotal > 0 && subtotal < 50 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 rounded-xl bg-[#e7f1ff] border border-[#7096d1]/30 text-center"
                    >
                      <p className="text-sm text-[#334eac]">
                        Add <span className="font-semibold">${(50 - subtotal).toFixed(2)}</span> more for free shipping! 🚚
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Footer with totals and checkout */}
            {cart.length > 0 && (
              <div className="border-t border-[#d0e3ff] p-4 bg-[#f9fcff]">
                {/* Totals */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between text-[#7096d1]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#7096d1]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold text-[#081f5c] border-t border-[#d0e3ff] pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="flex-1 border-[#7096d1] text-[#7096d1] hover:bg-[#7096d1] hover:text-white"
                    disabled={cart.length === 0}
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    className="flex-2 bg-[#334eac] hover:bg-[#081f5c] text-white shadow-sm"
                    disabled={cart.length === 0}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                </div>

                {/* Security Badge */}
                <p className="text-xs text-[#7096d1] text-center mt-3 flex items-center justify-center gap-1">
                  🔒 Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;