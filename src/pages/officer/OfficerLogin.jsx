import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { Button } from '../../components/common/Button';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import { ShieldCheck, Lock, UserCheck, ArrowRight, Building2 } from 'lucide-react';

export const OfficerLogin = () => {
  const { language, t } = useLanguage();
  const { officerLogin } = useAuth();
  const navigate = useNavigate();

  const [officerId, setOfficerId] = useState('OFF-MH-401');
  const [password, setPassword] = useState('GovtPass@2026');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      officerLogin({ officerId });
      navigate('/officer/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-white">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 mx-auto mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {language === 'hi' ? 'नोडल अधिकारी एवं प्रशासक लॉगिन' : 'Officer Command & Verification Portal'}
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          {language === 'hi' ? 'पीएमएफबीवाई उपग्रह सत्यापन व दावा स्वीकृति सेल' : 'PMFBY Remote Sensing & Automated Claim Audit Wing'}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-800/90 py-8 px-6 shadow-2xl border border-slate-700 rounded-3xl sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label={language === 'hi' ? 'अधिकारी पहचान संख्या (Officer ID)' : 'Officer Government ID'}
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              icon={UserCheck}
              required
              className="text-slate-900"
            />

            <FormInput
              label={language === 'hi' ? 'पासवर्ड' : 'Security Password'}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700 text-xs text-emerald-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'डेमो क्रेडेंशियल पहले से दर्ज हैं। सीधे "लॉगिन करें" बटन दबाएं।'
                  : 'Pre-filled demo credentials. Click "Authenticate & Enter" to proceed.'}
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            >
              {language === 'hi' ? 'प्रमाणीकृत करें एवं प्रवेश लें' : 'Authenticate & Enter Portal'}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-700 text-center">
            <Link
              to="/farmer/login"
              className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {language === 'hi' ? '← किसान पोर्टल पर जाएं' : '← Switch to Farmer Portal'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
