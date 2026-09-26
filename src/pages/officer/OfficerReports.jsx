import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../../components/common/Button';
import { Table } from '../../components/common/Table';
import {
  FileSpreadsheet,
  Download,
  FileCheck,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
} from 'lucide-react';

export const OfficerReports = () => {
  const { language, t } = useLanguage();
  const [downloadAlert, setDownloadAlert] = useState('');

  const handleDownload = (reportName) => {
    setDownloadAlert(reportName);
    setTimeout(() => setDownloadAlert(''), 3500);
  };

  const reportPacks = [
    {
      title: 'Weekly PMFBY Satellite Verification Summary',
      period: 'Week 34 (15 Aug - 22 Aug 2026)',
      type: 'Executive Dossier',
      format: 'PDF (2.4 MB)',
      records: '480 Claims Audited',
    },
    {
      title: 'Direct Benefit Transfer (DBT) Sanction Mandate',
      period: 'August 2026 Batch 03',
      type: 'PFMS Bank Mandate',
      format: 'Excel / CSV (890 KB)',
      records: '₹94,10,000 Disbursed',
    },
    {
      title: 'Taluka Field Inspection Discrepancy Log',
      period: 'Kharif 2026 Cumulative',
      type: 'Quality Assurance Audit',
      format: 'PDF (1.8 MB)',
      records: '18 Field Inspections',
    },
    {
      title: 'High-Risk Heavy Rainfall & Flood Impact Register',
      period: 'Satara & Vidisha Clusters',
      type: 'Sentinel-2 Geo-Audit',
      format: 'GeoJSON & Shapefile',
      records: '14,200 Affected Acres',
    },
  ];

  const auditLogs = [
    {
      id: 'LOG-881',
      date: '2026-08-18 11:20 AM',
      officer: 'Dr. Anjali Deshmukh',
      action: 'Sanctioned Payout for Claim #CS-2026-8891 (₹48,500)',
      status: 'Signed',
    },
    {
      id: 'LOG-880',
      date: '2026-08-18 10:45 AM',
      officer: 'System AI Engine',
      action: 'Sentinel-2 pass completed for Satara cluster (Cloud 2.1%)',
      status: 'Automated',
    },
    {
      id: 'LOG-879',
      date: '2026-08-17 04:10 PM',
      officer: 'Dr. Anjali Deshmukh',
      action: 'Dispatched Field Inspection for Claim #CS-2026-7730',
      status: 'Dispatched',
    },
    {
      id: 'LOG-878',
      date: '2026-08-16 02:15 PM',
      officer: 'PFMS DBT Gateway',
      action: 'Transferred ₹32,000 for Claim #CS-2026-8892',
      status: 'Settled',
    },
  ];

  const logColumns = [
    {
      header: 'Log ID',
      accessor: 'id',
      render: (item) => <span className="font-mono font-bold text-xs text-slate-700">{item.id}</span>,
    },
    {
      header: 'Timestamp',
      accessor: 'date',
      render: (item) => <span className="text-xs text-slate-500">{item.date}</span>,
    },
    {
      header: 'Actor / Officer',
      accessor: 'officer',
      render: (item) => <span className="text-xs font-bold text-slate-900">{item.officer}</span>,
    },
    {
      header: 'Audit Action',
      accessor: 'action',
      render: (item) => <span className="text-xs text-slate-700">{item.action}</span>,
    },
    {
      header: 'Verification',
      accessor: 'status',
      render: (item) => (
        <span className="text-[11px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('navReports', 'Reports & Official PMFBY Audits')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === 'hi'
              ? 'आधिकारिक उपग्रह रिपोर्ट, बैंक भुगतान अधिदेश एवं डिजिटल हस्ताक्षर लॉग'
              : 'Official statutory compliance exports, PFMS payment orders, and audit trail'}
          </p>
        </div>

        <Button
          variant="primary"
          icon={Printer}
          onClick={() => window.print()}
          className="self-start sm:self-auto text-xs"
        >
          Print Current View
        </Button>
      </div>

      {downloadAlert && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Generating and downloading "{downloadAlert}"...</span>
        </div>
      )}

      {/* Available Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportPacks.map((report, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full">
                  {report.type}
                </span>
                <span className="text-xs font-mono text-slate-400">{report.format}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900">{report.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{report.period}</p>
              <p className="text-xs font-semibold text-emerald-700 mt-2">{report.records}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={() => handleDownload(report.title)}
                className="w-full text-xs"
              >
                Download Report ({report.format.split(' ')[0]})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          <span>Immutable Statutory Audit Trail</span>
        </h3>
        <Table columns={logColumns} data={auditLogs} />
      </div>
    </div>
  );
};
