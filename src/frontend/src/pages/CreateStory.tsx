import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Genre } from '../backend';
import { useCreateStory } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PenTool } from 'lucide-react';
import { toast } from 'sonner';

const genreLabels: Record<Genre, string> = {
  [Genre.love]: 'Love',
  [Genre.horror]: 'Horror',
  [Genre.fantasy]: 'Fantasy',
  [Genre.romance]: 'Romance',
  [Genre.thriller]: 'Thriller',
  [Genre.scienceFiction]: 'Science Fiction',
  [Genre.historical]: 'Historical',
};

export default function CreateStory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState<Genre>(Genre.fantasy);

  const createStoryMutation = useCreateStory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !author.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await createStoryMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        genre,
      });
      toast.success('Story published successfully!');
      navigate({ to: '/browse' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create story');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-4">
          Create Your Story
        </h1>
        <p className="text-lg text-amber-700 dark:text-amber-300">
          Share your creativity with the world
        </p>
      </div>

      <Card className="border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="font-serif text-2xl text-amber-900 dark:text-amber-100">
            <PenTool className="inline-block mr-2 h-6 w-6" />
            Story Details
          </CardTitle>
          <CardDescription className="text-amber-600 dark:text-amber-400">
            Fill in the details below to publish your story
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-amber-900 dark:text-amber-100">
                Story Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title"
                className="border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-amber-900 dark:text-amber-100">
                Author Name
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre" className="text-amber-900 dark:text-amber-100">
                Genre
              </Label>
              <Select value={genre} onValueChange={(value) => setGenre(value as Genre)}>
                <SelectTrigger className="border-amber-300 dark:border-amber-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(genreLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-amber-900 dark:text-amber-100">
                Story Content
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your story here..."
                className="min-h-[300px] border-amber-300 dark:border-amber-700 focus:border-amber-500 dark:focus:border-amber-500 font-serif"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={createStoryMutation.isPending}
                className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
              >
                {createStoryMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  'Publish Story'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: '/browse' })}
                className="border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/30"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
