import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  districtClaimsData,
  disasterCauseDistribution,
  monthlyDisbursementTrend,
  verificationAccuracyComparison,
} from '../../data/mockAnalytics';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const OfficerAnalytics = () => {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t('oaTitle', 'Regional Risk & Claim Analytics')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {language === 'hi'
            ? 'उपग्रह आधारित फसल क्षति दर, जिलावार दावा रुझान और आपदा कारण सांख्यिकी'
            : 'Spatial crop damage trends, disaster severity distribution, and satellite audit concordance'}
        </p>
      </div>

      {/* Top 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Claims Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{t('oaClaimsByDistrict', 'Claims by District')}</h3>
            <p className="text-xs text-slate-500">Comparison of total received claims vs approved settlements</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtClaimsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="claims" fill="#0284c7" radius={[6, 6, 0, 0]} name="Claims Received" />
                <Bar dataKey="approved" fill="#16a34a" radius={[6, 6, 0, 0]} name="Approved Payouts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disaster Cause Breakdown (Pie Chart) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{t('oaDamageByCause', 'Loss Cause Distribution')}</h3>
            <p className="text-xs text-slate-500">Percentage breakdown by reported natural disaster type</p>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={disasterCauseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name.split('/')[0]} (${(percent * 100).toFixed(0)}%)`}
                >
                  {disasterCauseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Payout Trend Line Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{t('oaMonthlyPayouts', 'Monthly Payout Trend (₹ Cr)')}</h3>
            <p className="text-xs text-slate-500">Kharif & Rabi automated DBT disbursement trajectory</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyDisbursementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="amountCr"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  name="Disbursed (₹ Crores)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satellite vs Field Truth Concordance Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{t('oaAiAccuracyChart', 'Satellite vs Field Audit Concordance')}</h3>
            <p className="text-xs text-slate-500">Cross-validation of Sentinel-2 spectral score vs ground inspection (%)</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={verificationAccuracyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="satellite" fill="#9333ea" radius={[6, 6, 0, 0]} name="Satellite Spectral Index (%)" />
                <Bar dataKey="groundTruth" fill="#ea580c" radius={[6, 6, 0, 0]} name="Field Audit Truth (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
