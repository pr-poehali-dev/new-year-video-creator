import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  icon: string;
  image: string;
  voice: string;
  exampleText: string;
}

const ExamplesSection = () => {
  const [playingExample, setPlayingExample] = useState<string | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesLoaded(true);
        }
      };
      
      loadVoices();
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const examples: Character[] = [
    {
      id: 'santa',
      name: 'Дед Мороз',
      icon: '🎅',
      image: '/img/d48aa981-3b64-42ad-a810-bb7c0d926bdd.jpg',
      voice: 'Глубокий басовитый голос',
      exampleText: 'Здравствуй, дорогой друг! Я, Дед Мороз, поздравляю тебя с Новым Годом!'
    },
    {
      id: 'snowmaiden',
      name: 'Снегурочка',
      icon: '👸',
      image: '/img/e7db9042-a0ba-48c2-bb1b-201b2767e23a.jpg',
      voice: 'Нежный женский голос',
      exampleText: 'Привет! Я Снегурочка! Поздравляю тебя с волшебным праздником!'
    },
    {
      id: 'snowman',
      name: 'Снеговик',
      icon: '⛄',
      image: '/img/18f25e6e-f42e-4f85-a43a-74c133aa24e8.jpg',
      voice: 'Весёлый добрый голос',
      exampleText: 'Привет, дружок! Я весёлый Снеговик! С Новым Годом тебя!'
    }
  ];

  const handlePlayExample = async (characterId: string, text: string) => {
    setPlayingExample(characterId);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const russianVoice = voices.find(voice => voice.lang.includes('ru'));
      
      if (russianVoice) {
        utterance.voice = russianVoice;
      }
      
      if (characterId === 'santa') {
        utterance.pitch = 0.7;
      } else if (characterId === 'snowmaiden') {
        utterance.pitch = 1.3;
      } else {
        utterance.pitch = 1.1;
      }
      
      utterance.onend = () => setPlayingExample(null);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setPlayingExample(null);
      };
      
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    } else {
      alert('Ваш браузер не поддерживает озвучку. Попробуйте Chrome или Safari.');
      setPlayingExample(null);
    }
  };

  const stopExample = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingExample(null);
  };

  return (
    <section id="examples" className="space-y-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8 md:mb-12">
        <span className="text-4xl md:text-5xl mr-2">🎤</span>
        Послушайте примеры
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {examples.map((example) => (
          <Card key={example.id} className="overflow-hidden hover:shadow-xl transition-all">
            <div className="relative h-48 md:h-56">
              <img 
                src={example.image} 
                alt={example.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-4 text-white w-full">
                  <p className="text-2xl md:text-3xl mb-1">{example.icon}</p>
                  <p className="font-bold text-lg md:text-xl">{example.name}</p>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg md:text-xl">{example.voice}</CardTitle>
              <CardDescription className="text-sm">
                {example.exampleText}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              {playingExample === example.id ? (
                <Button 
                  className="w-full"
                  variant="secondary"
                  onClick={stopExample}
                >
                  <Icon name="Square" className="mr-2" size={18} />
                  Остановить
                </Button>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  onClick={() => handlePlayExample(example.id, example.exampleText)}
                >
                  <Icon name="Play" className="mr-2" size={18} />
                  Прослушать пример
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8 p-4 md:p-6 bg-accent/30 rounded-xl max-w-2xl mx-auto">
        <p className="text-sm md:text-base text-muted-foreground">
          💡 <strong>Подсказка:</strong> В реальных видео используется профессиональная AI озвучка с OpenAI, 
          которая звучит ещё более естественно!
        </p>
      </div>
    </section>
  );
};

export default ExamplesSection;