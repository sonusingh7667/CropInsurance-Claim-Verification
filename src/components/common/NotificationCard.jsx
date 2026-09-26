import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Bell, Satellite, Banknote, CloudRain, AlertCircle } from 'lucide-react';

export const NotificationCard = ({ notif, onMarkRead }) => {
  const { language } = useLanguage();

  const icons = {
    satellite: <Satellite className="w-5 h-5 text-purple-600" />,
    payout: <Banknote className="w-5 h-5 text-emerald-600" />,
    weather: <CloudRain className="w-5 h-5 text-blue-600" />,
    status: <Bell className="w-5 h-5 text-amber-600" />,
  };

  const bgs = {
    satellite: 'bg-purple-50 border-purple-100',
    payout: 'bg-emerald-50 border-emerald-100',
    weather: 'bg-blue-50 border-blue-100',
    status: 'bg-amber-50 border-amber-100',
  };

  const title = language === 'hi' ? notif.titleHindi : notif.title;
  const message = language === 'hi' ? notif.messageHindi : notif.message;
  const time = language === 'hi' ? notif.timeHindi : notif.time;

  return (
    <div
      className={`p-4 md:p-5 rounded-2xl border transition-all ${
        notif.read ? 'bg-white border-slate-200/80 opacity-90' : 'bg-emerald-50/20 border-emerald-200/90 shadow-2xs'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <div className={`w-10 h-10 rounded-xl ${bgs[notif.type] || 'bg-slate-100'} border flex items-center justify-center shrink-0`}>
          {icons[notif.type] || <AlertCircle className="w-5 h-5 text-slate-600" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-900 leading-snug">{title}</h4>
            <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">{time}</span>
          </div>

          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{message}</p>

          <div className="flex items-center gap-3 mt-3">
            {notif.claimId && notif.claimId !== 'ALERT-MET' && (
              <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                Ref: {notif.claimId}
              </span>
            )}
            {!notif.read && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
