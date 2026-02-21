import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Genre, Story } from '../backend';

export function useFilterStoriesByGenre(genre: Genre) {
  const { actor, isFetching } = useActor();

  return useQuery<Story[]>({
    queryKey: ['stories', 'genre', genre],
    queryFn: async () => {
      if (!actor) return [];
      return actor.filterStoriesByGenre(genre);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetStory(title: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Story>({
    queryKey: ['story', title],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getStory(title);
    },
    enabled: !!actor && !isFetching && !!title,
  });
}

export function useListAllStories() {
  const { actor, isFetching } = useActor();

  return useQuery<Story[]>({
    queryKey: ['stories', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllStories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      content,
      author,
      genre,
    }: {
      title: string;
      content: string;
      author: string;
      genre: Genre;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createStory(title, content, author, genre);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}
