"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  catAdopted?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Johnson",
    location: "Downtown Resident",
    rating: 5,
    text: "Best coffee in the city! The atmosphere is so relaxing, and the cats are absolutely adorable. I adopted Whiskers here 6 months ago - he's the perfect addition to our family!",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&crop=faces&fit=crop&w=100&h=100",
    catAdopted: "Whiskers"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Coffee Enthusiast",
    rating: 5,
    text: "As a coffee connoisseur, I can say their single-origin beans are exceptional. The Persian Purrfection blend is my go-to. Plus, spending time with the cats after a stressful day is therapeutic.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Sarah Williams",
    location: "Regular Customer",
    rating: 5,
    text: "I work remotely and this has become my second office. The WiFi is great, the coffee keeps me energized, and the cats provide the perfect study breaks. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Cat Dad",
    rating: 5,
    text: "Found my best friend Luna here! The staff really cares about matching the right cat with the right family. The adoption process was smooth and supportive. Great coffee too!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    catAdopted: "Luna"
  },
  {
    id: 5,
    name: "Lisa Martinez",
    location: "Animal Lover",
    rating: 5,
    text: "Love supporting a business that gives back to the community. Every purchase helps rescue cats, and you can feel the love and care they put into everything they do.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Alex Rivera",
    location: "Student",
    rating: 5,
    text: "Perfect study spot! The cats are well-behaved and don't disturb you when you're working, but they're always there for a quick pet when you need a break. And the iced lattes are amazing!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-[#e7f1ff] to-[#d0e3ff]">
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
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-[#334eac]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Don&apos;t just take our word for it - hear from our amazing community of coffee lovers and cat adopters!
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#d0e3ff] hover:shadow-lg transition-all duration-300 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-2 -left-2 bg-[#334eac] rounded-full p-2">
                <Quote className="h-4 w-4 text-white" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#7096d1] leading-relaxed mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Adoption Badge */}
              {testimonial.catAdopted && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                    🏠 Adopted {testimonial.catAdopted}
                  </span>
                </div>
              )}

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#e7f1ff]"
                />
                <div>
                  <h4 className="font-semibold text-[#081f5c]">{testimonial.name}</h4>
                  <p className="text-sm text-[#7096d1]">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 border border-[#d0e3ff] inline-block">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-[#334eac]">4.9/5</span>
            </div>
            <p className="text-[#7096d1] mb-4">
              Based on 500+ reviews from our amazing customers
            </p>
            <div className="text-sm text-[#7096d1]">
              ⭐ Google Reviews • Yelp • TripAdvisor
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;