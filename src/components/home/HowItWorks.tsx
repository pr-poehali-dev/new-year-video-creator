import Icon from '@/components/ui/icon';

const HowItWorks = () => {
  const steps = [
    { step: '1', icon: 'UserPlus', title: 'Выберите персонажа', desc: 'Дед Мороз, Снегурочка или Снеговик' },
    { step: '2', icon: 'PenTool', title: 'Укажите имя', desc: 'Введите имя ребенка' },
    { step: '3', icon: 'Palette', title: 'Настройте эффекты', desc: 'Музыка, снег, блестки' },
    { step: '4', icon: 'Download', title: 'Скачайте видео', desc: 'Готово! Делитесь радостью' },
  ];

  return (
    <section id="how" className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 space-y-8">
      <h2 className="text-5xl font-bold text-center text-primary mb-12">
        Как создать видео?
      </h2>
      
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((item, i) => (
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
  );
};

export default HowItWorks;
