import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Breed } from '@/interfaces/breed';
import { CatImage } from '@/interfaces/cat';
import CatModal from './CatModal';
import useBreeds from '@/hooks/useBreeds';

interface BreedModalProps {
  breed: Breed;
  onClose: () => void;
}

const BreedModal: React.FC<BreedModalProps> = ({ breed, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<CatImage | null>(null);
  const [breedImages, setBreedImages] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchBreedById } = useBreeds();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const loadBreedImages = async () => {
      try {
        setLoading(true);
        const { images } = await fetchBreedById(breed.id);
        setBreedImages(images);
      } catch (error) {
        console.error('Error loading breed images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBreedImages();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{breed.name}</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading images...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {breedImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square cursor-pointer group"
              >
                <Image
                  src={image.url}
                  alt={breed.name}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setSelectedImage(image)}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <CatModal
          catImage={{ ...selectedImage, breeds: [breed] }}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default BreedModal;
