import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'RentalCar – Car rental service',
  description:
    'Find and rent your perfect car in just a few clicks. Wide selection, transparent pricing, convenient booking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
