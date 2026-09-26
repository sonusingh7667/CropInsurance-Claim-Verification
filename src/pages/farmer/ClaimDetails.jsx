import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import {
  Sprout,
  Calendar,
  MapPin,
  Satellite,
  Clock,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Building2,
  Download,
} from 'lucide-react';

export const ClaimDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { claims } = useAuth();

  const claim = claims.find((c) => c.id === id) || claims[0];

  if (!claim) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-slate-600">Claim not found.</p>
        <Link to="/farmer/claims" className="text-emerald-600 font-bold mt-2 inline-block">
          Return to My Claims
        </Link>
      </div>
    );
  }

  const cropName = language === 'hi' ? (claim.cropHindi || claim.crop) : claim.crop;
  const disasterName = language === 'hi' ? (claim.disasterTypeHindi || claim.disasterType) : claim.disasterType;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/farmer/claims')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? '← मेरे दावों की सूची पर वापस जाएं' : '← Back to My Claims'}</span>
        </button>
      </div>

      {/* Main Header Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-md">
                {claim.id}
              </span>
              <StatusBadge status={claim.status} size="lg" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
              <Sprout className="w-7 h-7 text-emerald-600" />
              <span>{cropName}</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {t('cdFilingDate', 'Date Filed')}: {claim.filingDate}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate(`/farmer/claims/${claim.id}/track`)}
              icon={Clock}
            >
              {t('trackClaim', 'Track Status')}
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => navigate(`/farmer/claims/${claim.id}/evidence`)}
              icon={Satellite}
              className="shadow-md shadow-emerald-700/20"
            >
              {t('viewEvidence', 'View Satellite Photos')}
            </Button>
          </div>
        </div>

        {/* Claim Summary Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 block">{t('cdDamagedAcres', 'Affected Area')}</span>
            <span className="text-xl font-extrabold text-slate-800">{claim.areaAcres} Acres</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-xs text-slate-400 block">{t('cdEstimatedLoss', 'Claim Amount')}</span>
            <span className="text-xl font-extrabold text-slate-800">₹{claim.estimatedLoss.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
            <span className="text-xs text-amber-700 block">{t('cdAiAssessment', 'Satellite Damage')}</span>
            <span className="text-xl font-extrabold text-amber-700">{claim.damagePercentage}%</span>
          </div>

          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-100">
            <span className="text-xs text-emerald-700 block">{language === 'hi' ? 'सत्यापन सटीकता' : 'Confidence'}</span>
            <span className="text-xl font-extrabold text-emerald-700">{claim.aiConfidence}%</span>
          </div>
        </div>
      </div>

      {/* Disaster & Land Record Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'भूमि एवं राजस्व अभिलेख' : 'Land & Village Records'}</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">{language === 'hi' ? 'जिला / राज्य' : 'District / State'}</span>
              <span className="font-semibold text-slate-800">{claim.district}, {claim.state}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">{language === 'hi' ? 'ग्राम / तहसील' : 'Village'}</span>
              <span className="font-semibold text-slate-800">{claim.village}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">{language === 'hi' ? 'खसरा / सर्वे संख्या' : 'Survey / Khasra No.'}</span>
              <span className="font-semibold text-slate-800 font-mono">{claim.surveyNumber}</span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">{language === 'hi' ? 'उपग्रह रिज़ॉल्यूशन' : 'Satellite Resolution'}</span>
              <span className="font-semibold text-emerald-700">10m Multispectral</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-600" />
            <span>{language === 'hi' ? 'नुकसान विवरण' : 'Incident Details'}</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">{language === 'hi' ? 'आपदा का प्रकार' : 'Disaster Cause'}</span>
              <span className="font-semibold text-rose-700">{disasterName}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="text-slate-500">{language === 'hi' ? 'घटना की तारीख' : 'Incident Date'}</span>
              <span className="font-semibold text-slate-800">{claim.dateOfIncident}</span>
            </div>

            <div className="py-2">
              <span className="text-slate-500 block mb-1">{language === 'hi' ? 'अधिकारी एवं एआई टिप्पणी' : 'Audit Observations'}</span>
              <p className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed italic">
                "{claim.officerRemarks}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
