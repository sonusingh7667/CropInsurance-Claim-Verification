import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { SatelliteComparisonSlider } from '../../components/common/SatelliteComparisonSlider';
import { Button } from '../../components/common/Button';
import {
  Satellite,
  Layers,
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

export const OfficerSatelliteReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { claims } = useAuth();

  const claim = claims.find((c) => c.id === id) || claims[0];
  const [activeBand, setActiveBand] = useState('ndvi'); // 'trueColor' | 'cir' | 'ndvi' | 'ndwi'

  const bandConfigs = {
    trueColor: {
      name: 'RGB Natural True Color (B4-B3-B2)',
      desc: 'Visible spectrum simulation representing actual field appearance.',
      before: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
    },
    cir: {
      name: 'False Color Infrared (B8-B4-B3)',
      desc: 'Near-Infrared reflection highlights chlorophyll density in crimson red.',
      before: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=1200',
    },
    ndvi: {
      name: 'Normalized Difference Vegetation Index (NDVI)',
      desc: 'Calculates live green vegetation absorption via (NIR - Red) / (NIR + Red).',
      before: claim.satelliteImages.before,
      after: claim.satelliteImages.after,
    },
    ndwi: {
      name: 'Normalized Difference Water Index (NDWI)',
      desc: 'Isolates standing water bodies and saturated soil inundation.',
      before: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
      after: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
    },
  };

  const currentBand = bandConfigs[activeBand];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div>
        <button
          type="button"
          onClick={() => navigate(`/officer/claims/${claim.id}/review`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? '← दावा समीक्षा पर लौटें' : '← Back to Claim Review'}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2.5 py-0.5 rounded">
                {claim.id}
              </span>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                Sentinel-2 L2A BOA Multispectral
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              {t('navSatelliteReview', 'Satellite Assessment & Spectral Evidence')}
            </h1>
            <p className="text-xs text-slate-500">
              Survey Plot: #{claim.surveyNumber} ({claim.village}, {claim.district}) • {claim.areaAcres} Acres
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => alert('Downloading official Sentinel-2 Spectral GeoTIFF and Evidence Dossier PDF...')}
            className="self-start sm:self-auto text-xs"
          >
            Export Spectral PDF Report
          </Button>
        </div>
      </div>

      {/* Band Selection Tabs */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveBand('ndvi')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeBand === 'ndvi'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          NDVI Vegetation Index
        </button>

        <button
          type="button"
          onClick={() => setActiveBand('cir')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeBand === 'cir'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Color Infrared (CIR)
        </button>

        <button
          type="button"
          onClick={() => setActiveBand('ndwi')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeBand === 'ndwi'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          NDWI Flood / Water Index
        </button>

        <button
          type="button"
          onClick={() => setActiveBand('trueColor')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeBand === 'trueColor'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Natural Color (RGB)
        </button>
      </div>

      {/* Main Satellite Comparison Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{currentBand.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{currentBand.desc}</p>
          </div>
          <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
            Damage Concordance: {claim.damagePercentage}%
          </span>
        </div>

        <SatelliteComparisonSlider
          beforeImage={currentBand.before}
          afterImage={currentBand.after}
          ndviBefore={claim.satelliteImages.ndviBefore}
          ndviAfter={claim.satelliteImages.ndviAfter}
          damagePercentage={claim.damagePercentage}
          satelliteDate={claim.satelliteImages.satellitePassDate}
          cloudCover={claim.satelliteImages.cloudCover}
        />
      </div>

      {/* Deep Spectral Telemetry Box */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 block font-medium">ESA Satellite Swath</span>
          <span className="text-base font-bold text-slate-900 mt-1 block">Sentinel-2B Orbit #142</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Zenith Angle: 18.4° • Azimuth: 142.1°</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 block font-medium">Spectral Difference (ΔNDVI)</span>
          <span className="text-base font-extrabold text-rose-600 mt-1 block">-0.56 (High Drop)</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Pre: 0.78 → Post: 0.22</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-slate-400 block font-medium">Atmospheric Cloud Filter</span>
          <span className="text-base font-extrabold text-emerald-600 mt-1 block">Clear (2.1% Cirrus)</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Valid for legal PMFBY settlement</span>
        </div>
      </div>
    </div>
  );
};
