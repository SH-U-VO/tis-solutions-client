// src/components/GlobalLoadingOverlay.jsx
import { useLoading } from '../context/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

const GlobalLoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/70 z-[99999999999] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default GlobalLoadingOverlay;
