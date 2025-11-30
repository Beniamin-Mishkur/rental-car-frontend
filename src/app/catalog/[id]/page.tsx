import Image from "next/image";
import BookingForm from "@/components/BookingForm/BookingForm";
import type { Car } from "@/types";
import styles from "./page.module.css";

interface CarDetailPageProps {
  params: { id: string };
}

async function getCar(id: string): Promise<Car> {
  const res = await fetch(`https://car-rental-api.goit.global/cars/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch car details");
  }
  const car: Car = await res.json();
  return car;
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const car = await getCar(params.id);

  const formattedMileage =
    typeof car.mileage === "number"
      ? car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
      : "";

  const [city, country] = (car.address ?? "").split(",").map((p) => p.trim());

  return (
    <main className={styles.page}>
      <div className={styles.topRow}>
        {/* Left column: image + booking form card */}
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>

          <section className={styles.formCard}>
            <h2 className={styles.formTitle}>Book your car now</h2>
            <p className={styles.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>
            <BookingForm car={car} />
          </section>
        </div>

        {/* Right column: text details with icons */}
        <div className={styles.rightColumn}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
              {car.year}
              <span className={styles.id}>Id: {car.id}</span>
            </h1>

            <div className={styles.locationRow}>
              <div className={styles.location}>
                <span
                  className={`${styles.icon} ${styles.iconLocation}`}
                />
                <span>
                  {city && country ? `${city}, ${country}` : car.address}
                </span>
              </div>
              {formattedMileage && (
                <span className={styles.mileage}>
                  Mileage:{" "}
                  <span className={styles.mileageValue}>
                    {formattedMileage} km
                  </span>
                </span>
              )}
            </div>

            <div className={styles.price}>${car.rentalPrice}</div>
          </header>

          <p className={styles.description}>{car.description}</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Rental conditions:</h2>
            <ul className={styles.iconList}>
              <li>
                <span className={`${styles.icon} ${styles.iconCheck}`} />
                <span>Minimum age : 25</span>
              </li>
              <li>
                <span className={`${styles.icon} ${styles.iconCheck}`} />
                <span>Security depostie required</span>
              </li>
              <li>
                <span className={`${styles.icon} ${styles.iconCheck}`} />
                <span>Valid driver&apos;s license</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Car specifications:</h2>
            <ul className={styles.iconList}>
              <li>
                <span
                  className={`${styles.icon} ${styles.iconCalendar}`}
                />
                <span>Year: {car.year}</span>
              </li>
              <li>
                <span className={`${styles.icon} ${styles.iconCar}`} />
                <span>Type: {car.type}</span>
              </li>
              {car.fuelConsumption && (
                <li>
                  <span className={`${styles.icon} ${styles.iconFuel}`} />
                  <span>Fuel Consumption: {car.fuelConsumption}</span>
                </li>
              )}
              {car.engineSize && (
                <li>
                  <span className={`${styles.icon} ${styles.iconGear}`} />
                  <span>Engine Size: {car.engineSize}</span>
                </li>
              )}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Accessories and functionalities:
            </h2>
            <ul className={styles.iconList}>
              {car.accessories.map((acc, idx) => (
                <li key={acc + idx}>
                  <span className={`${styles.icon} ${styles.iconCheck}`} />
                  <span>{acc}</span>
                </li>
              ))}
              {car.functionalities.map((func, idx) => (
                <li key={`func-${idx}`}>
                  <span className={`${styles.icon} ${styles.iconCheck}`} />
                  <span>{func}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
