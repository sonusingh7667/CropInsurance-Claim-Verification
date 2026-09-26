import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ClaimCard } from '../../components/common/ClaimCard';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { FormInput } from '../../components/common/FormInput';
import {
  FileText,
  Search,
  Filter,
  FilePlus2,
  CheckCircle2,
  Clock,
  Satellite,
} from 'lucide-react';

export const MyClaims = () => {
  const { language, t } = useLanguage();
  const { farmer, claims } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'active' | 'satellite_verified' | 'paid'

  // Get farmer claims
  const farmerClaims = claims.filter(
    (c) => c.farmerId === farmer.id || c.farmerPhone === farmer.phone
  );

  const filteredClaims = farmerClaims.filter((claim) => {
    // Search match
    const matchesSearch =
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (claim.cropHindi && claim.cropHindi.includes(searchQuery)) ||
      claim.disasterType.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    if (!matchesSearch) return false;
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return claim.status === 'submitted' || claim.status === 'under_review' || claim.status === 'satellite_verified';
    if (selectedFilter === 'satellite_verified') return claim.status === 'satellite_verified';
    if (selectedFilter === 'paid') return claim.status === 'paid';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('navMyClaims', 'My Claims')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? 'आपके द्वारा दर्ज किए गए सभी फसल बीमा दावों की अद्यतन सूची'
              : 'Complete history and real-time status of your crop insurance claims'}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate('/farmer/submit-claim')}
          icon={FilePlus2}
          className="font-bold shadow-md shadow-emerald-700/20 self-start sm:self-auto"
        >
          {t('fdActionSubmit', 'File New Claim')}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="w-full md:w-80">
          <FormInput
            placeholder={language === 'hi' ? 'दावा संख्या या फसल खोजें...' : 'Search by Claim ID or Crop...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              selectedFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'hi' ? 'सभी दावे' : 'All Claims'} ({farmerClaims.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              selectedFilter === 'active'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'hi' ? 'सक्रिय (प्रक्रियाधीन)' : 'Active Claims'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('satellite_verified')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              selectedFilter === 'satellite_verified'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'hi' ? 'उपग्रह सत्यापित' : 'Satellite Verified'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('paid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              selectedFilter === 'paid'
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'hi' ? 'मुआवजा प्राप्त' : 'Paid (DBT)'}
          </button>
        </div>
      </div>

      {/* Claims List */}
      {filteredClaims.length === 0 ? (
        <EmptyState
          title={language === 'hi' ? 'कोई दावा नहीं मिला' : 'No claims found'}
          description={
            language === 'hi'
              ? 'आपके खोजे गए मापदंड के अनुसार कोई रिकॉर्ड उपलब्ध नहीं है।'
              : 'Try changing your search terms or filter selection.'
          }
          actionLabel={language === 'hi' ? 'नया दावा दर्ज करें' : 'Submit a Claim'}
          onAction={() => navigate('/farmer/submit-claim')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClaims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      )}
    </div>
  );
};
