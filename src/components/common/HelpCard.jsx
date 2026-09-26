import React from 'react';
import { Phone, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from './Button';

export const HelpCard = ({ className = '' }) => {
  const { language } = useLanguage();

  return (
    <div className={`bg-gradient-to-br from-emerald-800 to-slate-900 text-white rounded-3xl p-6 shadow-md relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-emerald-500/10 pointer-events-none blur-xl" />

      <div className="relative z-10">
        <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-400/20">
          {language === 'hi' ? 'किसान सहायता केंद्र (24x7)' : 'Kisan Support Desk (24x7)'}
        </span>

        <h3 className="text-xl font-extrabold mb-1">
          {language === 'hi' ? 'कोई परेशानी या सवाल है?' : 'Need Help With Your Claim?'}
        </h3>
        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          {language === 'hi'
            ? 'हमारे कृषि विशेषज्ञ और कॉल सेंटर अधिकारी आपकी सहायता के लिए तैयार हैं।'
            : 'Speak directly with our agricultural officers or call toll-free for immediate assistance.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="tel:18001801551"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-xs"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>1800-180-1551 (Toll-Free)</span>
          </a>

          <a
            href="https://wa.me/9118001801551"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl text-xs transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'hi' ? 'व्हाट्सएप चैट' : 'WhatsApp Support'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
