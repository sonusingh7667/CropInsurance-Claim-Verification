import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import {
  Satellite,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileText,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  MapPin,
  Sprout,
} from 'lucide-react';

export const LandingPage = () => {
  const { language, t } = useLanguage();
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleStartFarmer = () => {
    setRole('farmer');
    navigate('/farmer/dashboard');
  };

  const handleStartOfficer = () => {
    setRole('officer');
    navigate('/officer/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Govt Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-medium">{t('govBadge', 'Government of India Initiative • PMFBY Compliant')}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kisan Helpline: <strong className="text-white">1800-180-1551</strong></span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 mb-6 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Satellite className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>{language === 'hi' ? 'यूरोपीय अंतरिक्ष एजेंसी सेंटिनल-2 उपग्रह द्वारा संचालित' : 'Powered by Sentinel-2 Earth Observation Satellites'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {t('landingHeroTitle', 'Fast, Fair & Transparent Crop Insurance Claims')}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
              {t(
                'landingHeroSub',
                'Powered by Sentinel-2 satellites and AI. No endless paperwork. Get your crop damage verified automatically within 48 hours.'
              )}
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                onClick={handleStartFarmer}
                icon={ArrowRight}
                className="w-full sm:w-auto text-base font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 py-4 px-8"
              >
                {t('landingCtaSubmit', 'Submit a Claim Now')}
              </Button>

              <Link to="/farmer/claims" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold py-4 px-8"
                >
                  {t('landingCtaTrack', 'Track Existing Claim')}
                </Button>
              </Link>
            </div>

            {/* Demo Officer Portal link */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleStartOfficer}
                className="text-xs text-emerald-300/80 hover:text-emerald-200 underline underline-offset-4 cursor-pointer"
              >
                {language === 'hi' ? '→ बीमा अधिकारी / नोडल अधिकारी पोर्टल खोलें' : '→ Switch to Insurance Officer / Admin Command Center'}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
              <p className="text-3xl font-extrabold text-emerald-400">48 Hours</p>
              <p className="text-xs text-slate-300 mt-1">{t('landingStat1Label', 'Average Verification Time')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
              <p className="text-3xl font-extrabold text-amber-400">₹420+ Cr</p>
              <p className="text-xs text-slate-300 mt-1">{t('landingStat2Label', 'Claims Processed')}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
              <p className="text-3xl font-extrabold text-teal-400">98.4%</p>
              <p className="text-xs text-slate-300 mt-1">{t('landingStat3Label', 'Satellite Accuracy')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section - Designed specially for farmers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full">
            {language === 'hi' ? 'सरल प्रक्रिया' : 'Easy 3-Step Process'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            {t('landingHowItWorksTitle', 'How CropSure Works For You')}
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-xl mx-auto">
            {language === 'hi'
              ? 'अब फसल नुकसान के लिए पटवारी या बीमा एजेंट के चक्कर काटने की ज़रूरत नहीं।'
              : 'Direct satellite-to-bank settlement without unnecessary paperwork or delays.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('step1Title', '1. Report Damage')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t(
                'step1Desc',
                'Tell us your crop type, location, and what happened (heavy rain, flood, hailstorm, or drought).'
              )}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{language === 'hi' ? 'मोबाइल से 2 मिनट में' : 'Takes 2 mins from phone'}</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('step2Title', '2. Satellite Scan')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t(
                'step2Desc',
                'Our satellites look at your field before and after the event to measure healthy green leaves versus damaged areas.'
              )}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 gap-1">
              <Satellite className="w-4 h-4" />
              <span>{language === 'hi' ? 'पारदर्शी उपग्रह जांच' : 'Objective 10m Sentinel pass'}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900">{t('step3Title', '3. Fast Approval')}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {t(
                'step3Desc',
                'Our insurance officers review the computer report and directly credit compensation to your bank account.'
              )}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>{language === 'hi' ? 'सीधा बैंक में पैसा (DBT)' : 'Direct Bank Credit (DBT)'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Help Banner Section */}
      <section className="bg-emerald-800 text-white py-10 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <PhoneCall className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-lg font-bold">
                {language === 'hi' ? 'किसान कॉल सेंटर टोल-फ्री सहायता' : 'Kisan Call Center Toll-Free Helpline'}
              </h4>
              <p className="text-xs text-emerald-100">
                {language === 'hi' ? 'सुबह 6:00 से रात 10:00 बजे तक मुफ्त परामर्श' : 'Available all 7 days from 6:00 AM to 10:00 PM'}
              </p>
            </div>
          </div>
          <a
            href="tel:18001801551"
            className="bg-white text-emerald-900 font-extrabold px-6 py-3 rounded-xl text-sm hover:bg-emerald-50 transition-colors shadow-md"
          >
            1800-180-1551
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-white">CropSure</span>
            <span>• {language === 'hi' ? 'डिजिटल भारत और प्रधानमंत्री फसल बीमा योजना' : 'Digital India & PMFBY Architecture'}</span>
          </div>
          <div className="flex gap-4">
            <Link to="/farmer/help" className="hover:text-white">{t('navHelp', 'Help')}</Link>
            <Link to="/officer/login" className="hover:text-white">{t('landingCtaOfficer', 'Officer Login')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
