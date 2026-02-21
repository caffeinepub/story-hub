import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, Library, PenTool } from 'lucide-react';
import { SiCaffeine } from 'react-icons/si';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-amber-950 dark:via-orange-950 dark:to-rose-950">
      <header className="border-b border-amber-200 dark:border-amber-800 bg-white/80 dark:bg-amber-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <BookOpen className="h-8 w-8 text-amber-700 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors" />
              <span className="font-serif text-2xl font-bold text-amber-900 dark:text-amber-100 group-hover:text-amber-800 dark:group-hover:text-amber-200 transition-colors">
                Story Hub
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Link to="/browse">
                <Button
                  variant={currentPath === '/browse' ? 'default' : 'ghost'}
                  className={
                    currentPath === '/browse'
                      ? 'bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700'
                      : 'text-amber-700 hover:text-amber-800 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-950/30'
                  }
                >
                  <Library className="mr-2 h-4 w-4" />
                  Browse
                </Button>
              </Link>
              <Link to="/create">
                <Button
                  variant={currentPath === '/create' ? 'default' : 'ghost'}
                  className={
                    currentPath === '/create'
                      ? 'bg-amber-700 hover:bg-amber-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700'
                      : 'text-amber-700 hover:text-amber-800 hover:bg-amber-50 dark:text-amber-400 dark:hover:text-amber-300 dark:hover:bg-amber-950/30'
                  }
                >
                  <PenTool className="mr-2 h-4 w-4" />
                  Create
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-amber-200 dark:border-amber-800 bg-white/80 dark:bg-amber-950/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-amber-700 dark:text-amber-300">
            <p className="flex items-center justify-center gap-2">
              © {new Date().getFullYear()} Story Hub. Built with{' '}
              <SiCaffeine className="h-4 w-4 text-amber-600 dark:text-amber-400" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'story-hub'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100 underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
