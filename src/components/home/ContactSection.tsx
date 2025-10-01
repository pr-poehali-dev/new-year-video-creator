import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ContactSection = () => {
  return (
    <section id="contacts" className="text-center space-y-6 md:space-y-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl md:rounded-3xl p-6 md:p-12">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">
        <span className="text-3xl md:text-5xl mr-2">📧</span>
        Контакты
      </h2>
      
      <div className="space-y-4 max-w-xl mx-auto">
        <p className="text-lg md:text-xl">Есть вопросы? Свяжитесь с нами!</p>
        
        <div className="flex flex-col gap-3 md:gap-4">
          <a href="mailto:info@newyear-video.ru" className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg hover:underline break-all">
            <Icon name="Mail" size={20} className="shrink-0" />
            <span className="text-sm md:text-base">info@newyear-video.ru</span>
          </a>
          
          <a href="tel:+79991234567" className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg hover:underline">
            <Icon name="Phone" size={20} className="shrink-0" />
            +7 (999) 123-45-67
          </a>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 mt-6 md:mt-8">
          <Button variant="secondary" size="lg" className="text-base md:text-lg w-full sm:w-auto">
            <Icon name="MessageCircle" className="mr-2" size={18} />
            Telegram
          </Button>
          <Button variant="secondary" size="lg" className="text-base md:text-lg w-full sm:w-auto">
            <Icon name="Share2" className="mr-2" size={18} />
            VK
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
