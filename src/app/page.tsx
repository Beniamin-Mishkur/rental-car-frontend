import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <Image
          src="/images/hero.jpg"
          alt="Sport car driving on the highway"
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.overlay}>
          <h1 className={styles.title}>Find your perfect rental car</h1>
          <p className={styles.subtitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link href="/catalog" className={styles.heroBtn}>
            View Catalog
          </Link>
        </div>
      </section>
    </main>
  );
}
