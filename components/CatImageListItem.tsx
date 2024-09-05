import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import axios from 'axios';
import { theme } from '../theme';

interface CatImageListItemProps {
  item: CatImage;
  onFavorite: (id: string, favorite: boolean) => void;
  onVote: (id: string, vote: 'up' | 'down') => void;
}

interface CatImage {
  id: string;
  url: string;
  favourite: boolean;
}

const API_KEY = 'DEMO-API-KEY';
const API_URL = 'https://api.thecatapi.com/v1';

const CatImageListItem: React.FC<CatImageListItemProps> = ({ item, onFavorite, onVote }) => {
  const [score, setScore] = useState<number>(0);

  const fetchScore = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/votes?image_id=${item.id}`, {
        headers: {
          'x-api-key': API_KEY,
        },
      });
      const votes = response.data;
      const totalScore = votes.reduce((acc: number, vote: any) => acc + vote.value, 0);
      setScore(totalScore);
    } catch (error) {
      console.error('Error fetching score:', error);
    }
  }, [item.id]);

  useEffect(() => {
    fetchScore();
  }, [fetchScore]);

  const handleVote = useCallback((voteType: 'up' | 'down') => {
    onVote(item.id, voteType);
    setScore(prevScore => prevScore + (voteType === 'up' ? 1 : -1));
  }, [item.id, onVote]);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.url }} style={styles.image} />
        <IconButton
          icon="heart"
          onPress={() => onFavorite(item.id, !item.favourite)}
          size={20}
          iconColor={item.favourite ? theme.colors.primary : theme.colors.background}
          style={styles.favoriteButton}
        />
      </View>
      <View style={styles.voteContainer}>
        <IconButton
          icon="thumb-up"
          onPress={() => handleVote('up')}
          size={20}
        />
        <Text style={styles.scoreText}>{score}</Text>
        <IconButton
          icon="thumb-down"
          onPress={() => handleVote('down')}
          size={20}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: theme.spacing.m,
    gap: theme.spacing.m,
    width: '48%',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  voteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing.s,
    backgroundColor: theme.colors.lightGray,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CatImageListItem;
