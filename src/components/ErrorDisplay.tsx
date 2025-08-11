import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  type: 'api_limit' | 'audio_corrupt' | 'general';
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ type, onRetry }) => {
  const getErrorContent = () => {
    switch (type) {
      case 'api_limit':
        return {
          emoji: '🐱',
          title: 'Server Lagi Penuh!',
          message: 'Kasih makan kucingnya dulu, coba lagi nanti! 😽',
          animation: { rotate: [0, -10, 10, 0] }
        };
      case 'audio_corrupt':
        return {
          emoji: '😵‍💫',
          title: 'Audio Corrupt!',
          message: 'Kucingnya pusing dengar audio ini... Coba yang lain ya!',
          animation: { 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }
        };
      default:
        return {
          emoji: '😴',
          title: 'Server Lagi Down',
          message: 'Zzz... Kucingnya lagi tidur di atas keyboard',
          animation: { 
            y: [0, -5, 0],
            rotate: [0, 2, -2, 0]
          }
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <Card className="w-full max-w-lg shadow-cute">
      <CardContent className="py-8 text-center">
        <motion.div
          className="text-6xl mb-4"
          animate={errorContent.animation}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {errorContent.emoji}
        </motion.div>
        
        <h3 className="text-xl font-bold text-cute-purple mb-3">
          {errorContent.title}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {errorContent.message}
        </p>
        
        <Button
          variant="cute"
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </Button>
        
        {type === 'general' && (
          <motion.div
            className="mt-4 text-2xl"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            💤
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;