import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { Table } from '../../components/common/Table';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { FormInput } from '../../components/common/FormInput';
import { Select } from '../../components/common/Select';
import { Pagination } from '../../components/common/Pagination';
import {
  Search,
  Filter,
  Eye,
  Satellite,
  Download,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

export const OfficerAllClaims = () => {
  const { language, t } = useLanguage();
  const { claims } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const statusOptions = [
    { value: 'all', label: language === 'hi' ? 'सभी स्थितियां' : 'All Statuses' },
    { value: 'submitted', label: language === 'hi' ? 'दावा दर्ज' : 'Submitted' },
    { value: 'under_review', label: language === 'hi' ? 'समीक्षा जारी' : 'Under Review' },
    { value: 'satellite_verified', label: language === 'hi' ? 'उपग्रह सत्यापित' : 'Satellite Verified' },
    { value: 'approved', label: language === 'hi' ? 'स्वीकृत' : 'Approved' },
    { value: 'paid', label: language === 'hi' ? 'मुआवजा प्रदत्त' : 'Paid (DBT)' },
    { value: 'rejected', label: language === 'hi' ? 'अस्वीकृत' : 'Rejected' },
  ];

  const districtOptions = [
    { value: 'all', label: language === 'hi' ? 'सभी जिले' : 'All Districts' },
    { value: 'Satara', label: 'Satara (Maharashtra)' },
    { value: 'Vidisha', label: 'Vidisha (Madhya Pradesh)' },
    { value: 'Ludhiana', label: 'Ludhiana (Punjab)' },
    { value: 'Guntur', label: 'Guntur (Andhra Pradesh)' },
  ];

  const filtered = claims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(search.toLowerCase()) ||
      claim.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      claim.crop.toLowerCase().includes(search.toLowerCase()) ||
      claim.village.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || claim.status === selectedStatus;
    const matchesDistrict = selectedDistrict === 'all' || claim.district === selectedDistrict;

    return matchesSearch && matchesStatus && matchesDistrict;
  });

  const columns = [
    {
      header: 'Claim ID',
      accessor: 'id',
      render: (item) => (
        <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">
          {item.id}
        </span>
      ),
    },
    {
      header: 'Farmer Name & Phone',
      accessor: 'farmerName',
      render: (item) => (
        <div>
          <p className="font-bold text-xs text-slate-900">{item.farmerName}</p>
          <p className="text-[11px] text-slate-500">{item.farmerPhone}</p>
        </div>
      ),
    },
    {
      header: 'District / Village',
      accessor: 'district',
      render: (item) => (
        <div>
          <span className="font-semibold text-xs text-slate-800">{item.district}</span>
          <span className="text-[11px] block text-slate-400">{item.village}</span>
        </div>
      ),
    },
    {
      header: 'Crop & Area',
      accessor: 'crop',
      render: (item) => (
        <div>
          <span className="font-semibold text-xs text-slate-800">{item.crop}</span>
          <span className="text-[11px] block text-slate-500">{item.areaAcres} Acres</span>
        </div>
      ),
    },
    {
      header: 'Claim Value',
      accessor: 'estimatedLoss',
      render: (item) => (
        <span className="font-bold text-xs text-slate-900">
          ₹{item.estimatedLoss.toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      header: 'Loss Score (AI)',
      accessor: 'damagePercentage',
      render: (item) => (
        <span className="font-extrabold text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
          {item.damagePercentage}%
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (item) => <StatusBadge status={item.status} size="sm" />,
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (item) => (
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/officer/claims/${item.id}/review`)}
            title="Review Claim"
            className="text-xs py-1 px-2"
          >
            Review
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate(`/officer/claims/${item.id}/satellite`)}
            title="View Satellite Data"
            icon={Satellite}
            className="text-xs py-1 px-2"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('navAllClaims', 'All Claims Queue')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? 'क्षेत्रीय कृषि व उपग्रह आधारित दावों की संपूर्ण कतार एवं ऑडिट प्रबंधन'
              : 'Centralized registry of claims with automated Sentinel-2 loss evaluation'}
          </p>
        </div>

        <Button
          variant="outline"
          icon={FileSpreadsheet}
          onClick={() => alert('Exporting all claims to Excel / CSV format...')}
          className="self-start sm:self-auto text-xs"
        >
          {language === 'hi' ? 'एक्सेल में एक्सपोर्ट करें' : 'Export Claims (Excel/CSV)'}
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-72">
          <FormInput
            placeholder={language === 'hi' ? 'आईडी, किसान या फसल खोजें...' : 'Search Claim ID, Farmer, Village...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="w-44">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            />
          </div>

          <div className="w-48">
            <Select
              options={districtOptions}
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <Table columns={columns} data={filtered} />
        <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
      </div>
    </div>
  );
};
