import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppFloat } from './components/layout/WhatsAppFloat';
import { HomePage } from './pages/HomePage';
import { TourPage } from './pages/TourPage';
import { ToursPage } from './pages/ToursPage';
import { HotelsPage } from './pages/HotelsPage';
import { TrasladosPage } from './pages/TrasladosPage';
import { BodegasPage } from './pages/BodegasPage';
import { AventuraPage } from './pages/AventuraPage';
import { AlquilerAutosPage } from './pages/AlquilerAutosPage';
import { PaquetesPage } from './pages/PaquetesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPage } from './pages/AdminPage';
import { BookingSuccessPage } from './pages/BookingSuccessPage';
import { BookingCancelPage } from './pages/BookingCancelPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/hoteles" element={<HotelsPage />} />
          <Route path="/traslados" element={<TrasladosPage />} />
          <Route path="/bodegas" element={<BodegasPage />} />
          <Route path="/aventura" element={<AventuraPage />} />
          <Route path="/alquiler-autos" element={<AlquilerAutosPage />} />
          <Route path="/paquetes" element={<PaquetesPage />} />
          <Route path="/tour/:slug" element={<TourPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/booking/success" element={<BookingSuccessPage />} />
          <Route path="/booking/cancel" element={<BookingCancelPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
