import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Sprout,
  ShieldCheck,
  Bell,
  User,
  LogOut,
  ArrowRightLeft,
  Menu,
  X,
  Satellite,
  Home,
  FilePlus2,
  FileText,
  HelpCircle,
  BarChart3,
  Layers,
  Users,
} from 'lucide-react';

export const Navbar = () => {
  const { language, t } = useLanguage();
  const { role, setRole, isFarmerLoggedIn, isOfficerLoggedIn, farmer, officer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isFarmer = role === 'farmer';

  const handleRoleToggle = () => {
    if (isFarmer) {
      setRole('officer');
      navigate('/officer/dashboard');
    } else {
      setRole('farmer');
      navigate('/farmer/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Govt Accent Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-600" />

      {/* Govt Sub-header strip */}
      <div className="bg-slate-900 text-slate-300 px-4 py-1 text-[11px] flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{t('govBadge', 'Government of India Initiative • PMFBY Compliant')}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-slate-400">Toll-Free Helpline: 1800-180-1551</span>
          <span className="text-slate-400">•</span>
          <span className="text-emerald-400 font-semibold">Sentinel-2 AI Verification Engine</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-hidden"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">CropSure</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">
              {language === 'hi' ? 'फसल बीमा सत्यापन प्रणाली' : 'Crop Insurance Verification'}
            </p>
          </div>
        </Link>

        {/* Center Portal Pill Badge */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => {
              setRole('farmer');
              navigate('/farmer/dashboard');
            }}
            className={`px-3 py-1 font-semibold rounded-full transition-all cursor-pointer ${
              isFarmer
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('farmerPortal', 'Farmer Portal')}
          </button>
          <button
            type="button"
            onClick={() => {
              setRole('officer');
              navigate('/officer/dashboard');
            }}
            className={`px-3 py-1 font-semibold rounded-full transition-all cursor-pointer ${
              !isFarmer
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('officerPortal', 'Officer Portal')}
          </button>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Quick Demo Role Switch Button */}
          <button
            type="button"
            onClick={handleRoleToggle}
            title="Switch between Farmer & Officer Demo View"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isFarmer ? 'Officer View' : 'Farmer View'}</span>
          </button>

          {/* Notifications Button */}
          <Link
            to={isFarmer ? '/farmer/notifications' : '/officer/claims'}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Link>

          {/* User Profile Avatar */}
          <Link
            to={isFarmer ? '/farmer/profile' : '/officer/profile'}
            className="flex items-center gap-2 pl-2 border-l border-slate-200"
          >
            <img
              src={isFarmer ? farmer.avatar : officer.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                {isFarmer ? farmer.name.split(' ')[0] : 'Dr. Anjali'}
              </p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                {isFarmer ? 'Farmer' : 'Officer'}
              </p>
            </div>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Active View:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRole('farmer');
                  setMobileMenuOpen(false);
                  navigate('/farmer/dashboard');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  isFarmer ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                }`}
              >
                Farmer
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('officer');
                  setMobileMenuOpen(false);
                  navigate('/officer/dashboard');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${
                  !isFarmer ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
                }`}
              >
                Officer
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {isFarmer ? (
              <>
                <Link
                  to="/farmer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Home className="w-4 h-4" />
                  <span>{t('navDashboard', 'Dashboard')}</span>
                </Link>
                <Link
                  to="/farmer/submit-claim"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <FilePlus2 className="w-4 h-4" />
                  <span>{t('navSubmitClaim', 'Submit Claim')}</span>
                </Link>
                <Link
                  to="/farmer/claims"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('navMyClaims', 'My Claims')}</span>
                </Link>
                <Link
                  to="/farmer/help"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{t('navHelp', 'Help & Support')}</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/officer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{t('odTitle', 'Command Center')}</span>
                </Link>
                <Link
                  to="/officer/claims"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t('navAllClaims', 'All Claims Queue')}</span>
                </Link>
                <Link
                  to="/officer/damage-assessment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Layers className="w-4 h-4" />
                  <span>{t('navDamageAssessment', 'Damage Assessment')}</span>
                </Link>
                <Link
                  to="/officer/farmers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  <Users className="w-4 h-4" />
                  <span>{t('navFarmers', 'Farmers Directory')}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
