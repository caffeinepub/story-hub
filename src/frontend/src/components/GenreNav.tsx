import { Genre } from '../backend';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const genreData: Array<{ value: Genre; label: string; icon: string }> = [
  { value: Genre.love, label: 'Love', icon: '/assets/generated/genre-love.dim_128x128.png' },
  { value: Genre.horror, label: 'Horror', icon: '/assets/generated/genre-horror.dim_128x128.png' },
  { value: Genre.fantasy, label: 'Fantasy', icon: '/assets/generated/genre-fantasy.dim_128x128.png' },
  { value: Genre.romance, label: 'Romance', icon: '/assets/generated/genre-romance.dim_128x128.png' },
  { value: Genre.thriller, label: 'Thriller', icon: '/assets/generated/genre-thriller.dim_128x128.png' },
  { value: Genre.scienceFiction, label: 'Sci-Fi', icon: '/assets/generated/genre-scifi.dim_128x128.png' },
  { value: Genre.historical, label: 'Historical', icon: '/assets/generated/genre-historical.dim_128x128.png' },
];

interface GenreNavProps {
  selectedGenre: Genre;
  onGenreChange: (genre: Genre) => void;
}

export default function GenreNav({ selectedGenre, onGenreChange }: GenreNavProps) {
  return (
    <Tabs value={selectedGenre} onValueChange={(value) => onGenreChange(value as Genre)}>
      <TabsList className="w-full flex-wrap h-auto gap-2 bg-white dark:bg-amber-950/30 p-2 border border-amber-200 dark:border-amber-800">
        {genreData.map((genre) => (
          <TabsTrigger
            key={genre.value}
            value={genre.value}
            className="flex items-center gap-2 data-[state=active]:bg-amber-700 data-[state=active]:text-white dark:data-[state=active]:bg-amber-600"
          >
            <img src={genre.icon} alt={genre.label} className="h-6 w-6 rounded" />
            <span>{genre.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
