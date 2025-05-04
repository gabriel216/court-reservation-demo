import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CourtDetails } from './pages/CourtDetails';
import { PaymentPage } from './pages/PaymentPage';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { ScrollToTop } from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/court-reservation-demo">
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/court/:id" element={<CourtDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;