import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/common/FormInput';
import { Select } from '../../components/common/Select';
import { FileUpload } from '../../components/common/FileUpload';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  Sprout,
  Calendar,
  MapPin,
  AlertTriangle,
  Camera,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  FileCheck,
} from 'lucide-react';

export const SubmitClaim = () => {
  const { language, t } = useLanguage();
  const { farmer, addClaim } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdClaimId, setCreatedClaimId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    crop: 'Soybean',
    cropHindi: 'सोयाबीन',
    district: farmer.district || 'Satara',
    village: farmer.village || 'Patan',
    surveyNumber: '142/A/2',
    areaAcres: '3.0',
    disasterType: 'Unseasonal Heavy Rainfall & Waterlogging',
    disasterTypeHindi: 'अतिवृष्टि एवं जलभराव',
    dateOfIncident: new Date().toISOString().split('T')[0],
    damagePercentage: '70',
    description: 'Continuous heavy rains for 3 days caused complete waterlogging in the lower half of the field.',
    photos: [],
    declared: true,
  });

  const crops = [
    { value: 'Soybean', label: language === 'hi' ? 'सोयाबीन (Soybean)' : 'Soybean' },
    { value: 'Wheat', label: language === 'hi' ? 'गेहूं (Wheat)' : 'Wheat' },
    { value: 'Cotton', label: language === 'hi' ? 'कपास (Cotton)' : 'Cotton' },
    { value: 'Paddy / Rice', label: language === 'hi' ? 'धान / चावल (Paddy)' : 'Paddy / Rice' },
    { value: 'Mustard', label: language === 'hi' ? 'सरसों (Mustard)' : 'Mustard' },
    { value: 'Sugarcane', label: language === 'hi' ? 'गन्ना (Sugarcane)' : 'Sugarcane' },
    { value: 'Chilli / Spices', label: language === 'hi' ? 'मिर्च / मसाले (Chilli)' : 'Chilli / Spices' },
  ];

  const disasterTypes = [
    {
      value: 'Unseasonal Heavy Rainfall & Waterlogging',
      label: language === 'hi' ? 'अतिवृष्टि एवं जलभराव (Heavy Rainfall & Flooding)' : 'Unseasonal Heavy Rainfall & Waterlogging',
    },
    {
      value: 'Severe Hailstorm & Lodging',
      label: language === 'hi' ? 'ओलावृष्टि एवं फसल गिरना (Hailstorm)' : 'Severe Hailstorm & Lodging',
    },
    {
      value: 'Prolonged Drought & Moisture Stress',
      label: language === 'hi' ? 'सूखा एवं वर्षा की कमी (Drought)' : 'Prolonged Drought & Moisture Stress',
    },
    {
      value: 'Pest Infestation / Disease Attack',
      label: language === 'hi' ? 'कीट या बीमारी का प्रकोप (Pest Infestation)' : 'Pest Infestation / Disease Attack',
    },
    {
      value: 'Flash Flooding / Bund Breach',
      label: language === 'hi' ? 'अचानक बाढ़ या तटबंध टूटना (Flash Flood)' : 'Flash Flooding / Bund Breach',
    },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Calculate estimated loss compensation
      const estimatedAmt = Math.round(Number(formData.areaAcres) * 16000 * (Number(formData.damagePercentage) / 100));

      const newClaim = addClaim({
        ...formData,
        estimatedLoss: estimatedAmt,
      });

      setIsSubmitting(false);
      setCreatedClaimId(newClaim.id);
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Title & Step Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full">
          {language === 'hi' ? 'प्रधानमंत्री फसल बीमा योजना' : 'PMFBY Claim Filing'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          {t('scTitle', 'Submit Crop Damage Claim')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('scSubtitle', 'Simple 4-step process. No technical knowledge required.')}
        </p>

        {/* Wizard Step Indicator */}
        <div className="mt-6">
          <ProgressBar
            value={currentStep}
            max={4}
            size="md"
            colorScheme="emerald"
            label={
              currentStep === 1
                ? t('scStep1', '1. Land & Crop')
                : currentStep === 2
                ? t('scStep2', '2. Damage Cause')
                : currentStep === 3
                ? t('scStep3', '3. Photos (Optional)')
                : t('scStep4', '4. Review & Confirm')
            }
            valueText={`Step ${currentStep} of 4`}
          />
        </div>
      </div>

      {/* Main Step Content */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        {/* STEP 1: Land & Crop */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sprout className="w-5 h-5 text-emerald-600" />
              <span>{language === 'hi' ? 'खेत और फसल की जानकारी' : 'Select Farm Plot & Crop'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label={t('scCropName', 'Crop Name')}
                options={crops}
                value={formData.crop}
                onChange={(e) => {
                  const selectedCrop = crops.find((c) => c.value === e.target.value);
                  handleChange('crop', e.target.value);
                }}
                required
              />

              <FormInput
                label={t('scLandArea', 'Damaged Land Area (in Acres)')}
                type="number"
                step="0.1"
                placeholder="e.g. 3.0"
                value={formData.areaAcres}
                onChange={(e) => handleChange('areaAcres', e.target.value)}
                required
              />

              <FormInput
                label={t('scDistrict', 'District')}
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                icon={MapPin}
                required
              />

              <FormInput
                label={t('scVillage', 'Village / Tehsil')}
                value={formData.village}
                onChange={(e) => handleChange('village', e.target.value)}
                required
              />

              <div className="sm:col-span-2">
                <FormInput
                  label={t('scSurveyNumber', 'Khasra / Land Survey Number')}
                  placeholder="e.g. 142/A/2"
                  value={formData.surveyNumber}
                  onChange={(e) => handleChange('surveyNumber', e.target.value)}
                  helperText={
                    language === 'hi'
                      ? 'अपनी खतौनी या भू-अभिलेख से देखकर दर्ज करें।'
                      : 'Used by Sentinel-2 satellites to locate your farm boundaries.'
                  }
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Damage Cause */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{language === 'hi' ? 'नुकसान का कारण और अनुमान' : 'What Caused the Damage?'}</span>
            </h3>

            <Select
              label={t('scDisasterType', 'What caused the damage?')}
              options={disasterTypes}
              value={formData.disasterType}
              onChange={(e) => handleChange('disasterType', e.target.value)}
              required
            />

            <FormInput
              label={t('scDisasterDate', 'Date of Incident / Loss')}
              type="date"
              value={formData.dateOfIncident}
              onChange={(e) => handleChange('dateOfIncident', e.target.value)}
              icon={Calendar}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t('scDamageExtent', 'Estimated Crop Loss (%)')}
                </label>
                <span className="text-base font-extrabold text-amber-600">
                  {formData.damagePercentage}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={formData.damagePercentage}
                onChange={(e) => handleChange('damagePercentage', e.target.value)}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>10% (Minor)</span>
                <span>50% (Half Damaged)</span>
                <span>100% (Complete Loss)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                {t('scDisasterDesc', 'Describe what happened in simple words')}
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'जैसे: 3 दिन लगातार बारिश से खेत में 2 फीट पानी भर गया और पौधे गल गए।'
                    : 'e.g. 3 days of torrential rain left standing water, rotting roots.'
                }
                className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Photos (Optional) */}
        {currentStep === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Camera className="w-5 h-5 text-emerald-600" />
              <span>{t('scUploadPhotos', 'Upload Field Photos or Videos (Optional)')}</span>
            </h3>

            <p className="text-xs text-slate-500">
              {t(
                'scUploadHelper',
                'You can take photos directly from your phone camera. This helps support your claim faster.'
              )}
            </p>

            <FileUpload
              onChange={(files) => handleChange('photos', files)}
              helperText={
                language === 'hi'
                  ? 'फोटो वैकल्पिक है। यदि उपलब्ध न हो, तो भी उपग्रह स्कैन से दावा सत्यापित हो जाएगा।'
                  : 'Photos are optional. Our satellites will still verify your field automatically.'
              }
            />
          </div>
        )}

        {/* STEP 4: Review & Confirm */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              <span>{language === 'hi' ? 'विवरण की जांच और अंतिम पुष्टि' : 'Review & Final Confirmation'}</span>
            </h3>

            {/* Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs space-y-3">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block">{t('scCropName', 'Crop Name')}</span>
                  <span className="font-bold text-slate-900 text-sm">{formData.crop}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('scLandArea', 'Affected Area')}</span>
                  <span className="font-bold text-slate-900 text-sm">{formData.areaAcres} Acres</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{language === 'hi' ? 'स्थान' : 'Location'}</span>
                  <span className="font-bold text-slate-900">{formData.village}, {formData.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{t('scSurveyNumber', 'Khasra No.')}</span>
                  <span className="font-bold text-slate-900">{formData.surveyNumber}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 block">{language === 'hi' ? 'नुकसान का कारण' : 'Disaster Cause'}</span>
                  <span className="font-bold text-rose-700">{formData.disasterType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{language === 'hi' ? 'अनुमानित क्षति' : 'Estimated Loss'}</span>
                  <span className="font-bold text-amber-600 text-sm">{formData.damagePercentage}%</span>
                </div>
              </div>
            </div>

            {/* Bank & Aadhaar verification strip */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{language === 'hi' ? 'सत्यापित प्रत्यक्ष लाभ हस्तांतरण (DBT) खाता' : 'Direct Benefit Bank Account'}</span>
              </div>
              <p className="text-emerald-800">
                {farmer.bankName} (A/C: {farmer.accountNumber}) • Aadhaar: {farmer.aadhaar}
              </p>
              <p className="text-[11px] text-emerald-700">
                {language === 'hi'
                  ? 'स्वीकृति मिलने पर सहायता राशि सीधे इसी खाते में जमा की जाएगी।'
                  : 'Compensation will be directly credited to this Aadhaar-linked account.'}
              </p>
            </div>

            {/* Declaration Checkbox */}
            <label className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.declared}
                onChange={(e) => handleChange('declared', e.target.checked)}
                className="mt-1 h-4 w-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
              />
              <span className="text-xs text-slate-700 font-medium">
                {t(
                  'scDeclareText',
                  'I hereby confirm that all information provided is accurate to the best of my knowledge.'
                )}
              </span>
            </label>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              icon={ArrowLeft}
              disabled={isSubmitting}
            >
              {t('back', 'Back')}
            </Button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              className="ml-auto"
            >
              <span className="mr-1">{t('next', 'Next Step')}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={!formData.declared}
              className="ml-auto font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-700/20 px-6"
            >
              {language === 'hi' ? 'दावा अंतिम रूप से जमा करें' : 'Confirm & Submit Claim'}
            </Button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate(`/farmer/claims/${createdClaimId}/track`);
        }}
        title={t('scSuccessTitle', 'Claim Submitted Successfully!')}
        maxWidth="max-w-md"
      >
        <div className="text-center py-2">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h4 className="text-lg font-bold text-slate-900">
            {language === 'hi' ? 'दावा पंजीकरण क्रमांक' : 'Claim ID Generated'}
          </h4>
          <p className="text-2xl font-mono font-extrabold text-emerald-700 mt-1 mb-2">
            {createdClaimId}
          </p>

          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            {t(
              'scSuccessMsg',
              'Your claim number is generated. Satellite analysis will begin automatically.'
            )}
          </p>

          <div className="flex flex-col gap-2.5">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setShowSuccessModal(false);
                navigate(`/farmer/claims/${createdClaimId}/track`);
              }}
              className="w-full font-bold"
            >
              {t('trackClaim', 'Track Claim Status')}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/farmer/claims');
              }}
              className="w-full"
            >
              {language === 'hi' ? 'मेरे सभी दावे देखें' : 'View My Claims List'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
