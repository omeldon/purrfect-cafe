"use client";
import { motion } from "framer-motion";
import { Coffee, Heart, Users, Award, Clock, Leaf } from "lucide-react";

const About: React.FC = () => {
  const stats = [
    { icon: Coffee, label: "Cups Served", value: "50,000+", color: "text-[#334eac]" },
    { icon: Heart, label: "Cats Adopted", value: "127", color: "text-red-500" },
    { icon: Users, label: "Happy Customers", value: "2,500+", color: "text-[#7096d1]" },
    { icon: Award, label: "Years in Business", value: "8", color: "text-[#081f5c]" },
  ];

  const values = [
    {
      icon: Coffee,
      title: "Premium Quality",
      description: "We source only the finest single-origin beans, roasted fresh daily in small batches."
    },
    {
      icon: Heart,
      title: "Animal Welfare",
      description: "Every purchase helps support local animal shelters and our cat adoption program."
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Eco-friendly practices from bean to cup, with compostable packaging and fair trade sourcing."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
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
            Our Story
          </motion.h2>
          <motion.p
            className="max-w-3xl mx-auto text-lg text-[#7096d1] leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Founded in 2016, Purrfect Brew began as a simple dream: to create a space where 
            coffee lovers and cat enthusiasts could come together in perfect harmony.
          </motion.p>
        </div>

        {/* Story Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop"
              alt="Coffee shop interior"
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#081f5c]">
              Where Every Cup Tells a Story
            </h3>
            <p className="text-[#7096d1] leading-relaxed">
              What started as Sarah&apos;s weekend volunteer work at the local animal shelter 
              evolved into something magical. She noticed how coffee brought people together, 
              and how cats had an incredible ability to comfort and heal.
            </p>
            <p className="text-[#7096d1] leading-relaxed">
              Today, we&apos;re proud to be the city&apos;s first cat café, having helped over 127 cats 
              find their forever homes while serving the community&apos;s best coffee. Every cup 
              you enjoy directly supports our mission of animal welfare and community connection.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#334eac]">127</div>
                <div className="text-sm text-[#7096d1]">Cats Adopted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#334eac]">50k+</div>
                <div className="text-sm text-[#7096d1]">Cups Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#334eac]">8</div>
                <div className="text-sm text-[#7096d1]">Years Strong</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-[#f9fcff] rounded-2xl border border-[#e7f1ff] hover:shadow-sm transition-all"
              whileHover={{ y: -5 }}
              transition={{ delay: index * 0.1 }}
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold text-[#081f5c] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#7096d1] font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <div className="text-center mb-12">
          <motion.h3
            className="text-3xl font-bold text-[#081f5c] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h3>
          <motion.p
            className="text-[#7096d1] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything we do is guided by our commitment to quality, compassion, and community.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="text-center p-8 bg-gradient-to-br from-[#f9fcff] to-[#e7f1ff] rounded-2xl border border-[#d0e3ff]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center shadow-sm">
                <value.icon className="h-8 w-8 text-[#334eac]" />
              </div>
              <h4 className="text-xl font-bold text-[#081f5c] mb-4">
                {value.title}
              </h4>
              <p className="text-[#7096d1] leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;