
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const API = 'https://cropsure-api.onrender.com';

const defaultFarmer = {
  id: 1,
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

const makeTimeline = (status, date) => [
  {
    stage: 'submitted',
    title: 'Claim Submitted',
    titleHindi: 'दावा दर्ज किया गया',
    date,
    completed: true,
    notes: 'Claim registered in the CropSure backend.',
  },
  {
    stage: 'satellite_verified',
    title: 'Satellite AI Assessment',
    titleHindi: 'उपग्रह एआई स्कैन',
    date: status === 'submitted' ? 'Pending' : 'Assessment pending',
    completed: false,
    notes: 'Satellite assessment is handled separately.',
  },
  {
    stage: 'officer_review',
    title: 'Officer Approval',
    titleHindi: 'अधिकारी सत्यापन',
    date: 'Pending',
    completed: ['under_review', 'approved'].includes(status),
    notes: 'Verification by the district officer.',
  },
  {
    stage: 'paid',
    title: 'Direct Bank Transfer',
    titleHindi: 'बैंक खाते में भुगतान',
    date: 'Pending',
    completed: status === 'paid',
    notes: 'Payment is not initiated automatically.',
  },
];

const mapClaim = (c, farmer) => {
  const date = c.incident_date || new Date().toISOString().slice(0, 10);
  const filingDate = c.created_at
    ? new Date(c.created_at).toLocaleDateString('en-IN')
    : date;

  return {
    id: c.claim_number,
    backendId: c.id,
    farmerId: c.farmer_id,
    farmerName: farmer?.name || 'Registered Farmer',
    farmerPhone: farmer?.phone || '',
    district: farmer?.district || '',
    village: farmer?.village || '',
    state: farmer?.state || '',
    crop: c.crop,
    cropHindi: c.crop,
    areaAcres: farmer?.land_size_acres || 0,
    surveyNumber: 'Not provided',
    disasterType: c.disaster_type,
    disasterTypeHindi: c.disaster_type,
    dateOfIncident: date,
    filingDate,
    estimatedLoss: Number(c.estimated_loss || 0),
    damagePercentage: 0,
    aiConfidence: 0,
    aiVerdict: 'Awaiting satellite assessment',
    officerRemarks: c.officer_remarks || '',
    satelliteImages: {
      before: '',
      after: '',
      ndviBefore: 0,
      ndviAfter: 0,
      damageZonePercentage: 0,
    },
    timeline: makeTimeline(c.status, filingDate),
    status: c.status,
  };
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('farmer');
  const [isFarmerLoggedIn, setIsFarmerLoggedIn] = useState(true);
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(true);
  const [farmer, setFarmer] = useState(defaultFarmer);
  const [officer, setOfficer] = useState(defaultOfficer);
  const [claims, setClaims] = useState([]);
  const [loadingClaims, setLoadingClaims] = useState(true);
  const [apiError, setApiError] = useState('');

  const refreshClaims = async () => {
    setLoadingClaims(true);
    try {
      const [farmersRes, claimsRes] = await Promise.all([
        fetch(`${API}/farmers`),
        fetch(`${API}/claims`),
      ]);

      if (!farmersRes.ok || !claimsRes.ok) {
        throw new Error('Could not load records from CropSure server.');
      }

      const farmers = await farmersRes.json();
      const records = await claimsRes.json();
      const currentFarmer = farmers.find(f => f.id === defaultFarmer.id)
        || farmers.find(f => f.phone === defaultFarmer.phone)
        || defaultFarmer;

      setFarmer(prev => ({ ...prev, ...currentFarmer }));
      setClaims(records.map(c => {
        const owner = farmers.find(f => f.id === c.farmer_id);
        return mapClaim(c, owner);
      }));
      setApiError('');
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoadingClaims(false);
    }
  };

  useEffect(() => {
    refreshClaims();
  }, []);

  const farmerLogin = () => {
    setIsFarmerLoggedIn(true);
    setRole('farmer');
  };

  const farmerLogout = () => setIsFarmerLoggedIn(false);

  const officerLogin = () => {
    setIsOfficerLoggedIn(true);
    setRole('officer');
  };

  const officerLogout = () => setIsOfficerLoggedIn(false);

  const addClaim = async (data) => {
    const response = await fetch(`${API}/claims`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmer_id: Number(farmer.id),
        crop: data.crop,
        disaster_type: data.disasterType,
        incident_date: data.dateOfIncident,
        estimated_loss: Number(data.estimatedLoss),
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.detail || 'Claim submission failed.');
    }

    const newClaim = {
      ...mapClaim(result, farmer),
      district: data.district || farmer.district,
      village: data.village || farmer.village,
      areaAcres: Number(data.areaAcres) || 0,
      surveyNumber: data.surveyNumber || 'Not provided',
      damagePercentage: Number(data.damagePercentage) || 0,
      description: data.description || '',
    };

    setClaims(prev => [newClaim, ...prev]);
    return newClaim;
  };

  const updateClaimStatus = async (claimId, newStatus, officerRemarks = '') => {
    const claim = claims.find(c => c.id === claimId);
    if (!claim) throw new Error('Claim not found.');

    const response = await fetch(`${API}/claims/${claim.backendId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: newStatus,
        officer_remarks: officerRemarks,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.detail || 'Could not update claim status.');
    }

    setClaims(prev => prev.map(c =>
      c.id === claimId
        ? {
            ...c,
            status: result.status,
            officerRemarks: result.officer_remarks || '',
            timeline: makeTimeline(result.status, c.filingDate),
          }
        : c
    ));
  };

  return (
    <AuthContext.Provider value={{
      role, setRole,
      isFarmerLoggedIn, isOfficerLoggedIn,
      farmer, setFarmer, officer, setOfficer,
      claims, loadingClaims, apiError, refreshClaims,
      farmerLogin, farmerLogout, officerLogin, officerLogout,
      addClaim, updateClaimStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
