import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import {
  User,
  ShieldCheck,
  Building2,
  MapPin,
  CheckCircle2,
  LogOut,
  KeyRound,
  FileCheck2,
  Mail,
  Phone,
} from 'lucide-react';

export const OfficerProfile = () => {
  const { language, t } = useLanguage();
  const { officer, officerLogout, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    officerLogout();
    navigate('/officer/login');
  };

  const handleSwitchFarmer = () => {
    setRole('farmer');
    navigate('/farmer/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={officer.avatar}
            alt={officer.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-slate-900/10 shadow-md"
          />
          <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-1 rounded-full shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ID: {officer.id}</span>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900">{officer.name}</h1>
          <p className="text-xs text-slate-600 font-semibold mt-0.5">{officer.designation}</p>
          <p className="text-xs text-slate-500 mt-1">{officer.department}</p>

          <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start text-xs font-semibold">
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-xl">
              Jurisdiction: {officer.district}
            </span>
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl border border-emerald-200">
              Class-3 Digital Signature Active
            </span>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-emerald-600" />
          <span>Statutory Authority & Credentials</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-slate-400 block font-medium">Government Employee Code</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">{officer.id}</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-slate-400 block font-medium">Official Email</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">anjali.deshmukh@gov.agri.in</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-slate-400 block font-medium">Nodal Clearance Level</span>
            <span className="text-sm font-bold text-emerald-700 mt-0.5 block">Level-2 Sanctioning Authority</span>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl">
            <span className="text-slate-400 block font-medium">Sentinel-2 API Access</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block">Copernicus Hub Token Active</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handleSwitchFarmer}
            className="w-full sm:w-auto"
          >
            {language === 'hi' ? '← किसान पोर्टल में स्विच करें (डेमो)' : '← Switch to Farmer Portal (Demo)'}
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
            icon={LogOut}
            className="w-full sm:w-auto"
          >
            {t('logout', 'Log Out')}
          </Button>
        </div>
      </div>
    </div>
  );
};
