import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, FilePlus2, FileText, Satellite, User, HelpCircle } from 'lucide-react';

export const MobileNav = ({ role = 'farmer' }) => {
  const { language, t } = useLanguage();

  if (role === 'officer') {
    return null; // Officer portal primarily uses desktop / tablet drawer
  }

  const navItems = [
    {
      to: '/farmer/dashboard',
      icon: Home,
      label: t('navDashboard', 'Home'),
    },
    {
      to: '/farmer/submit-claim',
      icon: FilePlus2,
      label: t('navSubmitClaim', 'Claim'),
      highlight: true,
    },
    {
      to: '/farmer/claims',
      icon: FileText,
      label: t('navMyClaims', 'Claims'),
    },
    {
      to: '/farmer/claims/CS-2026-8891/evidence',
      icon: Satellite,
      label: t('navSatelliteEvidence', 'Satellite'),
    },
    {
      to: '/farmer/help',
      icon: HelpCircle,
      label: t('navHelp', 'Help'),
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                item.highlight
                  ? isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-emerald-600 font-semibold'
                  : isActive
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900 font-medium'
              }`
            }
          >
            {item.highlight ? (
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center -mt-4 shadow-md shadow-emerald-700/30">
                <Icon className="w-5 h-5" />
              </div>
            ) : (
              <Icon className="w-5 h-5" />
            )}
            <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[64px]">
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};
