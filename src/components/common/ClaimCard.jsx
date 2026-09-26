import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Calendar, Sprout, ArrowRight, Satellite, ShieldCheck } from 'lucide-react';

export const ClaimCard = ({ claim }) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const cropName = language === 'hi' ? (claim.cropHindi || claim.crop) : claim.crop;
  const disasterName = language === 'hi' ? (claim.disasterTypeHindi || claim.disasterType) : claim.disasterType;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {claim.id}
              </span>
              <span className="text-xs text-slate-400">• {claim.filingDate}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-1.5">
              <Sprout className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{cropName}</span>
            </h4>
          </div>
          <StatusBadge status={claim.status} />
        </div>

        {/* Disaster type & details */}
        <p className="text-xs font-medium text-rose-700 bg-rose-50/70 border border-rose-100 px-2.5 py-1 rounded-lg mb-4 inline-block">
          {disasterName}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-3 border-y border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block">{language === 'hi' ? 'क्षतिग्रस्त रकबा' : 'Damaged Area'}</span>
            <span className="font-bold text-slate-800 text-sm">{claim.areaAcres} {language === 'hi' ? 'एकड़' : 'Acres'}</span>
          </div>

          <div>
            <span className="text-slate-400 block">{language === 'hi' ? 'दावा राशि' : 'Claim Value'}</span>
            <span className="font-bold text-slate-800 text-sm">₹{claim.estimatedLoss.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <span className="text-slate-400 block">{language === 'hi' ? 'उपग्रह क्षति' : 'Satellite Loss'}</span>
            <span className="font-bold text-amber-600 text-sm">{claim.damagePercentage}%</span>
          </div>
        </div>

        {/* Location row */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{claim.village}, {claim.district} ({language === 'hi' ? 'खसरा' : 'Khasra'} #{claim.surveyNumber})</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/farmer/claims/${claim.id}/track`)}
          className="flex-1"
        >
          {t('trackClaim', 'Track Status')}
        </Button>

        <Button
          size="sm"
          variant="primary"
          onClick={() => navigate(`/farmer/claims/${claim.id}/evidence`)}
          icon={Satellite}
          className="flex-1"
        >
          {t('viewEvidence', 'Satellite Photos')}
        </Button>
      </div>
    </div>
  );
};
