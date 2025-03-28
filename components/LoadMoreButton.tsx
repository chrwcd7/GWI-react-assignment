interface LoadMoreButtonProps {
  onLoadMore: () => void;
}

const LoadMoreButton = ({ onLoadMore }: LoadMoreButtonProps) => {
  return (
    <button
      onClick={onLoadMore}
      className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Load More
    </button>
  );
};

export default LoadMoreButton;
