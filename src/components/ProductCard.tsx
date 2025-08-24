"use client";
import { Heart, ShoppingCart, Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  onAddToCart: (p: Product) => void;
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const ProductCard: React.FC<Props> = ({
  product,
  onAddToCart,
  toggleWishlist,
  isInWishlist,
}) => {
  const isWishlisted = isInWishlist(product.id);
  const isLowStock = product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: "🛒",
    });
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id);
    toast.success(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist!",
      {
        icon: isWishlisted ? "💔" : "❤️",
      }
    );
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-[#e7f1ff] hover:shadow-lg hover:border-[#d0e3ff] transition-all duration-200"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          loading="lazy"
        />

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-[#334eac] px-4 py-2 rounded-full font-semibold text-sm">
              Out of Stock
            </span>
          </div>
        )}

        {/* Cat avatar */}
        <img
          src={product.catImage}
          alt="cafe cat"
          className="absolute left-3 top-3 h-10 w-10 rounded-full border-2 border-white shadow-sm"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1">
          {product.isNew && (
            <Badge className="bg-[#334eac] text-white text-xs px-2 py-1">
              NEW
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="bg-white/90 text-[#334eac] text-xs px-2 py-1"
          >
            {product.category}
          </Badge>
        </div>

        {/* Wishlist button - Always visible on mobile, hover on desktop */}
        <Button
          size="sm"
          variant="secondary"
          onClick={handleWishlistToggle}
          className={`absolute bottom-3 right-3 h-9 w-9 p-0 rounded-full bg-white/90 hover:bg-white transition-all md:opacity-0 md:group-hover:opacity-100 ${
            isWishlisted ? "text-red-500" : "text-[#7096d1]"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} 
          />
        </Button>

        {/* Rating badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="font-semibold text-[#334eac]">{product.rating}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Title and description */}
        <div>
          <h3 className="text-lg font-semibold text-[#081f5c] group-hover:text-[#334eac] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#7096d1] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Product details */}
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 rounded-full bg-[#e7f1ff] px-2 py-1 text-[#334eac] font-medium">
            {product.roast} Roast
          </span>
          <span className="flex items-center gap-1 text-[#7096d1]">
            <MapPin className="h-3 w-3" />
            {product.origin}
          </span>
          <span className={`font-medium ${
            isOutOfStock 
              ? "text-red-500" 
              : isLowStock 
                ? "text-orange-500" 
                : "text-green-600"
          }`}>
            {isOutOfStock ? "Out of stock" : `${product.stock} left`}
          </span>
        </div>

        {/* Price and add to cart */}
        <div className="flex items-center justify-between pt-2 border-t border-[#e7f1ff]">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#334eac]">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-[#7096d1]">per bag</span>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`rounded-full font-medium transition-all ${
              isOutOfStock
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#334eac] hover:bg-[#081f5c] text-white shadow-sm hover:shadow-md"
            }`}
            size="sm"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </Button>
        </div>

        {/* Low stock warning */}
        {isLowStock && !isOutOfStock && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-2 bg-orange-50 border border-orange-200 rounded-lg"
          >
            <span className="text-xs text-orange-600 font-medium">
              ⚠️ Only {product.stock} left in stock!
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;