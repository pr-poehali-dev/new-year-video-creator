import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
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
  );
};

export default FAQ;
