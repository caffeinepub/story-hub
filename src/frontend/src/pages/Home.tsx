import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, PenTool, Library } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-rose-950/20" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-amber-900 dark:text-amber-100 leading-tight">
                Story Hub
              </h1>
              <p className="text-xl md:text-2xl text-amber-800 dark:text-amber-200 font-light">
                Where stories come alive through words and voice
              </p>
              <p className="text-lg text-amber-700 dark:text-amber-300">
                Discover AI-generated tales across seven captivating genres, create your own stories, and listen as they're brought to life with text-to-speech.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/browse' })}
                  className="bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700"
                >
                  <Library className="mr-2 h-5 w-5" />
                  Browse Stories
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate({ to: '/create' })}
                  className="border-amber-700 text-amber-700 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/30"
                >
                  <PenTool className="mr-2 h-5 w-5" />
                  Create Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-books.dim_1200x600.png"
                alt="Books and stories"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-amber-900 dark:text-amber-100 mb-12">
          Explore the World of Stories
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white dark:bg-amber-950/30 rounded-xl p-8 shadow-lg border border-amber-200 dark:border-amber-800">
            <div className="bg-amber-100 dark:bg-amber-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Library className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-3">
              Seven Genres
            </h3>
            <p className="text-amber-700 dark:text-amber-300">
              Explore stories across Love, Horror, Fantasy, Romance, Thriller, Science Fiction, and Historical genres.
            </p>
          </div>
          <div className="bg-white dark:bg-amber-950/30 rounded-xl p-8 shadow-lg border border-amber-200 dark:border-amber-800">
            <div className="bg-amber-100 dark:bg-amber-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <PenTool className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-3">
              Create & Publish
            </h3>
            <p className="text-amber-700 dark:text-amber-300">
              Write your own stories and share them with the community. Your creativity has no limits.
            </p>
          </div>
          <div className="bg-white dark:bg-amber-950/30 rounded-xl p-8 shadow-lg border border-amber-200 dark:border-amber-800">
            <div className="bg-amber-100 dark:bg-amber-900/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 mb-3">
              Listen Aloud
            </h3>
            <p className="text-amber-700 dark:text-amber-300">
              Every story can be read aloud with AI-powered text-to-speech. Close your eyes and listen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
