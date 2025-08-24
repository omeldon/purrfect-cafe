"use client";
import { motion } from "framer-motion";
import { Heart, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Cat {
  id: number;
  name: string;
  age: string;
  breed: string;
  personality: string;
  image: string;
  favoriteSpot: string;
  adopted: boolean;
  description: string;
  color: string;
}

const cats: Cat[] = [
  {
    id: 1,
    name: "Espresso",
    age: "2 years",
    breed: "Maine Coon",
    personality: "Playful & Social",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
    favoriteSpot: "By the window",
    adopted: false,
    description: "Espresso loves greeting customers and playing with feather toys. He's always ready for cuddles!",
    color: "Brown & White"
  },
  {
    id: 2,
    name: "Mocha",
    age: "4 years",
    breed: "Persian",
    personality: "Calm & Gentle",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop",
    favoriteSpot: "Reading corner",
    adopted: false,
    description: "Mocha is the perfect lap cat. She loves quiet moments and gentle pets while you sip your coffee.",
    color: "Cream & Gray"
  },
  {
    id: 3,
    name: "Latte",
    age: "1 year",
    breed: "Siamese",
    personality: "Curious & Talkative",
    image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop",
    favoriteSpot: "Counter area",
    adopted: true,
    description: "Latte was recently adopted! She found her forever home with one of our regular customers.",
    color: "Cream & Dark Points"
  },
  {
    id: 4,
    name: "Cappuccino",
    age: "3 years",
    breed: "British Shorthair",
    personality: "Independent & Sweet",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop",
    favoriteSpot: "Bookshelf",
    adopted: false,
    description: "Cap loves observing the café from high perches. He's selective with affection but very rewarding!",
    color: "Gray & Blue"
  },
  {
    id: 5,
    name: "Macchiato",
    age: "6 months",
    breed: "Tabby Mix",
    personality: "Energetic & Playful",
    image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400&h=400&fit=crop",
    favoriteSpot: "Play area",
    adopted: false,
    description: "Our youngest resident! Mac is full of energy and loves interactive toys and climbing trees.",
    color: "Orange & White"
  },
  {
    id: 6,
    name: "Americano",
    age: "5 years",
    breed: "Tuxedo",
    personality: "Dignified & Loyal",
    image: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400&h=400&fit=crop",
    favoriteSpot: "Manager's desk",
    adopted: false,
    description: "Americano is our distinguished gentleman. He supervises daily operations with quiet confidence.",
    color: "Black & White"
  }
];

const Cats: React.FC = () => {
  return (
    <section id="cats" className="py-20 bg-gradient-to-br from-[#f9fcff] to-[#e7f1ff]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-[#081f5c] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Café Cats
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-[#334eac] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our resident felines are more than just adorable companions – they&apos;re part of our family. 
            Each cat has been rescued and is available for adoption through our partnership with local shelters.
          </motion.p>
        </div>

        {/* Cats Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-[#e7f1ff] hover:shadow-lg hover:border-[#d0e3ff] transition-all duration-300 overflow-hidden">
                {/* Cat Image */}
                <div className="relative aspect-square overflow-hidden">
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge 
                      className={cat.adopted 
                        ? "bg-green-500 text-white" 
                        : "bg-[#334eac] text-white"
                      }
                    >
                      {cat.adopted ? "Adopted! 🏠" : "Available 💙"}
                    </Badge>
                  </div>

                  {/* Heart overlay */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-2">
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                </div>

                {/* Cat Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#081f5c] group-hover:text-[#334eac] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-sm text-[#7096d1] bg-[#e7f1ff] px-3 py-1 rounded-full">
                      {cat.age}
                    </span>
                  </div>

                  <p className="text-[#7096d1] mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Cat Details */}
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#334eac]" />
                      <span className="text-[#334eac] font-medium">Breed:</span>
                      <span className="text-[#7096d1]">{cat.breed}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-[#334eac]" />
                      <span className="text-[#334eac] font-medium">Personality:</span>
                      <span className="text-[#7096d1]">{cat.personality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#334eac]" />
                      <span className="text-[#334eac] font-medium">Favorite Spot:</span>
                      <span className="text-[#7096d1]">{cat.favoriteSpot}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full rounded-full font-medium transition-all ${
                      cat.adopted
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-[#334eac] hover:bg-[#081f5c] text-white"
                    }`}
                    disabled={cat.adopted}
                  >
                    {cat.adopted ? "Already Adopted 🏠" : "Learn About Adoption 💙"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Adoption Info */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 border border-[#d0e3ff] text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-[#081f5c] mb-4">
            Interested in Adoption?
          </h3>
          <p className="text-[#7096d1] mb-6 max-w-2xl mx-auto">
            All our cats are spayed/neutered, vaccinated, and health-checked. We partner with 
            local shelters to find loving homes. Adoption fees help support more rescues!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[#334eac] hover:bg-[#081f5c] text-white"
            >
              Adoption Information
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#334eac] text-[#334eac] hover:bg-[#334eac] hover:text-white"
            >
              Schedule a Visit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cats;