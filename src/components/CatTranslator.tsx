import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mic, Upload, Share, Copy, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-cat.png';
import catIcon from '@/assets/cat-icon.png';

type TranslationStyle = 'sarcastic' | 'romantic' | 'aggressive';

interface TranslationResult {
  originalText: string;
  translatedText: string;
  style: TranslationStyle;
}

const CatTranslator = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [translationStyle, setTranslationStyle] = useState<TranslationStyle>('sarcastic');
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const styleLabels = {
    sarcastic: 'Sarkastik 😼',
    romantic: 'Romantis 💕', 
    aggressive: 'Galak 😾'
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: "🎤 Merekam...", description: "Katakan sesuatu untuk kucing!" });
    } catch (error) {
      toast({ 
        title: "❌ Error", 
        description: "Tidak bisa mengakses mikrofon",
        variant: "destructive" 
      });
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      processAudio(file);
    } else {
      toast({ 
        title: "❌ Error", 
        description: "Harap upload file audio yang valid",
        variant: "destructive" 
      });
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsLoading(true);
    
    // Simulated API calls - replace with real API integration
    try {
      // Simulated Whisper API call
      const mockTranscription = "Meong meong nyaa";
      
      // Simulated ChatGPT translation
      const mockTranslations = {
        sarcastic: "Halo manusia, aku lapar! Tapi kayaknya kamu sibuk main HP terus ya? 🙄",
        romantic: "Sayang... aku merindukan pelukanmu yang hangat 💕 Ayo main bareng~",
        aggressive: "OI! Mana makananku?! Udah jam segini belum dikasih makan! 😾"
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setResult({
        originalText: mockTranscription,
        translatedText: mockTranslations[translationStyle],
        style: translationStyle
      });

      toast({ 
        title: "✨ Terjemahan Selesai!", 
        description: "Kucing telah berbicara!" 
      });
    } catch (error) {
      toast({ 
        title: "❌ Error", 
        description: "Gagal memproses audio",
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (platform: 'twitter' | 'whatsapp') => {
    if (!result) return;

    const text = `🐱 Terjemahan Kucing: "${result.translatedText}" - Dibuat dengan 😺 oleh GhoziTech`;
    const encodedText = encodeURIComponent(text);

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}`
    };

    window.open(urls[platform], '_blank');
  };

  const handleCopy = () => {
    if (!result) return;
    
    const text = `🐱 Terjemahan Kucing: "${result.translatedText}" - Dibuat dengan 😺 oleh GhoziTech`;
    navigator.clipboard.writeText(text);
    toast({ title: "📋 Disalin!", description: "Teks berhasil disalin ke clipboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={catIcon} alt="Cat Icon" className="w-12 h-12" />
          <h1 className="text-4xl font-bold bg-gradient-cat bg-clip-text text-transparent">
            Cat Translator
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Terjemahkan bahasa kucing jadi bahasa manusia yang lucu! 🐱✨
        </p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center px-4 mb-8">
        <img src={heroImage} alt="Cute Cat" className="w-full max-w-md mb-8 rounded-2xl shadow-cute" />
        
        {/* Translation Style Selector */}
        <Card className="w-full max-w-md mb-6 shadow-cute">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-cute-purple">Pilih Gaya Terjemahan</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={translationStyle} onValueChange={(value: TranslationStyle) => setTranslationStyle(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarcastic">{styleLabels.sarcastic}</SelectItem>
                <SelectItem value="romantic">{styleLabels.romantic}</SelectItem>
                <SelectItem value="aggressive">{styleLabels.aggressive}</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Recording Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button
            variant={isRecording ? "destructive" : "record"}
            size="record"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={isLoading}
            className="relative"
          >
            <Mic className={`w-8 h-8 ${isRecording ? 'animate-pulse' : ''}`} />
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-white animate-ping" />
            )}
          </Button>

          <div className="flex flex-col items-center gap-2">
            <Button
              variant="cute"
              size="xl"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Upload className="w-6 h-6" />
              Upload Audio
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="audio/*"
              className="hidden"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Card className="w-full max-w-lg shadow-cute">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-4">🐱</div>
                <p className="text-cute-purple font-medium">Kucing sedang berpikir...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Translation Result */}
        {result && !isLoading && (
          <Card className="w-full max-w-lg shadow-cute">
            <CardHeader>
              <CardTitle className="text-center text-cute-purple">
                Hasil Terjemahan {styleLabels[result.style]}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Suara asli:</p>
                <p className="italic">"{result.originalText}"</p>
              </div>
              
              <div className="p-4 bg-gradient-cat text-white rounded-lg">
                <p className="text-sm opacity-90 mb-2">Terjemahan:</p>
                <p className="font-medium">"{result.translatedText}"</p>
              </div>

              {/* Share Buttons */}
              <div className="flex flex-wrap gap-2 justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  <Share className="w-4 h-4" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('whatsapp')}
                >
                  <Share className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                  Salin
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Footer Watermark */}
      <footer className="text-center py-8 px-4">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          Dibuat dengan <Heart className="w-4 h-4 text-cute-pink" /> oleh 
          <span className="font-semibold text-cute-purple">GhoziTech</span>
        </p>
      </footer>
    </div>
  );
};

export default CatTranslator;