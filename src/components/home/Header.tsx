import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur text-primary-foreground shadow-lg">
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-1 md:gap-2">
            <span className="text-3xl md:text-4xl">🎄</span>
            <span className="hidden sm:inline">Новогодние Видео</span>
            <span className="sm:hidden">НГ Видео</span>
          </h1>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>

          <div className="hidden md:flex gap-3 lg:gap-4 items-center text-sm lg:text-base">
            <a href="#home" className="hover:text-secondary transition-colors">Главная</a>
            <a href="#editor" className="hover:text-secondary transition-colors">Редактор</a>
            <a href="#examples" className="hover:text-secondary transition-colors">Примеры</a>
            <a href="#faq" className="hover:text-secondary transition-colors">FAQ</a>
            <a href="/pricing" className="bg-secondary text-secondary-foreground px-3 lg:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold">
              💎 Тарифы
            </a>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-primary-foreground/20 pt-4">
            <a 
              href="#home" 
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Главная
            </a>
            <a 
              href="#editor" 
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Редактор
            </a>
            <a 
              href="#examples" 
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Примеры
            </a>
            <a 
              href="#faq" 
              className="block py-2 hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <a href="/pricing" className="block">
              <Button className="w-full bg-secondary text-secondary-foreground hover:opacity-90">
                💎 Тарифы
              </Button>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
