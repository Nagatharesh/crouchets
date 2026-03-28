import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const { products } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="bg-cream overflow-x-hidden">
      {/* SECTION 1 - HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 lg:px-24">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-playfair text-6xl md:text-8xl text-dark text-center tracking-tight mb-8 z-10"
        >
          Handmade. Soft. Yours.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-xl md:text-2xl text-mid font-medium max-w-2xl text-center mb-12 z-10"
        >
          Premium crochet keychains and charms, crafted to bring a little joy to your everyday.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="z-10"
        >
          <Link to="/shop" className="px-10 py-4 bg-dark text-white rounded-2xl font-medium tracking-wide shadow-xl shadow-dark/20 hover:bg-black transition-all hover:-translate-y-1 inline-block">
            Shop Collection
          </Link>
        </motion.div>

        {/* Floating images */}
        <motion.img 
          style={{ y: y1 }}
          src="https://images.unsplash.com/photo-1618642784732-f15f037be6c3?auto=format&fit=crop&q=80&w=600&h=600" 
          alt="Crochet Item" 
          className="absolute -left-32 top-1/4 w-96 h-96 object-cover rounded-[3rem] shadow-2xl rotate-[-6deg] opacity-80"
        />
        <motion.img 
          style={{ y: y2 }}
          src="https://images.unsplash.com/photo-1590005354167-6da97ce231ce?auto=format&fit=crop&q=80&w=600&h=600" 
          alt="Crochet Item" 
          className="absolute -right-32 bottom-1/4 w-96 h-96 object-cover rounded-[3rem] shadow-2xl rotate-[12deg] opacity-80"
        />
      </section>

      {/* SECTION 2 - SCROLL REVEAL CONTENT */}
      <section className="py-32 px-6 lg:px-24 max-w-7xl mx-auto space-y-48">
        {[
          {
            title: "Born from a Thread",
            desc: "Every keychain begins as a single yarn, meticulously selected for its softness, vibrancy, and durability. We believe the medium is just as important as the message.",
            img: "https://images.unsplash.com/photo-1598502390979-99ffc71b694b?auto=format&fit=crop&q=80&w=800&h=1000",
            reverse: false
          },
          {
            title: "Crafted by Hand",
            desc: "No machines. Just skill, patience, and love. Our artisans spend hours looping and weaving to bring each design to life, ensuring every piece has entirely unique characteristics.",
            img: "https://images.unsplash.com/photo-1585236270928-8951b1f63c5d?auto=format&fit=crop&q=80&w=800&h=1000",
            reverse: true
          },
        ].map((block, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row items-center gap-16 ${block.reverse ? 'md:flex-row-reverse' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, x: block.reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="flex-1"
            >
              <img src={block.img} alt={block.title} className="w-full aspect-[4/5] object-cover rounded-3xl shadow-lg border border-warm/20" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex-1 space-y-6"
            >
              <h2 className="font-playfair text-4xl md:text-5xl text-dark leading-tight">{block.title}.</h2>
              <p className="font-sans text-xl text-mid leading-relaxed max-w-md">{block.desc}</p>
            </motion.div>
          </div>
        ))}
      </section>

      {/* SECTION 3 - HORIZONTAL PRODUCTS */}
      <section className="py-32 bg-white px-6 lg:px-24">
        <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark">Featured Collection.</h2>
          <Link to="/shop" className="text-sm font-bold tracking-widest uppercase text-teal hover:text-dark transition-colors border-b-2 border-teal pb-1">View All</Link>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 4 - BRAND STORY MINIMAL */}
      <section className="py-48 px-6 lg:px-24 text-center max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-playfair text-3xl md:text-5xl text-dark leading-snug"
        >
          "A tiny piece of handmade art for your everyday adventure. That's the Crouchets promise."
        </motion.p>
      </section>

      {/* SECTION 5 - CTA */}
      <section className="py-32 px-6 lg:px-24 bg-teal/10 text-center">
        <h2 className="font-playfair text-5xl text-dark mb-8">Start your collection.</h2>
        <Link to="/shop" className="inline-block px-12 py-4 bg-dark text-white rounded-2xl font-medium tracking-wide shadow-xl shadow-dark/20 hover:bg-black transition-all hover:scale-105">
          Shop Now
        </Link>
      </section>
    </div>
  );
};
