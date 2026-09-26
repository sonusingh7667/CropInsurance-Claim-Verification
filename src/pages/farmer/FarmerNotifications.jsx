import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockNotifications } from '../../data/mockNotifications';
import { NotificationCard } from '../../components/common/NotificationCard';
import { Button } from '../../components/common/Button';
import { Bell, CheckCheck } from 'lucide-react';

export const FarmerNotifications = () => {
  const { language, t } = useLanguage();
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('navNotifications', 'Notifications')}
            </h1>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} {language === 'hi' ? 'नई' : 'new'}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? 'उपग्रह जांच परिणाम, मौसम चेतावनी एवं बैंक भुगतान की सूचनाएं'
              : 'Updates on satellite verification, weather alerts, and bank credit status'}
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            icon={CheckCheck}
            className="self-start sm:self-auto"
          >
            {language === 'hi' ? 'सभी को पढ़ा हुआ चिन्हित करें' : 'Mark all as read'}
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <NotificationCard key={notif.id} notif={notif} />
        ))}
      </div>
    </div>
  );
};
