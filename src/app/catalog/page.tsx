"use client";

import { useEffect } from 'react';
import CarCard from '@/components/CarCard/CarCard';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import { useCarsStore } from '@/store/useCarsStore';
import styles from './page.module.css';

export default function CatalogPage() {
  const { cars, fetchCars, loading, hasMore, loadMore } = useCarsStore();

  useEffect(() => {
    fetchCars(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.catalogPage}>
      <section className={styles.filtersSection}>
        <FilterPanel />
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        {cars.length === 0 && !loading && (
          <p className={styles.empty}>Nothing found. Try adjusting filters.</p>
        )}

        {loading && <p className={styles.loader}>Loading...</p>}

        {!loading && hasMore && (
          <button type="button" className={styles.loadMore} onClick={loadMore}>
            Load more
          </button>
        )}
      </section>
    </main>
  );
}
