"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCarsStore } from "@/store/useCarsStore";
import styles from "./FilterPanel.module.css";

const priceOptions = [30, 40, 50, 60, 70, 80, 90, 100];

export default function FilterPanel() {
  const { filters, setFilters, fetchCars } = useCarsStore();
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    async function loadBrands() {
      try {
        const res = await axios.get<string[]>(
          "https://car-rental-api.goit.global/brands"
        );
        setBrands(res.data);
      } catch (error) {
        console.error("Failed to load brands", error);
      }
    }
    loadBrands();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetchCars(true);
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      {/* ========== BRAND ========== */}
      <div className={styles.field}>
        <span className={styles.labelCaption}>Car brand</span>

        <div className={`${styles.selectWrapper} ${styles.selectBrand}`}>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ brand: e.target.value })}
          >
            <option value="">Choose a brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ========== PRICE ========== */}
      <div className={styles.field}>
        <span className={styles.labelCaption}>Price / 1 hour</span>

        <div className={`${styles.selectWrapper} ${styles.selectPrice}`}>
          <select
            value={filters.rentalPrice}
            onChange={(e) => setFilters({ rentalPrice: e.target.value })}
          >
            <option value="">Choose a price</option>
            {priceOptions.map((price) => (
              <option key={price} value={String(price)}>
                Up to ${price}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ========== MILEAGE ========== */}
      <div className={styles.field}>
        <span className={styles.labelCaption}>Car mileage / km</span>

        <div className={styles.mileageWrapper}>
          <label className={styles.mileageInput}>
            From
            <input
              type="number"
              value={filters.minMileage}
              onChange={(e) => setFilters({ minMileage: e.target.value })}
            />
          </label>

          <label className={styles.mileageInput}>
            To
            <input
              type="number"
              value={filters.maxMileage}
              onChange={(e) => setFilters({ maxMileage: e.target.value })}
            />
          </label>
        </div>
      </div>

      {/* ========== SEARCH BUTTON ========== */}
      <button type="submit" className={styles.searchBtn}>
        Search
      </button>
    </form>
  );
}
