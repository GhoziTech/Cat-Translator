import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="text-center py-8">
      <motion.div
        className="text-6xl mb-4 inline-block"
        animate={{
          x: [0, 20, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🐱
      </motion.div>
      
      <motion.div
        className="text-lg text-cute-purple font-medium mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Sedang menerjemahkan...
      </motion.div>
      
      <motion.div
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Sabar ya, kucingnya lagi mikir! 🤔
      </motion.div>
      
      {/* Blinking eyes effect */}
      <motion.div
        className="mt-4 text-2xl"
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        👀
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;