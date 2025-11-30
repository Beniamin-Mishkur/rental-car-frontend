"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Car } from "@/types";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const {
    id,
    brand,
    model,
    year,
    rentalPrice,
    mileage,
    address,
    rentalCompany,
    type,
    img
  } = car;

  // форматування кілометражу
  const formattedMileage = useMemo(
    () =>
      typeof mileage === "number"
        ? mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        : "",
    [mileage]
  );

  // місто, країна (видаляємо вулицю)
  const [city, country] = (address ?? "")
    .split(",")
    .map((p) => p.trim())
    .slice(-2); // беремо тільки 2 останні значення: Місто, Країна

  const metaItems = [
    city,
    country,
    rentalCompany,
    type,
    formattedMileage && `${formattedMileage} km`
  ].filter(Boolean);

  return (
    <article className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={img}
          alt={`${brand} ${model}`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 276px"
        />
        <FavoriteButton carId={id} className={styles.favorite} />
      </div>

      {/* Title */}
      <div className={styles.topRow}>
        <h3 className={styles.title}>
          {brand} <span className={styles.model}>{model}</span>, {year}
        </h3>
        <span className={styles.price}>${rentalPrice}</span>
      </div>

      {/* Meta info */}
      <ul className={styles.meta}>
        {metaItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {/* Read more */}
      <Link href={`/catalog/${id}`} className={styles.readMore}>
        Read more
      </Link>
    </article>
  );
}
