import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
