import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  icon: string;
  image: string;
}

interface Video {
  id: number;
  name: string;
  character: string;
  thumbnail: string;
  videoUrl?: string;
  video_url?: string;
}

interface VideoGalleryProps {
  videos: Video[];
  characters: Character[];
  playingVideo: number | null;
  setPlayingVideo: (id: number | null) => void;
}

const VideoGallery = ({ videos, characters, playingVideo, setPlayingVideo }: VideoGalleryProps) => {
  return (
    <section id="gallery" className="space-y-8">
      <h2 className="text-5xl font-bold text-center text-primary mb-12">
        <span className="text-5xl mr-2">🎥</span>
        Галерея готовых видео
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map(video => (
          <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              {playingVideo === video.id ? (
                <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex flex-col items-center justify-center min-h-[12rem]">
                  <audio 
                    src={video.videoUrl || video.video_url} 
                    controls 
                    autoPlay
                    className="w-full"
                    onEnded={() => setPlayingVideo(null)}
                  />
                  <div className="mt-4 text-center">
                    <div className="text-6xl mb-2">{characters.find(c => c.id === video.character)?.icon}</div>
                    <p className="text-sm text-muted-foreground">🎙️ Голосовое поздравление</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="absolute top-2 right-2"
                    onClick={() => setPlayingVideo(null)}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              ) : (
                <>
                  <img src={video.thumbnail} alt={video.name} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button 
                      size="lg" 
                      className="bg-white text-primary hover:bg-white/90"
                      onClick={() => setPlayingVideo(video.id)}
                    >
                      <Icon name="Volume2" className="mr-2" />
                      Слушать
                    </Button>
                  </div>
                </>
              )}
            </div>
            <CardContent className="pt-4 space-y-3">
              <div>
                <p className="font-semibold text-lg">Поздравление для {video.name}</p>
                <p className="text-sm text-muted-foreground">
                  {characters.find(c => c.id === video.character)?.name}
                </p>
              </div>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = video.videoUrl || video.video_url || '';
                  link.download = `pozdravlenie_${video.name}.mp3`;
                  link.click();
                }}
              >
                <Icon name="Download" className="mr-2" size={16} />
                Скачать поздравление
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default VideoGallery;
