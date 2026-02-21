import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import BrowseStories from './pages/BrowseStories';
import CreateStory from './pages/CreateStory';
import ReadStory from './pages/ReadStory';
import Home from './pages/Home';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const browseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/browse',
  component: BrowseStories,
});

const createRoute_ = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create',
  component: CreateStory,
});

const readRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/story/$title',
  component: ReadStory,
});

const routeTree = rootRoute.addChildren([indexRoute, browseRoute, createRoute_, readRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
