import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useInfiniteQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Text } from 'react-native-paper';
import axios from 'axios';
import { theme } from '../theme';
import CatImageListItem from './CatImageListItem';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[];
  favourite: boolean;
}

const API_KEY = 'DEMO-API-KEY';
const API_URL = 'https://api.thecatapi.com/v1';

const fetchCatImages = async ({ pageParam = 1 }: { pageParam: number }) => {
  const response = await axios.get<CatImage[]>(`${API_URL}/images/search`, {
    params: {
      limit: 10,
      page: pageParam,
      order: 'DESC',
    },
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
  });
  
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }

  return response.data;
};

const CatImageList: React.FC = () => {
  const [numColumns] = useState(2);
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<CatImage[]>({
    queryKey: ['catImages'],
    queryFn: ({ pageParam = 1 }) => fetchCatImages({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => lastPage.length === 10 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const handleFavorite = useCallback(async (id: string, favorite: boolean) => {
    try {
      const url = `${API_URL}/favourites`;
      const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      };

      if (favorite) {
        await axios.post(url, { image_id: id }, { headers });
      } else {
        const favorites = await axios.get(`${url}?image_id=${id}`, { headers });
        if (favorites.data.length > 0) {
          const favoriteId = favorites.data[0].id;
          await axios.delete(`${url}/${favoriteId}`, { headers });
        }
      }

      queryClient.setQueryData(['catImages'], (oldData: any) => ({
        ...oldData,
        pages: oldData.pages.map((page: CatImage[]) =>
          page.map((cat) =>
            cat.id === id ? { ...cat, favourite: favorite } : cat
          )
        ),
      }));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  }, [queryClient]);

  const voteMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: number }) => {
      const response = await axios.post(
        `${API_URL}/votes`,
        { image_id: id, value },
        { headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catImages'] });
    },
  });

  const handleVote = useCallback((id: string, vote: 'up' | 'down') => {
    voteMutation.mutate({ id, value: vote === 'up' ? 1 : -1 });
  }, [voteMutation]);

  const renderItem = useCallback(({ item }: { item: CatImage }) => (
    <CatImageListItem
      item={item}
      onFavorite={handleFavorite}
      onVote={handleVote}
    />
  ), [handleFavorite, handleVote]);

  const flatListData = useMemo(() => data?.pages.flat() ?? [], [data]);

  if (status === 'pending') return <Text>Loading...</Text>;
  if (status === 'error') return <Text>Error fetching cat images</Text>;

  return (
    <FlatList
      data={flatListData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null}
      numColumns={numColumns}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    gap: theme.spacing.m,
  },
  listContainer: {
    padding: theme.spacing.m,
  },
});

export default CatImageList;
