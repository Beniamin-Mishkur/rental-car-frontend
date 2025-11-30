"use client";

import { useCarsStore } from '@/store/useCarsStore';

interface FavoriteButtonProps {
  carId: string;
  className?: string;
}
// Favourite Button
export default function FavoriteButton({ carId, className }: FavoriteButtonProps) {
  const favourites = useCarsStore(state => state.favorites);
  const toggleFavourite = useCarsStore(state => state.toggleFavorite);
  const isFavourite = favourites.includes(carId);

  return (
    <button
      type="button"
      onClick={() => toggleFavourite(carId)}
      className={className}
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
    >
      {isFavourite ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="var(--color-primary)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
    </button>
  );
}