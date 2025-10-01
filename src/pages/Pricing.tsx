import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Бесплатно',
      price: 0,
      period: '',
      icon: '🎁',
      features: [
        '1 видео в день',
        'Стандартное качество',
        'Базовые персонажи',
        'Водяной знак'
      ],
      buttonText: 'Попробовать',
      popular: false
    },
    {
      id: 'basic',
      name: 'Базовый',
      price: 299,
      period: 'месяц',
      icon: '⭐',
      features: [
        '10 видео в месяц',
        'HD качество',
        'Все персонажи',
        'Без водяного знака',
        'Скачивание MP3'
      ],
      buttonText: 'Купить',
      popular: true
    },
    {
      id: 'premium',
      name: 'Премиум',
      price: 699,
      period: 'месяц',
      icon: '👑',
      features: [
        'Безлимитные видео',
        '4K качество',
        'Все персонажи',
        'Приоритетная генерация',
        'Скачивание MP3',
        'Кастомные голоса',
        'Техподдержка 24/7'
      ],
      buttonText: 'Купить',
      popular: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    if (planId === 'free') {
      toast({
        title: '🎉 Бесплатный план активирован!',
        description: 'Создайте своё первое видео-поздравление',
      });
      navigate('/');
      return;
    }

    toast({
      title: '💳 Переход к оплате',
      description: `Оформление плана "${plans.find(p => p.id === planId)?.name}"`,
    });

    setTimeout(() => {
      toast({
        title: '✅ Оплата успешна!',
        description: 'Ваш план активирован. Приятного использования!',
      });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur text-primary-foreground shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-4xl">🎄</span>
              Новогодние Видео
            </h1>
            <Button variant="secondary" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" className="mr-2" size={16} />
              На главную
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-6xl font-bold text-primary">
            Выберите свой план
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            Создавайте неограниченное количество персонализированных поздравлений
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all hover:scale-105 ${
                plan.popular ? 'border-4 border-primary shadow-2xl' : 'border-2'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                  ПОПУЛЯРНЫЙ
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-10">
                <div className="text-6xl mb-4">{plan.icon}</div>
                <CardTitle className="text-3xl mb-2">{plan.name}</CardTitle>
                <CardDescription className="text-xl">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-primary">Бесплатно</span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold text-primary">{plan.price}₽</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </>
                  )}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary shrink-0 mt-1" size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full text-lg py-6"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={selectedPlan === plan.id}
                >
                  {selectedPlan === plan.id ? (
                    <>
                      <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                      Обработка...
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardHeader>
              <CardTitle className="text-3xl text-center">💰 Гарантии и преимущества</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">🔒</div>
                <h3 className="font-bold text-lg">Безопасная оплата</h3>
                <p className="text-sm text-muted-foreground">Защищённая обработка платежей</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">↩️</div>
                <h3 className="font-bold text-lg">Возврат средств</h3>
                <p className="text-sm text-muted-foreground">14 дней гарантии возврата</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">💬</div>
                <h3 className="font-bold text-lg">Поддержка</h3>
                <p className="text-sm text-muted-foreground">Помощь в любое время</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
