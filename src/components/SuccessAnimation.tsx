import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ show, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="text-8xl mb-4"
              animate={{
                rotate: [0, 360, 720],
                scale: [1, 1.2, 1],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut"
              }}
            >
              🐱
            </motion.div>
            
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-2xl font-bold text-cute-purple mb-2">
                Kamu keren! 😻
              </div>
              <div className="text-sm text-muted-foreground">
                Terima kasih sudah support kucing developer!
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessAnimation;