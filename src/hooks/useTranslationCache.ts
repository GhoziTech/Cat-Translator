import { useCallback } from 'react';
import CryptoJS from 'crypto-js';

interface CachedTranslation {
  text: string;
  timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const CACHE_PREFIX = 'cat_translation_';

export const useTranslationCache = () => {
  const generateCacheKey = useCallback(async (audioBlob: Blob): Promise<string> => {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    const hash = CryptoJS.MD5(wordArray).toString();
    return `${CACHE_PREFIX}${hash}`;
  }, []);

  const getCachedTranslation = useCallback(async (audioBlob: Blob): Promise<string | null> => {
    try {
      const cacheKey = await generateCacheKey(audioBlob);
      const cachedData = localStorage.getItem(cacheKey);
      
      if (!cachedData) return null;
      
      const parsed: CachedTranslation = JSON.parse(cachedData);
      const now = Date.now();
      
      if (now - parsed.timestamp > CACHE_DURATION) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      
      return parsed.text;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }, [generateCacheKey]);

  const setCachedTranslation = useCallback(async (audioBlob: Blob, translation: string): Promise<void> => {
    try {
      const cacheKey = await generateCacheKey(audioBlob);
      const cacheData: CachedTranslation = {
        text: translation,
        timestamp: Date.now()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }, [generateCacheKey]);

  const clearExpiredCache = useCallback(() => {
    const now = Date.now();
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CACHE_PREFIX)) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed: CachedTranslation = JSON.parse(data);
            if (now - parsed.timestamp > CACHE_DURATION) {
              keysToRemove.push(key);
            }
          }
        } catch (error) {
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }, []);

  return { getCachedTranslation, setCachedTranslation, clearExpiredCache };
};