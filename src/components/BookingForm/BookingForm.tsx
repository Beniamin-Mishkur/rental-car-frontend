"use client";

import { useState } from 'react';
import type { Car } from '@/types';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  car: Car;
}

export default function BookingForm({ car }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <input
          id="date"
          name="date"
          type="date"
          placeholder="Booking date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Send
      </button>

      {submitted && (
        <p className={styles.success}>
          Thank you! Your booking request for {car.brand} {car.model} has been
          sent. We will contact you shortly.
        </p>
      )}
    </form>
  );
}
