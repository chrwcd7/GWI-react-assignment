'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useBreeds from '@/hooks/useBreeds';
import { Breed } from '@/interfaces/breed';
import BreedModal from './BreedModal';

export default function BreedGrid() {
  const { breeds, loading, error, fetchBreedById } = useBreeds();
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSelectedBreed = async () => {
      const breedId = searchParams.get('breedId');
      if (breedId) {
        try {
          const { breed } = await fetchBreedById(breedId);
          setSelectedBreed(breed);
        } catch (error) {
          console.error('Error fetching breed:', error);
        }
      }
    };

    fetchSelectedBreed();
  }, [searchParams, fetchBreedById]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {breeds.map((breed) => (
            <li
              key={breed.id}
              className="border rounded-lg p-4 cursor-pointer text-blue-500 hover:text-blue-700 hover:underline"
              onClick={() => setSelectedBreed(breed)}
            >
              <h2 className="text-xl font-semibold">{breed.name}</h2>
              <p className="mb-4 text-gray-600 line-clamp-3">
                {breed.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {selectedBreed && (
        <BreedModal
          breed={selectedBreed}
          onClose={() => setSelectedBreed(null)}
        />
      )}
    </>
  );
}
