'use client';

import { useEffect, useState } from 'react';
import { CatImage } from '@/interfaces/cat';
import LoadMoreButton from './LoadMoreButton';
import CatModal from './CatModal';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import useCatImages from '@/hooks/useCatImages';

const CatGrid: React.FC = ({}) => {
  const [selectedCatImage, setSelectedCatImage] = useState<CatImage | null>(
    null
  );
  const { catImages, loadMoreCatImages, fetchCatImageById, loading, error } =
    useCatImages();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchSelectedCat = async () => {
      const imageId = searchParams.get('imageId');
      if (imageId) {
        const selectedCatImage = await fetchCatImageById(imageId);
        setSelectedCatImage(selectedCatImage);
      }
    };
    fetchSelectedCat();
  }, [searchParams]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {catImages.map((image, index) => (
          <div key={`${image.id} + ${index}`} className="relative self-center">
            <Image
              src={image.url}
              alt="Cat"
              width={image.width}
              height={image.height}
              className="w-full h-auto object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedCatImage(image)}
            />
          </div>
        ))}
        <div className="col-span-full flex justify-center mt-4">
          <LoadMoreButton onLoadMore={loadMoreCatImages} />
        </div>
      </div>

      {selectedCatImage && (
        <CatModal
          catImage={selectedCatImage}
          onClose={() => setSelectedCatImage(null)}
        />
      )}
    </>
  );
};

export default CatGrid;
