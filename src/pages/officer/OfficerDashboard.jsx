import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Table } from '../../components/common/Table';
import {
  districtClaimsData,
  monthlyDisbursementTrend,
} from '../../data/mockAnalytics';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import {
  LayoutDashboard,
  Clock,
  Satellite,
  AlertTriangle,
  Banknote,
  ArrowRight,
  Eye,
  CheckCircle2,
  FileCheck,
  Layers,
} from 'lucide-react';

export const OfficerDashboard = () => {
  const { language, t } = useLanguage();
  const { officer, claims } = useAuth();
  const navigate = useNavigate();

  const pendingClaims = claims.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review' || c.status === 'satellite_verified'
  );

  const columns = [
    {
      header: 'Claim ID',
      accessor: 'id',
      render: (item) => (
        <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-1 rounded">
          {item.id}
        </span>
      ),
    },
    {
      header: 'Farmer Name',
      accessor: 'farmerName',
      render: (item) => (
        <div>
          <p className="font-bold text-xs text-slate-900">{item.farmerName}</p>
          <p className="text-[11px] text-slate-400">{item.village}, {item.district}</p>
        </div>
      ),
    },
    {
      header: 'Crop & Disaster',
      accessor: 'crop',
      render: (item) => (
        <div>
          <span className="font-semibold text-xs text-slate-800">{item.crop}</span>
          <span className="text-[11px] block text-rose-600 truncate max-w-[150px]">
            {item.disasterType}
          </span>
        </div>
      ),
    },
    {
      header: 'Loss Score (AI)',
      accessor: 'damagePercentage',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xs text-amber-600">
            {item.damagePercentage}%
          </span>
          <span className="text-[10px] text-slate-400">({item.aiConfidence}% match)</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: 'Action',
      accessor: 'action',
      render: (item) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`/officer/claims/${item.id}/review`)}
          className="text-xs py-1 px-2.5"
        >
          {t('odActionReview', 'Review')}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Officer Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{officer.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('odTitle', 'Officer Command Center')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {officer.name} • {officer.designation} ({officer.district})
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => navigate('/officer/claims')}
            icon={Eye}
            className="font-bold shadow-md shadow-emerald-700/20"
          >
            {t('navAllClaims', 'All Claims Queue')}
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate('/officer/damage-assessment')}
            icon={Layers}
          >
            {t('navDamageAssessment', 'Damage Assessment')}
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('odTotalPending', 'Claims Awaiting Review')}
          value="18"
          subtitle={language === 'hi' ? 'समीक्षा हेतु कतार में' : 'Active review pipeline'}
          icon={Clock}
          colorScheme="amber"
        />

        <StatCard
          title={t('odAutoVerified', 'AI Pre-Verified')}
          value="142"
          subtitle={language === 'hi' ? '90%+ उपग्रह मिलान' : 'Sentinel-2 >90% match'}
          icon={Satellite}
          colorScheme="emerald"
        />

        <StatCard
          title={t('odHighRisk', 'Discrepancy Alerts')}
          value="4"
          subtitle={language === 'hi' ? 'खेत मुआयना अनुशंसित' : 'Flagged for field visit'}
          icon={AlertTriangle}
          colorScheme="purple"
        />

        <StatCard
          title={t('odDisbursedThisMonth', 'Disbursed This Month')}
          value="₹94.1 L"
          subtitle={language === 'hi' ? 'प्रत्यक्ष लाभ हस्तांतरण' : 'Total approved DBT'}
          icon={Banknote}
          colorScheme="blue"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Claims Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{t('oaClaimsByDistrict', 'Claims by District')}</h3>
              <p className="text-xs text-slate-500">Distribution across Western Maharashtra & MP zones</p>
            </div>
            <Link to="/officer/analytics" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Details →
            </Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtClaimsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="district" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="claims" fill="#16a34a" radius={[6, 6, 0, 0]} name="Received" />
                <Bar dataKey="approved" fill="#0284c7" radius={[6, 6, 0, 0]} name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Payout Trend Line Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{t('oaMonthlyPayouts', 'Monthly Payout Trend (₹ Cr)')}</h3>
              <p className="text-xs text-slate-500">Fast-track satellite DBT settlements</p>
            </div>
            <Link to="/officer/reports" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
              Audit Logs →
            </Link>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyDisbursementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="amountCr" stroke="#ea580c" strokeWidth={3} dot={{ r: 4 }} name="Amount (₹ Cr)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Priority Claim Verification Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'समीक्षा हेतु उच्च प्राथमिकता के दावे' : 'Priority Claims Pending Audit'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'hi' ? 'उपग्रह डेटा विश्लेषित, अधिकारी अनुमोदन प्रतीक्षित' : 'Satellite imagery verified, awaiting final disbursement order'}
            </p>
          </div>

          <Link
            to="/officer/claims"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी देखें' : 'View Full Queue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <Table columns={columns} data={pendingClaims} />
      </div>
    </div>
  );
};
