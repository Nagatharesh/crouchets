import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const OverlayText = ({ offsetRange, opacityRange, yRange, alignment, verticalAlign = 'items-center', heading, subtext, showButton }) => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, offsetRange, opacityRange);
  const y = useTransform(scrollYProgress, offsetRange, yRange);
  // Guarantee physical removal from DOM rendering to prevent stacking context overlaps
  const display = useTransform(opacity, (o) => (o > 0.01 ? "block" : "none"));

  return (
    <div className={`absolute inset-0 px-6 md:px-24 pointer-events-none flex ${alignment} ${verticalAlign}`}>
      <motion.div 
        style={{ opacity, y, display }}
        className={`max-w-md pointer-events-auto p-8 rounded-3xl bg-white/95 shadow-2xl border border-warm/50 transition-all ${alignment === 'justify-start' ? 'text-left' : alignment === 'justify-end' ? 'text-right' : 'text-center'}`}
      >
        <h2 className="font-playfair text-4xl md:text-6xl text-dark mb-4 tracking-wide leading-tight px-1 drop-shadow-sm">
          {heading}
        </h2>
        <p className="font-sans text-xl md:text-2xl text-mid font-medium leading-relaxed drop-shadow-sm">
          {subtext}
        </p>
        
        {showButton && (
          <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/shop" className="inline-block px-8 py-4 bg-dark text-white rounded-xl font-medium tracking-wide shadow-xl hover:bg-black transition-colors pointer-events-auto">
              Shop the Collection
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export const StoryOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 w-full h-screen">
      
      {/* 0-15% Center Top */}
      <OverlayText 
        offsetRange={[0, 0.05, 0.1, 0.15]}
        opacityRange={[1, 1, 1, 0]}
        yRange={[0, 0, 0, -50]}
        alignment="justify-center"
        verticalAlign="items-start pt-40"
        heading={<span>Crouchets<span className="text-red ml-1">.</span></span>}
        subtext="Handmade with love, one stitch at a time"
      />

      {/* 20-35% Left Middle */}
      <OverlayText 
        offsetRange={[0.15, 0.2, 0.25, 0.35]}
        opacityRange={[0, 1, 1, 0]}
        yRange={[50, 0, 0, -50]}
        alignment="justify-start"
        verticalAlign="items-center"
        heading="Born from a Thread."
        subtext="Every keychain begins as a single yarn"
      />

      {/* 45-60% Right Middle */}
      <OverlayText 
        offsetRange={[0.4, 0.45, 0.55, 0.6]}
        opacityRange={[0, 1, 1, 0]}
        yRange={[50, 0, 0, -50]}
        alignment="justify-end"
        verticalAlign="items-center"
        heading="Crafted by Hand."
        subtext="No machines. Just skill, patience, and love"
      />

      {/* 70-85% Left Middle */}
      <OverlayText 
        offsetRange={[0.65, 0.7, 0.8, 0.85]}
        opacityRange={[0, 1, 1, 0]}
        yRange={[50, 0, 0, -50]}
        alignment="justify-start"
        verticalAlign="items-center"
        heading="Yours to Keep."
        subtext="A tiny piece of handmade art for your everyday"
      />

      {/* 90-100% Center Bottom */}
      <OverlayText 
        offsetRange={[0.88, 0.95, 1, 1]}
        opacityRange={[0, 1, 1, 0]}
        yRange={[50, 0, 0, 0]}
        alignment="justify-center"
        verticalAlign="items-end pb-40"
        heading="Shop the Collection."
        subtext="Each piece is unique — order yours today"
        showButton={true}
      />

    </div>
  );
};
