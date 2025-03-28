import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FavoriteButton from './FavoriteButton';
import { CatImage } from '@/interfaces/cat';

interface CatModalProps {
  catImage: CatImage;
  onClose: () => void;
}

const CatModal: React.FC<CatModalProps> = ({ catImage, onClose }) => {
  const router = useRouter();
  const { id: imageId, url: imageUrl, breeds } = catImage || {};

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    router.push(`/?imageId=${imageId}`);

    return () => {
      document.body.style.overflow = 'unset';
      router.push(window.location.pathname);
    };
  }, [imageId, router]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?imageId=${imageId}`;
    navigator.clipboard.writeText(url);
  };

  if (!imageId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cat Image</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square mb-6">
            <Image
              src={imageUrl}
              alt="Cat"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          {breeds?.[0] && (
            <div className="w-full mb-6">
              <h3 className="text-lg font-semibold mb-2">Breed Information</h3>
              <Link
                href={`/breeds?breedId=${breeds[0].id}`}
                className="text-blue-500 hover:text-blue-700 hover:underline block mb-2"
              >
                {breeds[0].name}
              </Link>
              <p className="text-gray-600">{breeds[0].description}</p>
            </div>
          )}

          <div className="flex gap-4 mb-4">
            <FavoriteButton imageId={imageId} />
            <button
              onClick={handleCopyLink}
              className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Copy Share Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatModal;
