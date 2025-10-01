import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur text-primary-foreground shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-4xl">🎄</span>
            Новогодние Видео
          </h1>
          <div className="flex gap-4 items-center">
            <a href="#home" className="hover:text-secondary transition-colors">Главная</a>
            <a href="#editor" className="hover:text-secondary transition-colors">Редактор</a>
            <a href="#gallery" className="hover:text-secondary transition-colors">Галерея</a>
            <a href="#faq" className="hover:text-secondary transition-colors">FAQ</a>
            <a href="/pricing" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold">
              💎 Тарифы
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
