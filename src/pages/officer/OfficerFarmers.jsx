import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockFarmers } from '../../data/mockFarmers';
import { Table } from '../../components/common/Table';
import { FormInput } from '../../components/common/FormInput';
import { Button } from '../../components/common/Button';
import {
  Users,
  Search,
  Phone,
  ShieldCheck,
  MapPin,
  Sprout,
  ExternalLink,
} from 'lucide-react';

export const OfficerFarmers = () => {
  const { language, t } = useLanguage();
  const [search, setSearch] = useState('');

  const filteredFarmers = mockFarmers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.nameHindi && f.nameHindi.includes(search)) ||
      f.district.toLowerCase().includes(search.toLowerCase()) ||
      f.village.toLowerCase().includes(search.toLowerCase()) ||
      f.phone.includes(search)
  );

  const columns = [
    {
      header: 'Farmer ID',
      accessor: 'id',
      render: (item) => (
        <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">
          {item.id}
        </span>
      ),
    },
    {
      header: 'Farmer Name',
      accessor: 'name',
      render: (item) => (
        <div>
          <p className="font-bold text-xs text-slate-900">
            {item.name} {item.nameHindi && <span className="text-slate-400 font-normal">({item.nameHindi})</span>}
          </p>
          <p className="text-[11px] text-slate-500">{item.phone}</p>
        </div>
      ),
    },
    {
      header: 'Village / District',
      accessor: 'village',
      render: (item) => (
        <div>
          <span className="font-semibold text-xs text-slate-800">{item.village}</span>
          <span className="text-[11px] block text-slate-400">{item.district}, {item.state}</span>
        </div>
      ),
    },
    {
      header: 'Land Holding',
      accessor: 'landHoldingAcres',
      render: (item) => (
        <div>
          <span className="font-bold text-xs text-slate-800">{item.landHoldingAcres} Acres</span>
          <span className="text-[11px] block text-slate-500 font-mono">Khasra #{item.khasraNumber}</span>
        </div>
      ),
    },
    {
      header: 'Crops Cultivated',
      accessor: 'cropType',
      render: (item) => (
        <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
          {item.cropType}
        </span>
      ),
    },
    {
      header: 'Disbursed (DBT)',
      accessor: 'totalDisbursed',
      render: (item) => (
        <span className="font-bold text-xs text-slate-900">{item.totalDisbursed}</span>
      ),
    },
    {
      header: 'Registry Status',
      accessor: 'status',
      render: (item) => (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3 h-3" />
          <span>{item.status}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('navFarmers', 'Farmers Directory')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? 'क्षेत्रीय पंजीकृत किसानों की सूची, भू-अभिलेख एवं पूर्व दावा इतिहास'
              : 'Verified PMFBY farmer records, Aadhaar-linked land parcels, and payout summaries'}
          </p>
        </div>

        <div className="w-full sm:w-72">
          <FormInput
            placeholder={language === 'hi' ? 'किसान, गांव या फोन खोजें...' : 'Search Name, Village, Phone...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <Table columns={columns} data={filteredFarmers} />
      </div>
    </div>
  );
};
