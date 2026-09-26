import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LoadingState = ({ message, className = '' }) => {
  const { language } = useLanguage();

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-3" />
      <p className="text-sm font-medium text-slate-600">
        {message || (language === 'hi' ? 'कृपया प्रतीक्षा करें, जानकारी लोड हो रही है...' : 'Please wait, loading data...')}
      </p>
    </div>
  );
};
