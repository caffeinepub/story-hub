import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetStory } from '../hooks/useQueries';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import TextToSpeechControls from '../components/TextToSpeechControls';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Loader2, Sparkles, User } from 'lucide-react';

const genreLabels: Record<string, string> = {
  love: 'Love',
  horror: 'Horror',
  fantasy: 'Fantasy',
  romance: 'Romance',
  thriller: 'Thriller',
  scienceFiction: 'Science Fiction',
  historical: 'Historical',
};

export default function ReadStory() {
  const { title } = useParams({ from: '/story/$title' });
  const navigate = useNavigate();
  const { data: story, isLoading, error } = useGetStory(decodeURIComponent(title));
  const { play, pause, stop, isPlaying, isPaused } = useTextToSpeech();

  const handlePlayPause = () => {
    if (!story) return;

    if (isPlaying) {
      pause();
    } else if (isPaused) {
      play(story.content, true); // resume
    } else {
      play(story.content);
    }
  };

  const handleStop = () => {
    stop();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-2xl text-amber-900 dark:text-amber-100 mb-4">
          Story not found
        </h2>
        <Button
          onClick={() => navigate({ to: '/browse' })}
          className="bg-amber-700 hover:bg-amber-800 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </Button>
      </div>
    );
  }

  const creationDate = new Date(Number(story.creationDate) / 1000000);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/browse' })}
        className="mb-6 text-amber-700 hover:text-amber-800 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-950/30"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Button>

      <Card className="border-amber-200 dark:border-amber-800 mb-6">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
              >
                {genreLabels[story.genre] || story.genre}
              </Badge>
              {story.isAIGenerated && (
                <Badge
                  variant="outline"
                  className="border-amber-400 text-amber-700 dark:border-amber-600 dark:text-amber-400"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  AI Generated
                </Badge>
              )}
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
              {story.title}
            </h1>
            <div className="flex items-center gap-4 text-amber-700 dark:text-amber-300">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{story.author}</span>
              </div>
              <span>•</span>
              <span>{creationDate.toLocaleDateString()}</span>
            </div>
          </div>

          <TextToSpeechControls
            isPlaying={isPlaying}
            isPaused={isPaused}
            onPlayPause={handlePlayPause}
            onStop={handleStop}
          />
        </CardContent>
      </Card>

      <Card className="border-amber-200 dark:border-amber-800">
        <CardContent className="pt-6">
          <div className="prose prose-amber dark:prose-invert max-w-none">
            <p className="font-serif text-lg leading-relaxed text-amber-900 dark:text-amber-100 whitespace-pre-wrap">
              {story.content}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
