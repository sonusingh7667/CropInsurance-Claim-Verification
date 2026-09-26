import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { ClaimCard } from '../../components/common/ClaimCard';
import { HelpCard } from '../../components/common/HelpCard';
import { Button } from '../../components/common/Button';
import {
  FilePlus2,
  FileText,
  Clock,
  Banknote,
  CloudRain,
  Satellite,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

export const FarmerDashboard = () => {
  const { language, t } = useLanguage();
  const { farmer, claims } = useAuth();
  const navigate = useNavigate();

  // Filter farmer claims
  const farmerClaims = claims.filter(c => c.farmerId === farmer.id || c.farmerPhone === farmer.phone);
  const activeClaimsCount = farmerClaims.filter(c => c.status !== 'rejected' && c.status !== 'paid').length;
  const totalClaimed = farmerClaims.reduce((acc, curr) => acc + (curr.estimatedLoss || 0), 0);
  const totalPaid = farmerClaims
    .filter(c => c.status === 'paid')
    .reduce((acc, curr) => acc + (curr.approvedPayout || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{language === 'hi' ? 'सत्यापित किसान प्रोफ़ाइल' : 'Verified PMFBY Account'}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('fdGreeting', 'Namaste')}, {farmer.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? `ग्राम: ${farmer.village}, जिला: ${farmer.district} • कुल रकबा: ${farmer.landSizeAcres} एकड़`
              : `Village: ${farmer.village}, District: ${farmer.district} • Land Holding: ${farmer.landSizeAcres} Acres`}
          </p>
        </div>

        {/* Big Action Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/farmer/submit-claim')}
            icon={FilePlus2}
            className="font-bold shadow-md shadow-emerald-700/20"
          >
            {t('scTitle', 'Submit Crop Damage Claim')}
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/farmer/claims/CS-2026-8891/evidence')}
            icon={Satellite}
          >
            {t('navSatelliteEvidence', 'Satellite Check')}
          </Button>
        </div>
      </div>

      {/* Weather Advisory Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <CloudRain className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                {language === 'hi' ? 'मौसम चेतावनी' : 'Weather Alert'}
              </span>
              <span className="text-xs text-blue-200">Satara District (Next 48 hrs)</span>
            </div>
            <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1 leading-snug">
              {t(
                'fdWeatherAlertText',
                'Heavy rainfall warning for your district in the next 48 hours. Ensure field drainage channels are clear.'
              )}
            </p>
          </div>
        </div>

        <Link
          to="/farmer/help"
          className="text-xs font-bold text-amber-300 hover:text-amber-200 whitespace-nowrap self-end sm:self-center"
        >
          {language === 'hi' ? 'कृषि सलाह पढ़ें →' : 'Read Advisory →'}
        </Link>
      </div>

      {/* Key Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title={t('fdActiveClaims', 'Active Claims')}
          value={activeClaimsCount.toString()}
          subtitle={language === 'hi' ? 'समीक्षा व उपग्रह जांच जारी' : 'In satellite verification pipeline'}
          icon={Clock}
          colorScheme="blue"
        />

        <StatCard
          title={t('fdTotalClaimed', 'Total Claim Value')}
          value={`₹${totalClaimed.toLocaleString('en-IN')}`}
          subtitle={language === 'hi' ? 'कुल प्रस्तुत किए गए दावे' : 'Across all reported seasons'}
          icon={FileText}
          colorScheme="amber"
        />

        <StatCard
          title={t('fdDisbursed', 'Amount Received')}
          value={`₹${totalPaid.toLocaleString('en-IN')}`}
          subtitle={language === 'hi' ? 'सीधे बैंक खाते में प्राप्त' : 'Directly credited via DBT'}
          icon={Banknote}
          colorScheme="emerald"
        />
      </div>

      {/* Main Content: Recent Claims + Sidebar Help */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Claims Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              {t('fdRecentClaimsTitle', 'Recent Insurance Claims')}
            </h3>
            <Link
              to="/farmer/claims"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>{language === 'hi' ? 'सभी देखें' : 'View All'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {farmerClaims.slice(0, 3).map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        </div>

        {/* Support & Quick Contact Column (1 col) */}
        <div className="space-y-6">
          <HelpCard />

          {/* Quick FAQ summary box */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Helpful Answers'}</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-800">
                  {language === 'hi' ? 'उपग्रह जांच में कितना समय लगता है?' : 'How long does satellite verification take?'}
                </p>
                <p className="text-slate-500 mt-1">
                  {language === 'hi' ? 'आमतौर पर 24 से 48 घंटे के भीतर।' : 'Usually within 24 to 48 hours of filing.'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-800">
                  {language === 'hi' ? 'मुआवजा किस खाते में आएगा?' : 'Where will the money be sent?'}
                </p>
                <p className="text-slate-500 mt-1">
                  {language === 'hi' ? 'आपके आधार से जुड़े बैंक खाते (DBT) में।' : 'Directly to your Aadhaar-linked bank account.'}
                </p>
              </div>
            </div>

            <Link
              to="/farmer/help"
              className="block mt-4 text-center text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              {language === 'hi' ? 'सभी सहायता केंद्र प्रश्न देखें →' : 'Read all FAQs →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
