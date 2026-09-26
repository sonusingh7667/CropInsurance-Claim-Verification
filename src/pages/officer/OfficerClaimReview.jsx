import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { SatelliteComparisonSlider } from '../../components/common/SatelliteComparisonSlider';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowLeft,
  Satellite,
  User,
  MapPin,
  Calendar,
  Building2,
  Landmark,
  FileCheck,
} from 'lucide-react';

export const OfficerClaimReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { claims, updateClaimStatus } = useAuth();

  const claim = claims.find((c) => c.id === id) || claims[0];

  const [remarks, setRemarks] = useState(claim.officerRemarks || '');
  const [modalAction, setModalAction] = useState(null); // 'approve' | 'reject' | 'inspect' | null
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusUpdatedAlert, setStatusUpdatedAlert] = useState(false);

  const handleActionConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let nextStatus = claim.status;
      if (modalAction === 'approve') nextStatus = 'approved';
      if (modalAction === 'reject') nextStatus = 'rejected';
      if (modalAction === 'inspect') nextStatus = 'under_review';

      updateClaimStatus(claim.id, nextStatus, remarks);
      setIsProcessing(false);
      setModalAction(null);
      setStatusUpdatedAlert(true);
      setTimeout(() => setStatusUpdatedAlert(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div>
        <button
          type="button"
          onClick={() => navigate('/officer/claims')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? '← सभी दावों की कतार पर लौटें' : '← Back to Claims Queue'}</span>
        </button>
      </div>

      {statusUpdatedAlert && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Claim status and audit trail successfully updated!</span>
        </div>
      )}

      {/* Main Review Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-slate-900 text-white px-2.5 py-1 rounded-md">
                {claim.id}
              </span>
              <StatusBadge status={claim.status} size="lg" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
              {language === 'hi' ? 'दावा ऑडिट एवं अनुमोदन सत्यापन' : 'Claim Verification & Payout Approval'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Farmer: <strong className="text-slate-700">{claim.farmerName}</strong> • {claim.village}, {claim.district}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              onClick={() => setModalAction('approve')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              {t('odActionApprove', 'Approve Payout')}
            </Button>

            <Button
              variant="outline"
              size="sm"
              icon={AlertTriangle}
              onClick={() => setModalAction('inspect')}
              className="text-amber-700 border-amber-300 hover:bg-amber-50"
            >
              {language === 'hi' ? 'फील्ड मुआयना भेजें' : 'Request Field Visit'}
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={XCircle}
              onClick={() => setModalAction('reject')}
            >
              {t('odActionReject', 'Reject Claim')}
            </Button>
          </div>
        </div>

        {/* Satellite Imagery Verification Component */}
        <div className="mt-6 pt-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Satellite className="w-4 h-4 text-purple-600" />
              <span>{language === 'hi' ? 'सेंटिनल-2 उपग्रह तुलनात्मक साक्ष्य' : 'Sentinel-2 Satellite Proof & Loss Assessment'}</span>
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/officer/claims/${claim.id}/satellite`)}
              className="text-xs py-1"
            >
              {language === 'hi' ? 'मल्टी-स्पेक्ट्रल विश्लेषण खोलें →' : 'Deep Spectral Analysis →'}
            </Button>
          </div>

          <SatelliteComparisonSlider
            beforeImage={claim.satelliteImages.before}
            afterImage={claim.satelliteImages.after}
            beforeLabel={language === 'hi' ? 'आपदा पूर्व' : 'Pre-Disaster'}
            afterLabel={language === 'hi' ? 'आपदा उपरांत' : 'Post-Disaster'}
            ndviBefore={claim.satelliteImages.ndviBefore}
            ndviAfter={claim.satelliteImages.ndviAfter}
            damagePercentage={claim.damagePercentage}
            satelliteDate={claim.satelliteImages.satellitePassDate}
            cloudCover={claim.satelliteImages.cloudCover}
          />
        </div>

        {/* Claim Dossier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100 text-xs">
          <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">
              {language === 'hi' ? 'दावा एवं भूमि विवरण' : 'Claim & Land Dossier'}
            </h4>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Crop Insured:</span>
              <span className="font-bold text-slate-900">{claim.crop}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Affected Area:</span>
              <span className="font-bold text-slate-900">{claim.areaAcres} Acres</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Survey / Khasra:</span>
              <span className="font-mono font-bold text-slate-900">{claim.surveyNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Claim Amount:</span>
              <span className="font-bold text-emerald-700">₹{claim.estimatedLoss.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">AI Verified Loss:</span>
              <span className="font-extrabold text-amber-600">{claim.damagePercentage}%</span>
            </div>
          </div>

          <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">
              {language === 'hi' ? 'ऑडिट टिप्पणी एवं अधिकारी निर्देश' : 'Official Audit Notes'}
            </h4>
            <div>
              <label className="block text-slate-500 mb-1.5 font-medium">
                {t('odReasonPrompt', 'Enter official remarks / audit note')}:
              </label>
              <textarea
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter remarks for sanction order or justification for rejection..."
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        title={
          modalAction === 'approve'
            ? 'Confirm Payout Approval'
            : modalAction === 'reject'
            ? 'Confirm Claim Rejection'
            : 'Schedule Physical Field Visit'
        }
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            {modalAction === 'approve'
              ? `Are you sure you want to approve compensation of ₹${claim.estimatedLoss.toLocaleString('en-IN')} for claim ${claim.id}? Direct Benefit Transfer will be initiated.`
              : modalAction === 'reject'
              ? `Are you sure you want to reject claim ${claim.id}? A formal rejection notice with spectral data will be sent to the farmer.`
              : `Flag claim ${claim.id} for Taluka agricultural officer physical inspection. A field audit task will be dispatched.`}
          </p>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => setModalAction(null)}>
              {t('cancel', 'Cancel')}
            </Button>
            <Button
              variant={modalAction === 'approve' ? 'primary' : modalAction === 'reject' ? 'danger' : 'secondary'}
              size="sm"
              isLoading={isProcessing}
              onClick={handleActionConfirm}
            >
              {t('confirm', 'Confirm Action')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
