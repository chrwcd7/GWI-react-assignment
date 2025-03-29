'use client';

import Image from 'next/image';
import useFavorites from '@/hooks/useFavorites';

export default function FavoriteGrid() {
  const { favorites, loading, error, toggleFavorite, removeFavorite } =
    useFavorites();

  if (loading) {
    return <div className="text-center p-4">Loading favorites...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600">No favorite images yet.</p>
        <p className="text-sm text-gray-500 mt-2">
          Click the 'Add to favorites' button on any cat image to add it to your
          favorites.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Your Favorite Cats</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((image) => (
            <div key={image.id} className="relative aspect-square group">
              <Image
                src={image.url}
                alt="Favorite cat"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={(e) => {
                  removeFavorite(image.id);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                aria-label="Remove from favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
