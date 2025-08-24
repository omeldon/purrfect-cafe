"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { coffeeProducts } from "@/components/data/coffeeProducts";
import ProductCard from "./ProductCard";
import { useCartStore } from "@/store/cartStore";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortKey = "name" | "price-low" | "price-high" | "rating";
type Category = "All" | "Premium" | "Signature" | "Classic";

const Menu: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortKey>("rating"); // Default to highest rated
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = coffeeProducts;

    if (category !== "All") {
      list = list.filter((p) => p.category === category);
    }

    if (query) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
      );
    }

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return list;
  }, [query, category, sort]);

  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setSort("rating");
  };

  const hasActiveFilters = query !== "" || category !== "All" || sort !== "rating";

  return (
    <section
      id="menu"
      className="relative bg-gradient-to-br from-[#f9fcff] via-[#e7f1ff] to-[#d0e3ff] py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header - Simplified */}
        <div className="mb-12 text-center">
          <motion.h2
            className="text-4xl font-bold text-[#081f5c] md:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Coffee Menu
          </motion.h2>
          <p className="mx-auto max-w-2xl text-[#334eac] text-lg">
            Premium blends crafted fresh daily. {filtered.length} options available.
          </p>
        </div>

        {/* Search and Filters - Mobile-First Design */}
        <motion.div 
          className="mb-8 bg-white rounded-2xl shadow-sm border border-[#d0e3ff] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Search Bar - Always Visible */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7096d1] h-5 w-5" />
              <Input
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                placeholder="Search coffee, origin, flavor..."
                className="pl-10 pr-4 py-3 text-base border-[#d0e3ff] focus:border-[#334eac] focus:ring-[#334eac]/20"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7096d1] hover:text-[#334eac]"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="px-4 pb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-[#7096d1] text-white rounded-lg text-sm font-medium hover:bg-[#334eac] transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters {hasActiveFilters && `(${[category !== "All", sort !== "rating"].filter(Boolean).length})`}
            </button>
          </div>

          {/* Filters - Collapsible on Mobile */}
          <div className={`border-t border-[#d0e3ff] ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="p-4 grid gap-4 md:grid-cols-3">
              <Select
                value={category}
                onValueChange={(v: Category) => setCategory(v)}
              >
                <SelectTrigger className="border-[#d0e3ff] focus:border-[#334eac]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {["All", "Premium", "Signature", "Classic"].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "All" ? "All Categories" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sort} onValueChange={(v: SortKey) => setSort(v)}>
                <SelectTrigger className="border-[#d0e3ff] focus:border-[#334eac]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-[#334eac] border border-[#334eac] rounded-lg hover:bg-[#334eac] hover:text-white transition-colors text-sm font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <div className="mb-6 text-sm text-[#334eac]">
          {filtered.length === coffeeProducts.length 
            ? `Showing all ${filtered.length} products`
            : `Showing ${filtered.length} of ${coffeeProducts.length} products`
          }
        </div>

        {/* Product Grid - Optimized Animation */}
        {filtered.length > 0 ? (
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            layout
          >
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={p}
                  onAddToCart={addToCart}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="py-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-4 text-6xl">☕</div>
            <h3 className="text-xl font-semibold text-[#334eac] mb-2">No coffee found</h3>
            <p className="text-[#7096d1] mb-4">
              {query ? `No results for "${query}"` : "No products match your filters"}
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-[#334eac] text-white rounded-lg hover:bg-[#081f5c] transition-colors font-medium"
            >
              View All Coffee
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Menu;