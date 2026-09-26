import React, { createContext, useContext, useState } from 'react';
import { initialClaims } from '../data/mockClaims';

const AuthContext = createContext();

const defaultFarmer = {
  id: 'FARM-9921',
  name: 'Rameshwar Patil (रामेश्वर पाटिल)',
  phone: '+91 98231 44021',
  aadhaar: 'XXXX-XXXX-4812',
  village: 'Patan',
  district: 'Satara',
  state: 'Maharashtra',
  landSizeAcres: '4.5',
  bankName: 'State Bank of India',
  accountNumber: '••••••••4109',
  ifsc: 'SBIN0001244',
  avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=256',
};

const defaultOfficer = {
  id: 'OFF-MH-401',
  name: 'Dr. Anjali Deshmukh',
  designation: 'Senior Agricultural Verification Officer',
  department: 'PMFBY Nodal Cell & Remote Sensing Wing',
  district: 'Satara & Western Maharashtra Region',
  badge: 'Govt. Verified Nodal Assessor',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('farmer'); // 'farmer' | 'officer'
  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(true);
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(true);
  const [farmer, setFarmer] = useState(defaultFarmer);
  const [officer, setOfficer] = useState(defaultOfficer);
  const [claims, setClaims] = useState(initialClaims);

  const farmerLogin = (credentials) => {
    setIsFarmerLoggedIn(true);
    setRole('farmer');
  };

  const farmerLogout = () => {
    setIsFarmerLoggedIn(false);
  };

  const officerLogin = (credentials) => {
    setIsOfficerLoggedIn(true);
    setRole('officer');
  };

  const officerLogout = () => {
    setIsOfficerLoggedIn(false);
  };

  const addClaim = (newClaimData) => {
    const newId = `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullClaim = {
      id: newId,
      farmerId: farmer.id,
      farmerName: farmer.name,
      farmerPhone: farmer.phone,
      district: newClaimData.district || farmer.district,
      village: newClaimData.village || farmer.village,
      crop: newClaimData.crop || 'Soybean',
      cropHindi: newClaimData.cropHindi || 'सोयाबीन',
      surveyNumber: newClaimData.surveyNumber || '142/A/2',
      areaAcres: Number(newClaimData.areaAcres) || 3.0,
      disasterType: newClaimData.disasterType || 'Unseasonal Heavy Rainfall & Waterlogging',
      disasterTypeHindi: newClaimData.disasterTypeHindi || 'अतिवृष्टि एवं जलभराव',
      dateOfIncident: newClaimData.dateOfIncident || new Date().toISOString().split('T')[0],
      filingDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      estimatedLoss: Number(newClaimData.estimatedLoss) || 45000,
      status: 'submitted',
      damagePercentage: Number(newClaimData.damagePercentage) || 68,
      aiConfidence: 94,
      aiVerdict: 'Automated satellite scan initiated. Sentinel-2 spectral difference pending.',
      satelliteImages: {
        before: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
        after: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
        ndviBefore: 0.78,
        ndviAfter: 0.22,
        damageZonePercentage: 71,
      },
      timeline: [
        {
          stage: 'submitted',
          title: 'Claim Submitted',
          titleHindi: 'दावा दर्ज किया गया',
          date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          completed: true,
          notes: 'Application registered with land survey verification.'
        },
        {
          stage: 'satellite_verified',
          title: 'Satellite AI Assessment',
          titleHindi: 'उपग्रह एआई स्कैन',
          date: 'In Progress (ETA 24h)',
          completed: false,
          notes: 'Sentinel-2 Multispectral pass scheduled.'
        },
        {
          stage: 'officer_review',
          title: 'Officer Approval',
          titleHindi: 'अधिकारी सत्यापन',
          date: 'Pending',
          completed: false,
          notes: 'Verification by District Agriculture Officer.'
        },
        {
          stage: 'paid',
          title: 'Direct Bank Transfer',
          titleHindi: 'बैंक खाते में भुगतान',
          date: 'Pending',
          completed: false,
          notes: 'Aadhaar DBT disbursement.'
        }
      ]
    };

    setClaims(prev => [fullClaim, ...prev]);
    return fullClaim;
  };

  const updateClaimStatus = (claimId, newStatus, officerRemarks = '') => {
    setClaims(prev =>
      prev.map(c => {
        if (c.id === claimId) {
          const updatedTimeline = c.timeline.map(t => {
            if (newStatus === 'approved' || newStatus === 'paid') {
              return { ...t, completed: true };
            }
            if (newStatus === 'satellite_verified' && (t.stage === 'submitted' || t.stage === 'satellite_verified')) {
              return { ...t, completed: true };
            }
            return t;
          });

          return {
            ...c,
            status: newStatus,
            officerRemarks: officerRemarks || c.officerRemarks,
            timeline: updatedTimeline,
          };
        }
        return c;
      })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        isFarmerLoggedIn,
        isOfficerLoggedIn,
        farmer,
        officer,
        claims,
        farmerLogin,
        farmerLogout,
        officerLogin,
        officerLogout,
        addClaim,
        updateClaimStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
