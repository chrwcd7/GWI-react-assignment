import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  imageId: string;
}

const FavoriteButton = ({ imageId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(imageId);

  return (
    <button
      onClick={() => toggleFavorite(imageId)}
      className={`cursor-pointer p-2 rounded text-white transition-colors ${
        favorite
          ? 'bg-red-500 hover:bg-red-600'
          : 'bg-green-500 hover:bg-green-400'
      }`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;
