import { useState, useEffect, useCallback } from 'react';

const USAGE_COUNT_KEY = 'cat_translator_usage_count';
const DONATION_SHOWN_KEY = 'cat_translator_donation_shown';

const EMOTIONAL_MESSAGES = [
  "1 donasi = 1 ekor kucing developer tidak kelaparan",
  "Kamu bisa skip, tapi kucing ini akan memandangmu dengan sedih 😿",
  "Kami gratis, tapi server kami lapar... Bantu kami tetap hidup ya!",
  "Kucing developer butuh snack buat coding! 🐟",
  "Setiap donasi membuat kucing developer purr dengan bahagia 💕"
];

export const useDonationSystem = () => {
  const [usageCount, setUsageCount] = useState(0);
  const [showDonation, setShowDonation] = useState(false);
  const [donationMessage, setDonationMessage] = useState('');

  useEffect(() => {
    const count = parseInt(localStorage.getItem(USAGE_COUNT_KEY) || '0');
    setUsageCount(count);
  }, []);

  const incrementUsage = useCallback(() => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(USAGE_COUNT_KEY, newCount.toString());

    if (newCount >= 3 && !localStorage.getItem(DONATION_SHOWN_KEY)) {
      const randomMessage = EMOTIONAL_MESSAGES[Math.floor(Math.random() * EMOTIONAL_MESSAGES.length)];
      setDonationMessage(randomMessage);
      setShowDonation(true);
    }
  }, [usageCount]);

  const hideDonation = useCallback(() => {
    setShowDonation(false);
    localStorage.setItem(DONATION_SHOWN_KEY, 'true');
  }, []);

  const openDonationLink = useCallback(() => {
    // Replace with actual donation link
    window.open('https://ko-fi.com/ghozitech', '_blank');
    hideDonation();
  }, [hideDonation]);

  return {
    usageCount,
    showDonation,
    donationMessage,
    incrementUsage,
    hideDonation,
    openDonationLink
  };
};