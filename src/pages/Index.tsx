import { useState, useEffect } from 'react';
import SnowEffect from '@/components/SnowEffect';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import VideoEditor from '@/components/home/VideoEditor';
import VideoGallery from '@/components/home/VideoGallery';
import HowItWorks from '@/components/home/HowItWorks';
import FAQ from '@/components/home/FAQ';
import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/home/Footer';

const VIDEOS_URL = 'https://functions.poehali.dev/25ad61b1-3834-4f5e-9278-01d9d55d229d';
const GENERATE_URL = 'https://functions.poehali.dev/506f7442-eb6d-4248-b46c-251dcb121be9';

const Index = () => {
  const { toast } = useToast();
  const [selectedCharacter, setSelectedCharacter] = useState('santa');
  const [childName, setChildName] = useState('');
  const [selectedGreeting, setSelectedGreeting] = useState('birthday');
  const [videos, setVideos] = useState<any[]>([]);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const response = await fetch(VIDEOS_URL);
      const data = await response.json();
      if (data.videos) {
        setVideos(data.videos);
      }
    } catch (error) {
      console.error('Failed to load videos:', error);
    }
  };

  const characters = [
    { id: 'santa', name: 'Дед Мороз', icon: '🎅', image: '/img/d48aa981-3b64-42ad-a810-bb7c0d926bdd.jpg' },
    { id: 'snowmaiden', name: 'Снегурочка', icon: '👸', image: '/img/e7db9042-a0ba-48c2-bb1b-201b2767e23a.jpg' },
    { id: 'snowman', name: 'Снеговик', icon: '⛄', image: '/placeholder.svg' },
  ];

  const greetings = [
    { id: 'birthday', name: 'С Днём Рождения', text: 'Дорогой {name}! Поздравляю тебя с Днём Рождения! Желаю тебе счастья, здоровья и исполнения всех желаний! Пусть этот год принесёт тебе много радости!' },
    { id: 'newyear', name: 'С Новым Годом', text: 'Здравствуй, {name}! Я, Дед Мороз, поздравляю тебя с наступающим Новым Годом! Желаю тебе волшебства, чудес и много-много подарков под ёлочкой!' },
    { id: 'goodbehavior', name: 'За хорошее поведение', text: 'Молодец, {name}! Ты был очень послушным в этом году! Я горжусь тобой и приготовил для тебя особенный подарок! Продолжай в том же духе!' },
    { id: 'achievement', name: 'За достижения', text: 'Умница, {name}! Ты добился больших успехов! Я очень рад за тебя! Продолжай стараться, и у тебя всё получится!' },
  ];

  const handleCreateVideo = async () => {
    if (!childName.trim()) return;
    
    setIsGenerating(true);
    const greetingText = greetings.find(g => g.id === selectedGreeting)?.text.replace('{name}', childName) || '';
    
    try {
      toast({
        title: '🎬 Генерация началась',
        description: 'Создаю голосовое поздравление с AI...',
      });

      const response = await fetch(GENERATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character: selectedCharacter,
          name: childName,
          message: greetingText
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        await loadVideos();
        setChildName('');
        toast({
          title: '✨ Видео готово!',
          description: `Голосовое поздравление для ${childName} создано!`,
        });
      } else {
        toast({
          title: '⚠️ Требуется настройка',
          description: data.error || 'Добавьте OpenAI API ключ в настройках проекта',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать видео',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SnowEffect />
      <Header />

      <main className="container mx-auto px-4 py-12 space-y-20">
        <HeroSection />
        
        <VideoEditor
          characters={characters}
          greetings={greetings}
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
          selectedGreeting={selectedGreeting}
          setSelectedGreeting={setSelectedGreeting}
          childName={childName}
          setChildName={setChildName}
          isGenerating={isGenerating}
          handleCreateVideo={handleCreateVideo}
        />

        <VideoGallery
          videos={videos}
          characters={characters}
          playingVideo={playingVideo}
          setPlayingVideo={setPlayingVideo}
        />

        <HowItWorks />
        <FAQ />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
