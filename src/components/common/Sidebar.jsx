import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import {
  Home,
  FilePlus2,
  FileText,
  Satellite,
  Bell,
  User,
  HelpCircle,
  LayoutDashboard,
  Layers,
  BarChart3,
  Users,
  FileSpreadsheet,
  ShieldAlert,
} from 'lucide-react';

export const Sidebar = ({ role = 'farmer' }) => {
  const { language, t } = useLanguage();

  const farmerNavItems = [
    {
      to: '/farmer/dashboard',
      icon: Home,
      label: t('navDashboard', 'Dashboard'),
    },
    {
      to: '/farmer/submit-claim',
      icon: FilePlus2,
      label: t('navSubmitClaim', 'Submit Claim'),
      badge: 'New',
    },
    {
      to: '/farmer/claims',
      icon: FileText,
      label: t('navMyClaims', 'My Claims'),
    },
    {
      to: '/farmer/claims/CS-2026-8891/evidence',
      icon: Satellite,
      label: t('navSatelliteEvidence', 'Satellite Check'),
    },
    {
      to: '/farmer/notifications',
      icon: Bell,
      label: t('navNotifications', 'Notifications'),
    },
    {
      to: '/farmer/profile',
      icon: User,
      label: t('navProfile', 'My Profile'),
    },
    {
      to: '/farmer/help',
      icon: HelpCircle,
      label: t('navHelp', 'Help & Support'),
    },
  ];

  const officerNavItems = [
    {
      to: '/officer/dashboard',
      icon: LayoutDashboard,
      label: t('odTitle', 'Command Center'),
    },
    {
      to: '/officer/claims',
      icon: FileText,
      label: t('navAllClaims', 'All Claims Queue'),
    },
    {
      to: '/officer/claims/CS-2026-8891/review',
      icon: ShieldAlert,
      label: t('navClaimReview', 'Claim Review'),
    },
    {
      to: '/officer/claims/CS-2026-8891/satellite',
      icon: Satellite,
      label: t('navSatelliteReview', 'Satellite Review'),
    },
    {
      to: '/officer/damage-assessment',
      icon: Layers,
      label: t('navDamageAssessment', 'Damage Assessment'),
    },
    {
      to: '/officer/reports',
      icon: FileSpreadsheet,
      label: t('navReports', 'Reports & Audits'),
    },
    {
      to: '/officer/farmers',
      icon: Users,
      label: t('navFarmers', 'Farmers Directory'),
    },
    {
      to: '/officer/analytics',
      icon: BarChart3,
      label: t('navAnalytics', 'Risk Analytics'),
    },
    {
      to: '/officer/profile',
      icon: User,
      label: t('navOfficerProfile', 'Officer Profile'),
    },
  ];

  const items = role === 'officer' ? officerNavItems : farmerNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200/80 min-h-[calc(100vh-5rem)] p-4">
      <div className="space-y-1">
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {role === 'officer'
            ? (language === 'hi' ? 'अधिकारी नियंत्रण' : 'Officer Navigation')
            : (language === 'hi' ? 'किसान सेवाएं' : 'Farmer Services')}
        </p>

        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? role === 'officer'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-emerald-600 text-white shadow-xs shadow-emerald-700/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Emergency Kisan Call Center Quick Box (Farmer Sidebar only) */}
      {role === 'farmer' && (
        <div className="mt-auto pt-6">
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-950">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold">
                {language === 'hi' ? 'किसान कॉल सेंटर' : 'Kisan Helpline'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 mb-2">
              {language === 'hi' ? 'निःशुल्क 1800-180-1551 पर कॉल करें' : 'Call toll-free 1800-180-1551 for claim help.'}
            </p>
            <a
              href="tel:18001801551"
              className="block text-center py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
            >
              {language === 'hi' ? 'कॉल करें' : 'Call Now'}
            </a>
          </div>
        </div>
      )}
    </aside>
  );
};
