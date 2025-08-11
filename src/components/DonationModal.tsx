import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Heart } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onDonate: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  message,
  onClose,
  onDonate
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="w-full max-w-md shadow-2xl">
              <CardContent className="p-6 text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={onClose}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ 
                    rotate: [0, -10, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  🥣
                </motion.div>
                
                <h3 className="text-xl font-bold text-cute-purple mb-3">
                  Kasih snack buat kucing developer? 🐟
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {message}
                </p>
                
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="cute"
                    onClick={onDonate}
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Donasi Sekarang
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={onClose}
                  >
                    Skip 🥺
                  </Button>
                </div>
                
                <motion.div
                  className="mt-4 text-4xl"
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity 
                  }}
                >
                  😿
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DonationModal;