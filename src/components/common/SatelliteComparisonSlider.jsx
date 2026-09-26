import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Satellite, Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

export const SatelliteComparisonSlider = ({
  beforeImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
  afterImage = "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200",
  beforeLabel,
  afterLabel,
  ndviBefore = 0.78,
  ndviAfter = 0.22,
  damagePercentage = 74,
  satelliteDate = "15 Aug 2026",
  cloudCover = "2.1%",
}) => {
  const { language, t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-2xl text-xs">
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-100">
            {language === 'hi' ? 'सेंटिनल-2 उपग्रह स्कैन (10 मीटर रिज़ॉल्यूशन)' : 'Sentinel-2 Satellite Verification (10m)'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span>{language === 'hi' ? `स्कैन तिथि: ${satelliteDate}` : `Acquired: ${satelliteDate}`}</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400 font-medium">
            {language === 'hi' ? `बादल: ${cloudCover}` : `Cloud: ${cloudCover}`}
          </span>
        </div>
      </div>

      {/* Main Interactive Slider Box */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden select-none cursor-ew-resize border-2 border-slate-800 shadow-xl bg-slate-950"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt="Post-disaster Satellite View"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* After Label Badge (Top-Right) */}
        <div className="absolute top-4 right-4 z-10 bg-slate-900/85 backdrop-blur-md text-rose-300 px-3 py-1.5 rounded-full text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          {afterLabel || (language === 'hi' ? 'आपदा के बाद (नुकसान)' : 'Post-Disaster (Loss)')}
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Pre-disaster Satellite View"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw',
              maxWidth: 'none',
            }}
          />
          {/* Before Label Badge (Top-Left) */}
          <div className="absolute top-4 left-4 z-10 bg-slate-900/85 backdrop-blur-md text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {beforeLabel || (language === 'hi' ? 'आपदा से पहले (स्वस्थ फसल)' : 'Pre-Disaster (Healthy)')}
          </div>
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-800 shadow-xl border-2 border-emerald-600 flex items-center justify-center">
            <MoveHorizontal className="w-4 h-4 text-emerald-700" />
          </div>
        </div>

        {/* Drag Helper Tip on Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md text-white text-[11px] px-3.5 py-1 rounded-full pointer-events-none flex items-center gap-1.5">
          <MoveHorizontal className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'hi' ? 'तस्वीर तुलना हेतु स्लाइडर को बाएं-दाएं खींचें' : 'Drag slider left/right to compare'}</span>
        </div>
      </div>

      {/* Bottom Spectral Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-emerald-800">
              {language === 'hi' ? 'आपदा पूर्व फसल स्वास्थ्य (NDVI)' : 'Pre-Disaster Crop Health'}
            </p>
            <p className="text-lg font-bold text-emerald-700">{ndviBefore} (Healthy)</p>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
        </div>

        <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-rose-800">
              {language === 'hi' ? 'आपदा उपरांत फसल स्वास्थ्य (NDVI)' : 'Post-Disaster Crop Health'}
            </p>
            <p className="text-lg font-bold text-rose-700">{ndviAfter} (Damaged)</p>
          </div>
          <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs" />
        </div>

        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-amber-800">
              {language === 'hi' ? 'एआई प्रमाणित क्षति' : 'AI Verified Damage'}
            </p>
            <p className="text-lg font-bold text-amber-700">{damagePercentage}% Loss</p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-amber-600" />
        </div>
      </div>
    </div>
  );
};
