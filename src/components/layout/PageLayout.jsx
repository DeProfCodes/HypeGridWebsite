import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-hype-navy">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}