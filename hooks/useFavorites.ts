import { useEffect, useState } from 'react';
import { CatImage } from '@/interfaces/cat';

export default function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const storedFavorites = localStorage.getItem('favorites');
      const ids = storedFavorites
        ? (JSON.parse(storedFavorites) as string[])
        : [];
      setFavoriteIds(ids);

      if (ids.length === 0) {
        setFavorites([]);
        return;
      }

      const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || '';
      const fetchPromises = ids.map((id) =>
        fetch(`https://api.thecatapi.com/v1/images/${id}`, {
          headers: { 'x-api-key': API_KEY },
        }).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch image ${id}`);
          return res.json();
        })
      );

      const favoriteImages = await Promise.all(fetchPromises);
      setFavorites(favoriteImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (imageId: string) => {
    try {
      setFavoriteIds((prev) => {
        const newIds = prev.filter((id) => id !== imageId);
        localStorage.setItem('favorites', JSON.stringify(newIds));
        return newIds;
      });
      setFavorites((prev) => prev.filter((image) => image.id !== imageId));
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const toggleFavorite = async (imageId: string) => {
    try {
      if (favoriteIds.includes(imageId)) {
        await removeFavorite(imageId);
      } else {
        setFavoriteIds((prev) => {
          const newIds = [...prev, imageId];
          localStorage.setItem('favorites', JSON.stringify(newIds));
          return newIds;
        });
        await fetchFavorites();
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const isFavorite = (imageId: string) => favoriteIds.includes(imageId);

  useEffect(() => {
    fetchFavorites();
  }, []);

  return {
    favorites,
    loading,
    error,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    fetchFavorites,
  };
}
