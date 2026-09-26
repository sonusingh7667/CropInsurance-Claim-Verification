import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { Button } from '../../components/common/Button';
import { LanguageSwitcher } from '../../components/common/LanguageSwitcher';
import { Sprout, Phone, ShieldCheck, CheckCircle2, KeyRound } from 'lucide-react';

export const FarmerLogin = () => {
  const { language, t } = useLanguage();
  const { farmerLogin } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('9823144021');
  const [otp, setOtp] = useState('1234');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      farmerLogin({ phone });
      navigate('/farmer/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      {/* Top right language switcher */}
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Sprout className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">CropSure</span>
        </Link>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          {language === 'hi' ? 'किसान लॉगिन / पंजीकरण' : 'Farmer Login & Verification'}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          {language === 'hi' ? 'मोबाइल नंबर अथवा आधार से सुरक्षित लॉगिन' : 'Direct OTP access to your crop insurance records'}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl border border-slate-200/80 rounded-3xl sm:px-10">
          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <FormInput
                label={language === 'hi' ? 'मोबाइल नंबर दर्ज करें' : 'Enter 10-digit Mobile Number'}
                placeholder="98231 44021"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={Phone}
                required
                type="tel"
                helperText={language === 'hi' ? 'आपके आधार से जुड़ा नंबर' : 'Aadhaar or PMFBY registered mobile'}
              />

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'डेमो के लिए यह नंबर पहले से भरा है। सीधे "ओटीपी प्राप्त करें" पर क्लिक करें।'
                    : 'Pre-filled demo credentials. Click "Send OTP" to proceed.'}
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold shadow-md shadow-emerald-700/20"
              >
                {language === 'hi' ? 'ओटीपी प्राप्त करें' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <p className="text-xs text-slate-500 mb-2">
                  {language === 'hi' ? `ओटीपी भेजा गया: +91 ${phone}` : `OTP sent to: +91 ${phone}`}
                </p>
                <FormInput
                  label={language === 'hi' ? '4-अंकीय ओटीपी दर्ज करें' : 'Enter 4-Digit OTP'}
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  icon={KeyRound}
                  required
                  type="number"
                  helperText={language === 'hi' ? 'डेमो ओटीपी: 1234' : 'Demo OTP: 1234'}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full font-bold shadow-md shadow-emerald-700/20"
              >
                {language === 'hi' ? 'सत्यापित करें एवं डैशबोर्ड खोलें' : 'Verify & Open Dashboard'}
              </Button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                {language === 'hi' ? '← मोबाइल नंबर बदलें' : '← Change Mobile Number'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <Link
              to="/officer/login"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {language === 'hi' ? 'बीमा अधिकारी लॉगिन करें →' : 'Are you an Insurance Officer? Login here →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
