import { useEffect, useState } from 'react';
import { Breed } from '@/interfaces/breed';

const useBreeds = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || '';

  const fetchBreeds = async (): Promise<Breed[]> => {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }

    return response.json();
  };

  const fetchBreedById = async (breedId: string) => {
    try {
      const [breedResponse, imagesResponse] = await Promise.all([
        fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, {
          headers: { 'x-api-key': API_KEY },
        }),
        fetch(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=12`,
          {
            headers: { 'x-api-key': API_KEY },
          }
        ),
      ]);

      if (!breedResponse.ok) {
        throw new Error(`Failed to fetch breed: ${breedResponse.statusText}`);
      }

      if (!imagesResponse.ok) {
        throw new Error(`Failed to fetch images: ${imagesResponse.statusText}`);
      }

      const breed = await breedResponse.json();
      const images = await imagesResponse.json();

      return { breed, images };
    } catch (error) {
      console.error('Error fetching breed:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const data = await fetchBreeds();
        setBreeds(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load breeds');
      } finally {
        setLoading(false);
      }
    };

    loadBreeds();
  }, []);

  return {
    breeds,
    loading,
    error,
    fetchBreedById,
  };
};

export default useBreeds;
