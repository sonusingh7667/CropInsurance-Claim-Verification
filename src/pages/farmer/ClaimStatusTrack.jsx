import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import {
  CheckCircle2,
  Clock,
  Circle,
  Satellite,
  Building2,
  Banknote,
  ArrowLeft,
  ShieldCheck,
  HelpCircle,
  Calendar,
} from 'lucide-react';

export const ClaimStatusTrack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { claims } = useAuth();

  const claim = claims.find((c) => c.id === id) || claims[0];

  const cropName = language === 'hi' ? (claim.cropHindi || claim.crop) : claim.crop;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/farmer/claims')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? '← दावों की सूची पर वापस जाएं' : '← Back to Claims'}</span>
        </button>
      </div>

      {/* Main Status Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              {claim.id}
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
              {t('cdTimelineTitle', 'Claim Progress Timeline')}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {cropName} • {claim.village}, {claim.district} • {claim.areaAcres} Acres
            </p>
          </div>

          <StatusBadge status={claim.status} size="lg" />
        </div>

        {/* Timeline Visual Steps */}
        <div className="mt-8 space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
          {claim.timeline.map((step, idx) => {
            const isCompleted = step.completed;
            const title = language === 'hi' ? step.titleHindi : step.title;

            return (
              <div key={idx} className="relative flex items-start gap-4">
                {/* Step Circle Icon */}
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-all ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Clock className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                {/* Step Text Info */}
                <div className="flex-1 bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4
                      className={`text-sm font-bold ${
                        isCompleted ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {title}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400">
                      {step.date}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{step.notes}</p>

                  {step.stage === 'satellite_verified' && (
                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-xs text-purple-700 font-semibold flex items-center gap-1.5">
                        <Satellite className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? `उपग्रह क्षति आंकलन: ${claim.damagePercentage}%` : `Satellite Damage: ${claim.damagePercentage}%`}</span>
                      </span>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => navigate(`/farmer/claims/${claim.id}/evidence`)}
                        className="text-xs py-1 px-3"
                      >
                        {t('viewEvidence', 'View Satellite Photos')}
                      </Button>
                    </div>
                  )}

                  {step.stage === 'paid' && isCompleted && (
                    <div className="mt-3 p-2.5 bg-emerald-100/60 rounded-xl text-xs text-emerald-800 font-medium">
                      {language === 'hi'
                        ? 'मुआवजा राशि आपके आधार से जुड़े बैंक खाते में जमा हो चुकी है।'
                        : 'Amount successfully credited to your bank account via DBT.'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/farmer/claims/${claim.id}`)}
            className="flex-1"
          >
            {t('viewDetails', 'View Claim Details')}
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate(`/farmer/claims/${claim.id}/evidence`)}
            icon={Satellite}
            className="flex-1 shadow-md shadow-emerald-700/20"
          >
            {t('viewEvidence', 'View Satellite Photos')}
          </Button>
        </div>
      </div>
    </div>
  );
};
