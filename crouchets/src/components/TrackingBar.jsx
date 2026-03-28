import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const TrackingBar = ({ steps }) => {
  return (
    <div className="relative py-8">
      {/* Background Line */}
      <div className="absolute top-12 left-0 w-full h-1 bg-warm rounded-full" />
      
      {/* Active Line Progress */}
      <div className="absolute top-12 left-0 h-1 bg-teal rounded-full" style={{
        width: `${(steps.filter(s => s.completed).length - 1) / (steps.length - 1) * 100}%`
      }} />

      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.completed;
          return (
            <div key={index} className="flex flex-col items-center gap-3 z-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                  isCompleted ? 'bg-teal border-teal text-white shadow-md shadow-teal/20' : 'bg-cream border-warm text-mid'
                }`}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="w-2 h-2 rounded-full bg-warm" />}
              </motion.div>
              <div className="text-center">
                <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isCompleted ? 'text-dark' : 'text-mid/50'}`}>
                  {step.label}
                </p>
                {step.date && <p className="text-[10px] text-mid">{new Date(step.date).toLocaleDateString()}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
