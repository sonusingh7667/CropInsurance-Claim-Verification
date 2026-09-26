import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Clock, Eye, Satellite, CheckCircle2, XCircle, Banknote } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const { language } = useLanguage();

  const configs = {
    submitted: {
      en: 'Submitted',
      hi: 'दर्ज हुआ',
      icon: Clock,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    under_review: {
      en: 'Under Review',
      hi: 'समीक्षा जारी',
      icon: Eye,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    satellite_verified: {
      en: 'Satellite Verified',
      hi: 'उपग्रह सत्यापित',
      icon: Satellite,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    approved: {
      en: 'Approved',
      hi: 'स्वीकृत',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    rejected: {
      en: 'Rejected',
      hi: 'अस्वीकृत',
      icon: XCircle,
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    paid: {
      en: 'Amount Paid (DBT)',
      hi: 'बैंक में भुगतान संपन्न',
      icon: Banknote,
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
  };

  const config = configs[status] || configs.submitted;
  const Icon = config.icon;
  const label = language === 'hi' ? config.hi : config.en;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.color} ${sizeClasses[size] || sizeClasses.md} transition-colors`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{label}</span>
    </span>
  );
};
