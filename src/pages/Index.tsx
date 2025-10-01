import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import SnowEffect from '@/components/SnowEffect';
import { useToast } from '@/hooks/use-toast';

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
      
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur text-primary-foreground shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-4xl">🎄</span>
              Новогодние Видео
            </h1>
            <div className="flex gap-4">
              <a href="#home" className="hover:text-secondary transition-colors">Главная</a>
              <a href="#editor" className="hover:text-secondary transition-colors">Редактор</a>
              <a href="#gallery" className="hover:text-secondary transition-colors">Галерея</a>
              <a href="#faq" className="hover:text-secondary transition-colors">FAQ</a>
              <a href="#contacts" className="hover:text-secondary transition-colors">Контакты</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-20">
        <section id="home" className="text-center space-y-8 animate-fade-in">
          <div className="relative">
            <h2 className="text-6xl font-bold mb-4 text-primary sparkle">
              Создай волшебное поздравление!
            </h2>
            <p className="text-2xl text-muted-foreground mb-8">
              Персональные новогодние видео от любимых героев
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <img 
              src="/img/26cec7ca-31b6-4e70-8404-7c2a2023c0ce.jpg" 
              alt="Новогодние герои"
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="hover:scale-105 transition-transform border-2 border-primary/20">
              <CardHeader>
                <div className="text-5xl mb-2">✨</div>
                <CardTitle>Легко и быстро</CardTitle>
                <CardDescription>Создайте видео за 2 минуты</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-105 transition-transform border-2 border-secondary/20">
              <CardHeader>
                <div className="text-5xl mb-2">🎁</div>
                <CardTitle>Персонализация</CardTitle>
                <CardDescription>Укажите имена детей</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover:scale-105 transition-transform border-2 border-accent/40">
              <CardHeader>
                <div className="text-5xl mb-2">🎵</div>
                <CardTitle>С музыкой</CardTitle>
                <CardDescription>Новогодние мелодии</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section id="editor" className="space-y-8">
          <h2 className="text-5xl font-bold text-center text-primary mb-12">
            <span className="text-5xl mr-2">🎬</span>
            Редактор Видео
          </h2>
          
          <Tabs defaultValue="character" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="character" className="text-lg py-4">
                <Icon name="Users" className="mr-2" size={20} />
                Персонаж
              </TabsTrigger>
              <TabsTrigger value="music" className="text-lg py-4">
                <Icon name="Music" className="mr-2" size={20} />
                Музыка
              </TabsTrigger>
              <TabsTrigger value="effects" className="text-lg py-4">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Эффекты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="character" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Выберите персонажа</CardTitle>
                  <CardDescription>Кто будет поздравлять?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {characters.map(char => (
                      <Card 
                        key={char.id}
                        className={`cursor-pointer transition-all ${
                          selectedCharacter === char.id 
                            ? 'ring-4 ring-primary shadow-xl scale-105' 
                            : 'hover:scale-105'
                        }`}
                        onClick={() => setSelectedCharacter(char.id)}
                      >
                        <CardContent className="pt-6 text-center space-y-3">
                          <div className="text-6xl">{char.icon}</div>
                          <img src={char.image} alt={char.name} className="w-full h-32 object-cover rounded-lg" />
                          <p className="font-semibold text-lg">{char.name}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="greeting" className="text-lg">Тип поздравления</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {greetings.map(greeting => (
                        <Card 
                          key={greeting.id}
                          className={`cursor-pointer transition-all ${
                            selectedGreeting === greeting.id 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:bg-accent/50'
                          }`}
                          onClick={() => setSelectedGreeting(greeting.id)}
                        >
                          <CardContent className="py-4">
                            <p className="font-semibold">{greeting.name}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="childName" className="text-lg">Имя ребенка</Label>
                    <Input 
                      id="childName"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Введите имя..."
                      className="text-lg py-6"
                    />
                  </div>

                  {childName && selectedGreeting && (
                    <Card className="bg-accent/30">
                      <CardContent className="pt-6">
                        <p className="text-sm text-muted-foreground mb-2">Предпросмотр текста:</p>
                        <p className="italic">"{greetings.find(g => g.id === selectedGreeting)?.text.replace('{name}', childName)}"</p>
                      </CardContent>
                    </Card>
                  )}

                  <Button 
                    onClick={handleCreateVideo}
                    className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    disabled={!childName.trim() || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
                        🎙️ Создаю голосовое поздравление...
                      </>
                    ) : (
                      <>
                        <Icon name="Wand2" className="mr-2" size={24} />
                        🎤 Создать голосовое поздравление
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="music" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Библиотека музыки</CardTitle>
                  <CardDescription>Выберите фоновую мелодию</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Jingle Bells', 'В лесу родилась ёлочка', 'Новогодняя', 'Снежинки'].map((song, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                      <Icon name="Music" size={20} />
                      <span className="flex-1">{song}</span>
                      <Icon name="Play" size={20} className="text-primary" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="effects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Визуальные эффекты</CardTitle>
                  <CardDescription>Добавьте магию в видео</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: 'Snowflake', name: 'Падающий снег', active: true },
                    { icon: 'Sparkles', name: 'Блестки', active: true },
                    { icon: 'Zap', name: 'Фейерверк', active: false },
                    { icon: 'Star', name: 'Звездочки', active: false },
                  ].map((effect, i) => (
                    <div key={i} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      effect.active ? 'bg-accent border-primary' : 'border-muted hover:border-primary/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Icon name={effect.icon} size={24} />
                        <span className="font-medium">{effect.name}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section id="gallery" className="space-y-8">
          <h2 className="text-5xl font-bold text-center text-primary mb-12">
            <span className="text-5xl mr-2">🎥</span>
            Галерея готовых видео
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map(video => (
              <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  {playingVideo === video.id ? (
                    <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex flex-col items-center justify-center min-h-[12rem]">
                      <audio 
                        src={video.videoUrl || video.video_url} 
                        controls 
                        autoPlay
                        className="w-full"
                        onEnded={() => setPlayingVideo(null)}
                      />
                      <div className="mt-4 text-center">
                        <div className="text-6xl mb-2">{characters.find(c => c.id === video.character)?.icon}</div>
                        <p className="text-sm text-muted-foreground">🎙️ Голосовое поздравление</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="absolute top-2 right-2"
                        onClick={() => setPlayingVideo(null)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <img src={video.thumbnail} alt={video.name} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button 
                          size="lg" 
                          className="bg-white text-primary hover:bg-white/90"
                          onClick={() => setPlayingVideo(video.id)}
                        >
                          <Icon name="Volume2" className="mr-2" />
                          Слушать
                        </Button>
                      </div>
                    </>
                  )}
                </div>
                <CardContent className="pt-4">
                  <p className="font-semibold text-lg">Поздравление для {video.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {characters.find(c => c.id === video.character)?.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="how" className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 space-y-8">
          <h2 className="text-5xl font-bold text-center text-primary mb-12">
            Как создать видео?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: 'UserPlus', title: 'Выберите персонажа', desc: 'Дед Мороз, Снегурочка или Снеговик' },
              { step: '2', icon: 'PenTool', title: 'Укажите имя', desc: 'Введите имя ребенка' },
              { step: '3', icon: 'Palette', title: 'Настройте эффекты', desc: 'Музыка, снег, блестки' },
              { step: '4', icon: 'Download', title: 'Скачайте видео', desc: 'Готово! Делитесь радостью' },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <Icon name={item.icon} size={40} className="mx-auto text-secondary" />
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-5xl font-bold text-center text-primary mb-12">
            <span className="text-5xl mr-2">❓</span>
            Вопросы и ответы
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-2 border-primary/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Сколько стоит создание видео?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Создание видео абсолютно бесплатно! Вы можете создать неограниченное количество поздравлений.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-2 border-primary/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Какая длительность видео?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Стандартное видео длится 30-60 секунд. Идеально для отправки в мессенджерах!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-2 border-primary/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                Можно ли добавить несколько имен?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да! В расширенных настройках вы можете указать до 5 имен детей в одном видео.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-2 border-primary/20 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                В каком формате скачивается видео?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Видео доступно в формате MP4, который поддерживается всеми устройствами и социальными сетями.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section id="contacts" className="text-center space-y-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-3xl p-12">
          <h2 className="text-5xl font-bold mb-8">
            <span className="text-5xl mr-2">📧</span>
            Контакты
          </h2>
          
          <div className="space-y-4 max-w-xl mx-auto">
            <p className="text-xl">Есть вопросы? Свяжитесь с нами!</p>
            
            <div className="flex flex-col gap-4">
              <a href="mailto:info@newyear-video.ru" className="flex items-center justify-center gap-3 text-lg hover:underline">
                <Icon name="Mail" size={24} />
                info@newyear-video.ru
              </a>
              
              <a href="tel:+79991234567" className="flex items-center justify-center gap-3 text-lg hover:underline">
                <Icon name="Phone" size={24} />
                +7 (999) 123-45-67
              </a>
            </div>

            <div className="flex justify-center gap-6 mt-8">
              <Button variant="secondary" size="lg" className="text-lg">
                <Icon name="MessageCircle" className="mr-2" />
                Telegram
              </Button>
              <Button variant="secondary" size="lg" className="text-lg">
                <Icon name="Share2" className="mr-2" />
                VK
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary/95 text-primary-foreground py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">🎄 Новогодние Видео © 2025. Создайте волшебство вместе с нами! ✨</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;