import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 349;

export const KeychainCanvas = () => {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Preload images
  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      const loadedImages = new Array(TOTAL_FRAMES);
      let count = 0;

      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const frameNumber = (i + 1).toString().padStart(4, '0');
          img.src = `/keychain-images/${frameNumber}.jpg`;
          
          img.onload = () => {
            if (!mounted) return;
            loadedImages[i] = img;
            count++;
            setLoadedCount(count);
            // Simulate slow network if needed, but we don't.
            resolve(img);
          };
          
          img.onerror = () => {
            if (!mounted) return;
            console.error(`Failed to load frame_${frameNumber}.png`);
            // We can resolve with null to allow other images to load
            loadedImages[i] = null;
            count++;
            setLoadedCount(count);
            resolve(null);
          };
        });
      });

      await Promise.all(promises);
      
      if (!mounted) return;
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = images[index];
    
    if (!img) {
      // Background color fallback if frame is missing
      ctx.fillStyle = '#fdf9f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    // We already handle dpr in canvas size, but let's clear it
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Warm cream background
    ctx.fillStyle = '#fdf9f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cover logic (fills screen fully)
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const MathRatio = Math.max(hRatio, vRatio);
    
    // Smooth transitions for center shift
    const centerShift_x = (canvas.width - img.width * MathRatio) / 2;
    const centerShift_y = (canvas.height - img.height * MathRatio) / 2;

    ctx.drawImage(
      img, 
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * MathRatio, img.height * MathRatio
    );
  }, [images]);

  // Handle Resize & initial draw
  useEffect(() => {
    if (!isLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      // No need to scale because we use actual logical pixels when drawing
      // Context scale would double the coordinates, requiring different logic.

      // Redraw current frame
      const currentScroll = scrollYProgress.get();
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1, 
        Math.floor(currentScroll * TOTAL_FRAMES)
      );
      
      requestAnimationFrame(() => drawFrame(frameIndex));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isLoaded, drawFrame, scrollYProgress]);

  // Handle Scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * TOTAL_FRAMES)
    );
    requestAnimationFrame(() => drawFrame(frameIndex));
  });

  return (
    <>
      {/* Premium Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream/90 backdrop-blur-2xl"
          >
            <div className="relative">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-24 h-24 absolute -top-12 -left-12 bg-red/20 rounded-full blur-2xl"
              />
              <motion.div 
                animate={{ scale: [1, 1.5, 1], rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-32 h-32 absolute -bottom-16 -right-16 bg-teal/20 rounded-full blur-3xl"
              />
              
              <div className="relative z-10 flex flex-col items-center p-12 bg-white/40 border border-white/60 rounded-[3rem] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-16 h-16 text-red mb-6 drop-shadow-md"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </motion.div>
                
                <h1 className="font-playfair text-4xl font-black tracking-tight text-dark mb-2">Crouchets</h1>
                <p className="font-sans text-slate-500 tracking-[0.2em] uppercase text-xs font-bold mb-8">
                  Weaving your experience...
                </p>
                
                <div className="w-64 h-2 bg-slate-200/50 rounded-full overflow-hidden shadow-inner relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
                  />
                </div>
                
                <div className="mt-4 flex justify-between w-64 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Extracting thread</span>
                  <span className="text-teal-600">{Math.round((loadedCount / TOTAL_FRAMES) * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-cream">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }}
        />
      </div>
    </>
  );
};
