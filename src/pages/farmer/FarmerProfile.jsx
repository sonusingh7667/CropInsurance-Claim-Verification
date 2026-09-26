import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { Button } from '../../components/common/Button';
import {
  User,
  Phone,
  ShieldCheck,
  Building2,
  MapPin,
  CheckCircle2,
  FileBadge2,
  Landmark,
  Save,
} from 'lucide-react';

export const FarmerProfile = () => {
  const { language, t } = useLanguage();
  const { farmer } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const [phone, setPhone] = useState(farmer.phone);
  const [village, setVillage] = useState(farmer.village);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-md"
          />
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'सत्यापित किसान आईडी: ' : 'Verified PMFBY ID: '} {farmer.id}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900">{farmer.name}</h1>
          <p className="text-xs text-slate-500 mt-1">
            {farmer.village}, {farmer.district}, {farmer.state}
          </p>

          <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start text-xs font-semibold">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
              {language === 'hi' ? 'कुल भूमि: 4.5 एकड़' : 'Total Land: 4.5 Acres'}
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
              {language === 'hi' ? 'मुख्य फसल: सोयाबीन व गेहूं' : 'Primary Crops: Soybean, Wheat'}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileBadge2 className="w-5 h-5 text-emerald-600" />
          <span>{t('fpSubtitle', 'Your verified government registry records')}</span>
        </h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label={t('fpName', 'Full Name')}
              value={farmer.name}
              disabled
              icon={User}
              helperText={language === 'hi' ? 'आधार कार्ड के अनुसार' : 'Locked to Aadhaar identity'}
            />

            <FormInput
              label={t('fpAadhaar', 'Aadhaar Card')}
              value={farmer.aadhaar}
              disabled
              icon={ShieldCheck}
              helperText={language === 'hi' ? 'गोपनीय एवं सुरक्षित' : 'Masked for security'}
            />

            <FormInput
              label={t('fpPhone', 'Mobile Number')}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={Phone}
              required
            />

            <FormInput
              label={language === 'hi' ? 'गांव / कस्बा' : 'Village / Locality'}
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              icon={MapPin}
              required
            />
          </div>

          {/* Bank DBT Details */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              <span>{t('fpBankDetails', 'Direct Benefit Bank Account (DBT)')}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">{language === 'hi' ? 'बैंक का नाम' : 'Bank Name'}</span>
                <span className="font-bold text-slate-800 text-sm">{farmer.bankName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{language === 'hi' ? 'खाता संख्या' : 'Account Number'}</span>
                <span className="font-bold text-slate-800 text-sm">{farmer.accountNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block">{t('fpIfsc', 'IFSC Code')}</span>
                <span className="font-bold text-slate-800 text-sm">{farmer.ifsc}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {language === 'hi'
                ? 'मुआवजा राशि इसी बैंक खाते में DBT के माध्यम से भेजी जाती है।'
                : 'All insurance payouts are automatically transferred here via Aadhaar PFMS gateway.'}
            </p>
          </div>

          {/* Registered Land Records */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{t('fpLandRecords', 'Registered Land Holdings')}</span>
            </h4>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <div className="p-3 bg-slate-50/70 font-semibold flex justify-between">
                <span>Plot #1: Khasra 142/A/2 (Patan, Satara)</span>
                <span className="text-emerald-700">3.5 Acres • Insured</span>
              </div>
              <div className="p-3 bg-white font-semibold flex justify-between">
                <span>Plot #2: Khasra 89/1/B (Patan, Satara)</span>
                <span className="text-emerald-700">1.0 Acre • Insured</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'hi' ? 'प्रोफ़ाइल सफलतापूर्वक सुरक्षित की गई!' : 'Profile saved successfully!'}</span>
              </span>
            ) : <div />}

            <Button
              type="submit"
              variant="primary"
              icon={Save}
              className="shadow-md shadow-emerald-700/20"
            >
              {language === 'hi' ? 'बदलाव सुरक्षित करें' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
