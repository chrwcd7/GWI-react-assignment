import { useEffect, useState } from 'react';
import { CatImage } from '@/interfaces/cat';

const useCatImages = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || '';

  const fetchRandomCatImages = async (
    limit: number = 10
  ): Promise<CatImage[]> => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`,
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cats');
    }

    return response.json();
  };

  const fetchCatImageById = async (id: string): Promise<CatImage | null> => {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/${id}`,
        {
          headers: {
            'x-api-key': API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch cat');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError('Failed to fetch cat');
      return null;
    }
  };

  const loadMoreCatImages = async () => {
    setLoading(true);
    try {
      const newCatImages = await fetchRandomCatImages(10);
      setCatImages((prevCatImages) => [...prevCatImages, ...newCatImages]);
    } catch (err) {
      setError('Failed to load cat images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreCatImages();
  }, []);

  return {
    catImages,
    loading,
    error,
    loadMoreCatImages,
    fetchCatImageById,
  };
};

export default useCatImages;
