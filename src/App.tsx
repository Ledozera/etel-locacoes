import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import HomePage from './pages/HomePage';
import EquipmentsPage from './pages/EquipmentsPage';
import FleetPage from './pages/FleetPage';
import ContactPage from './pages/ContactPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';
import CareersPage from './pages/CareersPage';

export default function App() {
  return (
    <Router>
      <PageTransition />
      <div className="min-h-screen bg-[color:var(--surface)] text-[color:var(--on-surface)] selection:bg-[color:var(--primary-container)] selection:text-[color:var(--on-primary)] font-body">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/equipamentos" element={<EquipmentsPage />} />
          <Route path="/frota" element={<FleetPage />} />
          <Route path="/frota/:id" element={<VehicleDetailsPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/termos" element={<TermsOfUsePage />} />
          <Route path="/privacidade" element={<PrivacyPolicyPage />} />
          <Route path="/trabalhe-conosco" element={<CareersPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}
