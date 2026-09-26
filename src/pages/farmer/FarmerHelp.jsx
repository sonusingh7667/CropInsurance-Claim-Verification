import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HelpCard } from '../../components/common/HelpCard';
import { Button } from '../../components/common/Button';
import {
  Phone,
  MessageCircle,
  HelpCircle,
  MapPin,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const FarmerHelp = () => {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: t('hpFaq1Q', 'Do I need to pay any fee to file a claim?'),
      a: t('hpFaq1A', 'No. Filing a claim on CropSure is 100% free under PMFBY guidelines.'),
    },
    {
      q: t('hpFaq2Q', 'How does the satellite check my farm without visiting?'),
      a: t(
        'hpFaq2A',
        'Sentinel-2 satellites pass over your village every 5 days, taking high-resolution infrared scans that show crop chlorophyll health and standing flood water.'
      ),
    },
    {
      q: t('hpFaq3Q', 'How will I receive the compensation money?'),
      a: t('hpFaq3A', 'Funds are deposited directly into your Aadhaar-linked bank account (DBT) once approved.'),
    },
    {
      q: language === 'hi' ? 'यदि मेरे पास खेत की फोटो न हो तो क्या करें?' : 'What if I do not have a camera or photo?',
      a: language === 'hi'
        ? 'फोटो अनिवार्य नहीं है। उपग्रह ऊपर से आपके खसरा नंबर के आधार पर नुकसान का स्वतः सत्यापन कर लेता है।'
        : 'Photos are optional. Our satellites locate your exact field using your survey number and verify the loss automatically.',
    },
    {
      q: language === 'hi' ? 'दावे का फैसला होने में कितने दिन लगते हैं?' : 'How many days does approval take?',
      a: language === 'hi'
        ? 'उपग्रह विश्लेषण 24 से 48 घंटों में पूरा हो जाता है। अधिकारी की पुष्टि के बाद 3 से 5 कार्यदिवसों में बैंक में राशि भेजी जाती है।'
        : 'Satellite scanning completes in 24 to 48 hours. Upon officer review, direct transfer takes 3 to 5 banking days.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('hpTitle', 'Help & Support')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('hpSubtitle', 'We are here to assist you at every step. Talk to a human.')}
        </p>
      </div>

      {/* Main Support Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HelpCard />

        {/* District Agriculture Office Contact Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-200">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'hi' ? 'स्थानीय सहायता केंद्र' : 'Local District Office'}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{t('hpLocalOffice', 'District Agriculture Office')}</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {t('hpLocalOfficeDesc', 'Opposite Tehsil Complex, Satara, Maharashtra - 415001')}
            </p>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
              <p><strong>Nodal Officer:</strong> Dr. Anjali Deshmukh</p>
              <p><strong>Working Hours:</strong> Mon - Sat, 9:30 AM to 5:30 PM</p>
              <p><strong>Helpline:</strong> 02162-234891</p>
            </div>
          </div>

          <a
            href="tel:02162234891"
            className="w-full inline-flex items-center justify-center gap-2 border-2 border-slate-200 hover:bg-slate-50 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{language === 'hi' ? 'जिला कार्यालय फोन करें' : 'Call District Office'}</span>
          </a>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <FileQuestion className="w-6 h-6 text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">{t('hpFaqTitle', 'Frequently Asked Questions')}</h2>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1 animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
