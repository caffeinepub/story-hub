import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

interface TextToSpeechControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  onPlayPause: () => void;
  onStop: () => void;
}

export default function TextToSpeechControls({
  isPlaying,
  isPaused,
  onPlayPause,
  onStop,
}: TextToSpeechControlsProps) {
  return (
    <Card className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          <Volume2 className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          <div className="flex gap-2">
            <Button
              onClick={onPlayPause}
              size="sm"
              className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  {isPaused ? 'Resume' : 'Play'}
                </>
              )}
            </Button>
            <Button
              onClick={onStop}
              size="sm"
              variant="outline"
              disabled={!isPlaying && !isPaused}
              className="border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/30"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop
            </Button>
          </div>
          <span className="text-sm text-amber-700 dark:text-amber-300">
            {isPlaying ? 'Playing...' : isPaused ? 'Paused' : 'Ready to listen'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
