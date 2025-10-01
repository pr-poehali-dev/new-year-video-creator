import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
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
            <div className="text-5xl mb-2">🎙️</div>
            <CardTitle>AI голос</CardTitle>
            <CardDescription>Реалистичная озвучка персонажей</CardDescription>
          </CardHeader>
        </Card>
        <Card className="hover:scale-105 transition-transform border-2 border-secondary/20">
          <CardHeader>
            <div className="text-5xl mb-2">🎁</div>
            <CardTitle>Персонализация</CardTitle>
            <CardDescription>С именем вашего ребёнка</CardDescription>
          </CardHeader>
        </Card>
        <Card className="hover:scale-105 transition-transform border-2 border-accent/40">
          <CardHeader>
            <div className="text-5xl mb-2">📥</div>
            <CardTitle>Скачивание</CardTitle>
            <CardDescription>MP3 файлы для любых устройств</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="mt-8 text-center">
        <a href="/pricing">
          <Button size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Icon name="Sparkles" className="mr-2" size={24} />
            Посмотреть тарифы
          </Button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
