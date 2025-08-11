import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

const MAX_DURATION = 30; // seconds

export const useAudioValidation = () => {
  const { toast } = useToast();

  const validateAudioDuration = useCallback(async (audioBlob: Blob): Promise<boolean> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      const url = URL.createObjectURL(audioBlob);
      
      audio.addEventListener('loadedmetadata', () => {
        URL.revokeObjectURL(url);
        
        if (audio.duration > MAX_DURATION) {
          toast({
            title: "⏰ Audio Terlalu Panjang!",
            description: `Maksimal ${MAX_DURATION} detik! Durasi audio: ${Math.round(audio.duration)}s`,
            variant: "destructive"
          });
          resolve(false);
        } else {
          resolve(true);
        }
      });

      audio.addEventListener('error', () => {
        URL.revokeObjectURL(url);
        toast({
          title: "❌ Audio Corrupt",
          description: "File audio tidak valid atau rusak",
          variant: "destructive"
        });
        resolve(false);
      });

      audio.src = url;
    });
  }, [toast]);

  return { validateAudioDuration, MAX_DURATION };
};