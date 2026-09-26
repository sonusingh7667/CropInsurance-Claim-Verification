import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SatelliteComparisonSlider } from '../../components/common/SatelliteComparisonSlider';
import { Button } from '../../components/common/Button';
import {
  Satellite,
  Info,
  CheckCircle2,
  Download,
  ArrowLeft,
  Calendar,
  Layers,
  Sprout,
  ShieldCheck,
} from 'lucide-react';

export const SatelliteEvidence = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { claims } = useAuth();

  // Find claim or fallback to primary claim
  const currentClaim = claims.find((c) => c.id === id) || claims[0];
  const [activeClaimId, setActiveClaimId] = useState(currentClaim.id);

  const activeClaim = claims.find((c) => c.id === activeClaimId) || currentClaim;

  const cropName = language === 'hi' ? (activeClaim.cropHindi || activeClaim.crop) : activeClaim.crop;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate('/farmer/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'hi' ? '← किसान डैशबोर्ड पर वापस जाएं' : '← Back to Dashboard'}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t('seTitle', 'Satellite Crop Health Check')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t('seSubtitle', 'See your field from above. Compare before and after the incident.')}
          </p>
        </div>

        {/* Claim Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {claims.slice(0, 3).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveClaimId(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeClaimId === c.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c.id} ({c.crop})
            </button>
          ))}
        </div>
      </div>

      {/* Main Satellite Viewer Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-100 px-2.5 py-0.5 rounded text-slate-700">
                {activeClaim.id}
              </span>
              <span className="text-sm font-extrabold text-slate-900">{cropName}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeClaim.village}, {activeClaim.district} • Khasra: #{activeClaim.surveyNumber}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सत्यापित उपग्रह साक्ष्य' : 'Verified Sentinel-2 Pass'}</span>
            </span>
          </div>
        </div>

        {/* Interactive Comparison Slider */}
        <SatelliteComparisonSlider
          beforeImage={activeClaim.satelliteImages.before}
          afterImage={activeClaim.satelliteImages.after}
          beforeLabel={language === 'hi' ? 'आपदा पूर्व (स्वस्थ फसल)' : 'Pre-Disaster (Healthy)'}
          afterLabel={language === 'hi' ? 'आपदा उपरांत (क्षतिग्रस्त)' : 'Post-Disaster (Damaged)'}
          ndviBefore={activeClaim.satelliteImages.ndviBefore}
          ndviAfter={activeClaim.satelliteImages.ndviAfter}
          damagePercentage={activeClaim.damagePercentage}
          satelliteDate={activeClaim.satelliteImages.satellitePassDate || '15 Aug 2026'}
          cloudCover={activeClaim.satelliteImages.cloudCover || '2.1%'}
        />

        {/* Easy Color Guide for Farmers */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-slate-800">
              {language === 'hi' ? 'रंगों का सरल अर्थ (किसान मार्गदर्शिका):' : 'How to read these satellite images:'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-100">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0 mt-0.5" />
              <p className="text-slate-600">
                <strong className="text-emerald-800">
                  {language === 'hi' ? 'हरा रंग:' : 'Bright Green:'}
                </strong>{' '}
                {language === 'hi'
                  ? 'स्वस्थ, हरी-भरी और खड़ी फसल को दर्शाता है।'
                  : 'Indicates healthy, flourishing standing crops with active chlorophyll.'}
              </p>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 bg-white rounded-xl border border-slate-100">
              <span className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0 mt-0.5" />
              <p className="text-slate-600">
                <strong className="text-rose-800">
                  {language === 'hi' ? 'लाल / गहरा भूरा रंग:' : 'Red / Brown:'}
                </strong>{' '}
                {language === 'hi'
                  ? 'पानी में डूबी हुई, सड़ी या सूखी हुई नष्ट फसल को दर्शाता है।'
                  : 'Indicates flood inundation, lodged stems, or scorched crop canopy.'}
              </p>
            </div>
          </div>
        </div>

        {/* AI Confidence and Download Certificate */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {language === 'hi'
                ? `सत्यापन विश्वसनीयता: ${activeClaim.aiConfidence}% (मान्यता प्राप्त)`
                : `AI Confidence Score: ${activeClaim.aiConfidence}% (Compliant with PMFBY Spectral Guidelines)`}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => alert(language === 'hi' ? 'उपग्रह सत्यापन प्रमाणपत्र डाउनलोड हो रहा है...' : 'Downloading Satellite Verification Certificate PDF...')}
          >
            {language === 'hi' ? 'सत्यापन प्रमाणपत्र डाउनलोड करें' : 'Download Satellite Certificate'}
          </Button>
        </div>
      </div>
    </div>
  );
};
