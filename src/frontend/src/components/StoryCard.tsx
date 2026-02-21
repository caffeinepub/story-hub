import { useNavigate } from '@tanstack/react-router';
import { Story } from '../backend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, User, Calendar } from 'lucide-react';

const genreLabels: Record<string, string> = {
  love: 'Love',
  horror: 'Horror',
  fantasy: 'Fantasy',
  romance: 'Romance',
  thriller: 'Thriller',
  scienceFiction: 'Science Fiction',
  historical: 'Historical',
};

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const navigate = useNavigate();
  const creationDate = new Date(Number(story.creationDate) / 1000000);

  const handleClick = () => {
    navigate({ to: '/story/$title', params: { title: encodeURIComponent(story.title) } });
  };

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-amber-200 dark:border-amber-800 bg-white dark:bg-amber-950/30"
      onClick={handleClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
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
              AI
            </Badge>
          )}
        </div>
        <CardTitle className="font-serif text-2xl text-amber-900 dark:text-amber-100 line-clamp-2">
          {story.title}
        </CardTitle>
        <CardDescription className="text-amber-600 dark:text-amber-400">
          <div className="flex items-center gap-2 mt-2">
            <User className="h-3 w-3" />
            <span>{story.author}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="h-3 w-3" />
            <span>{creationDate.toLocaleDateString()}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-amber-700 dark:text-amber-300 line-clamp-3 font-serif">
          {story.content}
        </p>
      </CardContent>
    </Card>
  );
}
