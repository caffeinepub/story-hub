import { useState } from 'react';
import { Genre } from '../backend';
import { useFilterStoriesByGenre } from '../hooks/useQueries';
import GenreNav from '../components/GenreNav';
import StoryCard from '../components/StoryCard';
import { Loader2 } from 'lucide-react';

export default function BrowseStories() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(Genre.love);
  const { data: stories, isLoading } = useFilterStoriesByGenre(selectedGenre);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
          Browse Stories
        </h1>
        <p className="text-lg text-amber-700 dark:text-amber-300">
          Explore stories across different genres
        </p>
      </div>

      <GenreNav selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} />

      <div className="mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-amber-700" />
          </div>
        ) : stories && stories.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.title} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-amber-600 dark:text-amber-400">
              No stories found in this genre yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
