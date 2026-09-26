import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FormInput } from '../../components/common/FormInput';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  Calculator,
  Layers,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Percent,
} from 'lucide-react';

export const OfficerDamageAssessment = () => {
  const { language, t } = useLanguage();

  const [thresholdYield, setThresholdYield] = useState('2400'); // Kg/Ha
  const [actualYield, setActualYield] = useState('680'); // Kg/Ha (Satellite estimated)
  const [sumInsured, setSumInsured] = useState('60000'); // Rs/Ha
  const [hectares, setHectares] = useState('1.5');
  const [crop, setCrop] = useState('Soybean');

  const ty = parseFloat(thresholdYield) || 1;
  const ay = parseFloat(actualYield) || 0;
  const si = parseFloat(sumInsured) || 0;
  const ha = parseFloat(hectares) || 1;

  // PMFBY Formula: Shortfall % = (TY - AY) / TY
  const shortfallRatio = Math.max(0, Math.min(1, (ty - ay) / ty));
  const shortfallPercentage = Math.round(shortfallRatio * 100);
  const payoutPerHectare = Math.round(shortfallRatio * si);
  const totalPayout = Math.round(payoutPerHectare * ha);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-200">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>PMFBY Standard Operational Guidelines (SOG) Formula</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('daTitle', 'Automated Crop Damage Assessment Engine')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('daSubtitle', 'Spectral Loss Estimation & Settlement Formula Calculator')}
        </p>
      </div>

      {/* Formula Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
          Statutory PMFBY Yield Shortfall Equation
        </h3>
        <div className="p-4 bg-slate-800/80 rounded-2xl font-mono text-sm sm:text-base text-emerald-300 overflow-x-auto">
          Compensation = [ (Threshold Yield - Satellite Actual Yield) / Threshold Yield ] × Sum Insured × Area
        </div>
      </div>

      {/* Interactive Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Crop & Spectral Yield Parameters</span>
          </h3>

          <div className="space-y-4">
            <FormInput
              label={t('daThresholdYield', 'Threshold Yield (Kg/Ha)')}
              type="number"
              value={thresholdYield}
              onChange={(e) => setThresholdYield(e.target.value)}
              helperText="Benchmark average yield for the notified insurance unit."
              required
            />

            <FormInput
              label={t('daActualYield', 'Satellite Estimated Actual Yield (Kg/Ha)')}
              type="number"
              value={actualYield}
              onChange={(e) => setActualYield(e.target.value)}
              helperText="Derived from Sentinel-2 Peak NDVI & Biomass modeling."
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label={t('daSumInsured', 'Sum Insured (₹/Ha)')}
                type="number"
                value={sumInsured}
                onChange={(e) => setSumInsured(e.target.value)}
                required
              />

              <FormInput
                label="Insured Area (Hectares)"
                type="number"
                step="0.1"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Real-time Calculation Result Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Automated Settlement Calculation</span>
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <span className="text-xs text-slate-500 block">Calculated Crop Loss Shortfall</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-amber-600">
                    {shortfallPercentage}%
                  </span>
                  <span className="text-xs text-slate-400">
                    ({ty - ay} Kg/Ha deficit)
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar value={shortfallPercentage} size="md" colorScheme="amber" />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-xs font-semibold text-emerald-800 block">
                  {t('daCalculatedPayout', 'Calculated Total Compensation')}
                </span>
                <span className="text-3xl font-black text-emerald-700 mt-1 block">
                  ₹{totalPayout.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-600 mt-1 block">
                  ₹{payoutPerHectare.toLocaleString('en-IN')} per hectare across {ha} Ha
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ready for Direct Benefit Transfer sanction memo creation.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
