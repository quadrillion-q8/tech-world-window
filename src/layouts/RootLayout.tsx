import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function RootLayout() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content"><Outlet /></main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
