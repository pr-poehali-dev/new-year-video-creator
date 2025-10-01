import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  icon: string;
  image: string;
}

interface Greeting {
  id: string;
  name: string;
  text: string;
}

interface VideoEditorProps {
  characters: Character[];
  greetings: Greeting[];
  selectedCharacter: string;
  setSelectedCharacter: (id: string) => void;
  selectedGreeting: string;
  setSelectedGreeting: (id: string) => void;
  childName: string;
  setChildName: (name: string) => void;
  isGenerating: boolean;
  handleCreateVideo: () => void;
}

const VideoEditor = ({
  characters,
  greetings,
  selectedCharacter,
  setSelectedCharacter,
  selectedGreeting,
  setSelectedGreeting,
  childName,
  setChildName,
  isGenerating,
  handleCreateVideo
}: VideoEditorProps) => {
  return (
    <section id="editor" className="space-y-6 md:space-y-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-8 md:mb-12 px-2">
        <span className="text-4xl md:text-5xl mr-2">🎬</span>
        Редактор Видео
      </h2>
      
      <Tabs defaultValue="character" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="character" className="text-sm md:text-lg py-3 md:py-4 flex-col md:flex-row gap-1 md:gap-2">
            <Icon name="Users" className="md:mr-2" size={18} />
            <span className="hidden sm:inline">Персонаж</span>
            <span className="sm:hidden text-xs">Герой</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="text-sm md:text-lg py-3 md:py-4 flex-col md:flex-row gap-1 md:gap-2">
            <Icon name="Music" className="md:mr-2" size={18} />
            <span>Музыка</span>
          </TabsTrigger>
          <TabsTrigger value="effects" className="text-sm md:text-lg py-3 md:py-4 flex-col md:flex-row gap-1 md:gap-2">
            <Icon name="Sparkles" className="md:mr-2" size={18} />
            <span>Эффекты</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="character" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Выберите персонажа</CardTitle>
              <CardDescription>Кто будет поздравлять?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    <CardContent className="pt-4 md:pt-6 text-center space-y-2 md:space-y-3">
                      <div className="text-5xl md:text-6xl">{char.icon}</div>
                      <img src={char.image} alt={char.name} className="w-full h-28 md:h-32 object-cover rounded-lg" />
                      <p className="font-semibold text-base md:text-lg">{char.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Label htmlFor="greeting" className="text-base md:text-lg">Тип поздравления</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      <CardContent className="py-3 md:py-4">
                        <p className="font-semibold text-sm md:text-base">{greeting.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="childName" className="text-base md:text-lg">Имя ребенка</Label>
                <Input 
                  id="childName"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Введите имя..."
                  className="text-base md:text-lg py-4 md:py-6"
                />
              </div>

              {childName && selectedGreeting && (
                <Card className="bg-accent/30">
                  <CardContent className="pt-4 md:pt-6">
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Предпросмотр текста:</p>
                    <p className="italic text-sm md:text-base">"{greetings.find(g => g.id === selectedGreeting)?.text.replace('{name}', childName)}"</p>
                  </CardContent>
                </Card>
              )}

              <Button 
                onClick={handleCreateVideo}
                className="w-full text-base md:text-lg py-5 md:py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={!childName.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    <span className="text-sm md:text-base">🎙️ Создаю поздравление...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Wand2" className="mr-2" size={20} />
                    <span className="text-sm md:text-base">🎤 Создать поздравление</span>
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
  );
};

export default VideoEditor;