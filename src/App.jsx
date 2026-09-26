import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { FarmerLayout } from './layouts/FarmerLayout';
import { OfficerLayout } from './layouts/OfficerLayout';

// Landing & Auth Pages
import { LandingPage } from './pages/LandingPage';
import { FarmerLogin } from './pages/farmer/FarmerLogin';
import { OfficerLogin } from './pages/officer/OfficerLogin';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { SubmitClaim } from './pages/farmer/SubmitClaim';
import { MyClaims } from './pages/farmer/MyClaims';
import { ClaimDetails } from './pages/farmer/ClaimDetails';
import { ClaimStatusTrack } from './pages/farmer/ClaimStatusTrack';
import { SatelliteEvidence } from './pages/farmer/SatelliteEvidence';
import { FarmerNotifications } from './pages/farmer/FarmerNotifications';
import { FarmerProfile } from './pages/farmer/FarmerProfile';
import { FarmerHelp } from './pages/farmer/FarmerHelp';

// Officer Pages
import { OfficerDashboard } from './pages/officer/OfficerDashboard';
import { OfficerAllClaims } from './pages/officer/OfficerAllClaims';
import { OfficerClaimReview } from './pages/officer/OfficerClaimReview';
import { OfficerSatelliteReview } from './pages/officer/OfficerSatelliteReview';
import { OfficerDamageAssessment } from './pages/officer/OfficerDamageAssessment';
import { OfficerReports } from './pages/officer/OfficerReports';
import { OfficerFarmers } from './pages/officer/OfficerFarmers';
import { OfficerAnalytics } from './pages/officer/OfficerAnalytics';
import { OfficerProfile } from './pages/officer/OfficerProfile';

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Login Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/farmer/login" element={<FarmerLogin />} />
            <Route path="/officer/login" element={<OfficerLogin />} />

            {/* Farmer Portal Pages */}
            <Route path="/farmer" element={<FarmerLayout />}>
              <Route index element={<Navigate to="/farmer/dashboard" replace />} />
              <Route path="dashboard" element={<FarmerDashboard />} />
              <Route path="submit-claim" element={<SubmitClaim />} />
              <Route path="claims" element={<MyClaims />} />
              <Route path="claims/:id" element={<ClaimDetails />} />
              <Route path="claims/:id/track" element={<ClaimStatusTrack />} />
              <Route path="claims/:id/evidence" element={<SatelliteEvidence />} />
              <Route path="evidence" element={<SatelliteEvidence />} />
              <Route path="notifications" element={<FarmerNotifications />} />
              <Route path="profile" element={<FarmerProfile />} />
              <Route path="help" element={<FarmerHelp />} />
            </Route>

            {/* Officer Portal Pages */}
            <Route path="/officer" element={<OfficerLayout />}>
              <Route index element={<Navigate to="/officer/dashboard" replace />} />
              <Route path="dashboard" element={<OfficerDashboard />} />
              <Route path="claims" element={<OfficerAllClaims />} />
              <Route path="claims/:id/review" element={<OfficerClaimReview />} />
              <Route path="claims/:id/satellite" element={<OfficerSatelliteReview />} />
              <Route path="damage-assessment" element={<OfficerDamageAssessment />} />
              <Route path="reports" element={<OfficerReports />} />
              <Route path="farmers" element={<OfficerFarmers />} />
              <Route path="analytics" element={<OfficerAnalytics />} />
              <Route path="profile" element={<OfficerProfile />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
