import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Car } from '@/types';

export interface FilterState {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CarsState {
  cars: Car[];
  favorites: string[];
  page: number;
  limit: number;
  filters: FilterState;
  loading: boolean;
  hasMore: boolean;
  fetchCars: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  setFilters: (filters: Partial<FilterState>) => void;
  toggleFavorite: (id: string) => void;
}

// Create Zustand store with persistence for the favourites list.
export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      favorites: [],
      page: 1,
      limit: 8,
      filters: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' },
      loading: false,
      hasMore: true,
      async fetchCars(reset = true) {
        const { filters, limit } = get();
        const page = reset ? 1 : get().page;
        try {
          set({ loading: true });
          // Build query parameters based on active filters
          const params: Record<string, string> = {};
          if (filters.brand) params.brand = filters.brand;
          if (filters.rentalPrice) params.rentalPrice = filters.rentalPrice;
          if (filters.minMileage) params.minMileage = filters.minMileage;
          if (filters.maxMileage) params.maxMileage = filters.maxMileage;
          params.page = page.toString();
          params.limit = limit.toString();
          // Perform request
          const response = await axios.get('https://car-rental-api.goit.global/cars', { params });
          // The API returns an array of cars; total pages is not provided
          const cars: Car[] = response.data.cars ?? response.data;
          if (reset) {
            set({ cars, page: 1, hasMore: cars.length === limit });
          } else {
            set(state => ({
              cars: [...state.cars, ...cars],
              hasMore: cars.length === limit,
            }));
          }
        } catch (error) {
          console.error('Error fetching cars:', error);
        } finally {
          set({ loading: false });
        }
      },
      async loadMore() {
        const { hasMore } = get();
        if (!hasMore) return;
        set(state => ({ page: state.page + 1 }));
        await get().fetchCars(false);
      },
      setFilters(partial) {
        set(state => ({ filters: { ...state.filters, ...partial } }));
      },
      toggleFavorite(id) {
        set(state => {
          const isFav = state.favorites.includes(id);
          const favorites = isFav
            ? state.favorites.filter(fid => fid !== id)
            : [...state.favorites, id];
          return { favorites };
        });
      },
    }),
    {
      name: 'rentalcar-store',
      // Only persist favourites; other state resets between sessions
      partialize: state => ({ favorites: state.favorites }),
    }
  )
);