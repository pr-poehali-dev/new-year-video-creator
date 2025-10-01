import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
    <section id="home" className="text-center space-y-6 md:space-y-8 animate-fade-in">
      <div className="relative px-2">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 md:mb-4 text-primary sparkle">
          Создай волшебное поздравление!
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8">
          Персональные новогодние видео от любимых героев
        </p>
      </div>
      
      <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
        <img 
          src="/img/26cec7ca-31b6-4e70-8404-7c2a2023c0ce.jpg" 
          alt="Новогодние герои"
          className="w-full h-auto"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
        <Card className="hover:scale-105 transition-transform border-2 border-primary/20">
          <CardHeader className="py-4 md:py-6">
            <div className="text-4xl md:text-5xl mb-2">🎙️</div>
            <CardTitle className="text-lg md:text-xl">AI голос</CardTitle>
            <CardDescription className="text-sm md:text-base">Реалистичная озвучка персонажей</CardDescription>
          </CardHeader>
        </Card>
        <Card className="hover:scale-105 transition-transform border-2 border-secondary/20">
          <CardHeader className="py-4 md:py-6">
            <div className="text-4xl md:text-5xl mb-2">🎁</div>
            <CardTitle className="text-lg md:text-xl">Персонализация</CardTitle>
            <CardDescription className="text-sm md:text-base">С именем вашего ребёнка</CardDescription>
          </CardHeader>
        </Card>
        <Card className="hover:scale-105 transition-transform border-2 border-accent/40">
          <CardHeader className="py-4 md:py-6">
            <div className="text-4xl md:text-5xl mb-2">📥</div>
            <CardTitle className="text-lg md:text-xl">Скачивание</CardTitle>
            <CardDescription className="text-sm md:text-base">MP3 файлы для любых устройств</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <div className="mt-6 md:mt-8 text-center px-4">
        <a href="/pricing">
          <Button size="lg" className="text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
            <Icon name="Sparkles" className="mr-2" size={20} />
            Посмотреть тарифы
          </Button>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
