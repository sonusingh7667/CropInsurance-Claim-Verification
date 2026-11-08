
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SatelliteComparisonSlider } from '../../components/common/SatelliteComparisonSlider';
import { ArrowLeft, Satellite, MapPin, RefreshCw } from 'lucide-react';

export const SatelliteEvidence = () => {
  const navigate = useNavigate();

  const [latitude, setLatitude] = useState('16.20');
  const [longitude, setLongitude] = useState('77.35');
  const [radius, setRadius] = useState('5000');
  const [beforeStart, setBeforeStart] = useState('2026-06-01');
  const [beforeEnd, setBeforeEnd] = useState('2026-10-01');
  const [afterStart, setAfterStart] = useState('2026-10-16');
  const [afterEnd, setAfterEnd] = useState('2026-11-08');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const runAssessment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/satellite-assessments/gee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: Number(latitude),
          longitude: Number(longitude),
          radius_m: Number(radius),
          before_start: beforeStart,
          before_end: beforeEnd,
          after_start: afterStart,
          after_end: afterEnd
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Satellite assessment failed');
      }
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = path => path?.startsWith('http')
    ? path : path;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <button onClick={() => navigate('/farmer/dashboard')}
          className="flex items-center gap-2 text-sm text-slate-600 mb-3">
          <ArrowLeft size={16}/> Back to Dashboard
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Satellite Crop Health Assessment
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Analyze vegetation changes using real Sentinel-2 satellite imagery.
        </p>
      </div>

      <form onSubmit={runAssessment}
        className="bg-white rounded-2xl border p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-slate-800">
          <MapPin className="text-emerald-600"/> Select study location
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="text-sm">Latitude
            <input required type="number" step="any" min="-90" max="90"
              value={latitude} onChange={e => setLatitude(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"/>
          </label>
          <label className="text-sm">Longitude
            <input required type="number" step="any" min="-180" max="180"
              value={longitude} onChange={e => setLongitude(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"/>
          </label>
          <label className="text-sm">Study radius (metres)
            <input required type="number" min="100" max="50000"
              value={radius} onChange={e => setRadius(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1"/>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="font-semibold text-sm">Before date range</p>
            <label className="text-xs">Start
              <input type="date" required value={beforeStart}
                onChange={e => setBeforeStart(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"/>
            </label>
            <label className="text-xs">End
              <input type="date" required value={beforeEnd}
                onChange={e => setBeforeEnd(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"/>
            </label>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-sm">After date range</p>
            <label className="text-xs">Start
              <input type="date" required value={afterStart}
                onChange={e => setAfterStart(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"/>
            </label>
            <label className="text-xs">End
              <input type="date" required value={afterEnd}
                onChange={e => setAfterEnd(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"/>
            </label>
          </div>
        </div>

        <button disabled={loading} type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold rounded-xl px-6 py-3">
          {loading ? <RefreshCw className="animate-spin" size={18}/> : <Satellite size={18}/>}
          {loading ? 'Analyzing satellite images...' : 'Run Satellite Assessment'}
        </button>
      </form>

      {error && (
        <div className="bg-rose-50 text-rose-700 border border-rose-200 p-4 rounded-xl">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-5">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p className="font-bold text-emerald-900">Assessment completed</p>
            <p className="text-sm text-emerald-800">
              Sentinel-2 SR Harmonized · {result.location.latitude}, {result.location.longitude}
              · {result.location.radius_m} m radius
            </p>
          </div>

          <div className="bg-white border rounded-2xl p-4 sm:p-6 space-y-4">
            <h2 className="font-bold text-lg">Satellite image comparison</h2>
            <SatelliteComparisonSlider
              beforeImage={imageUrl(result.before.rgb_image)}
              afterImage={imageUrl(result.after.rgb_image)}
              beforeLabel={`Before · ${result.before.date}`}
              afterLabel={`After · ${result.after.date}`}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[result.before, result.after].map((item, index) => (
                <div key={index} className="border rounded-xl p-4">
                  <p className="font-bold">{index === 0 ? 'Before' : 'After'}</p>
                  <p className="text-sm text-slate-500">{item.date}</p>
                  <p className="text-2xl font-bold text-emerald-700 mt-2">
                    NDVI: {item.mean_ndvi}
                  </p>
                  <p className="text-sm text-slate-500">
                    Cloud cover: {item.cloud_cover.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-2xl p-5 space-y-3">
            <h2 className="font-bold">NDVI vegetation maps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-2">Before · {result.before.date}</p>
                <img src={imageUrl(result.before.ndvi_image)}
                  alt="Before NDVI map" className="w-full rounded-xl"/>
              </div>
              <div>
                <p className="text-sm font-semibold mb-2">After · {result.after.date}</p>
                <img src={imageUrl(result.after.ndvi_image)}
                  alt="After NDVI map" className="w-full rounded-xl"/>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5">
            <p className="text-sm text-slate-300">Relative NDVI decline</p>
            <p className="text-4xl font-bold mt-1">
              {result.relative_ndvi_decline_percent === null
                ? 'Not calculated'
                : `${result.relative_ndvi_decline_percent}%`}
            </p>
            <p className="text-sm text-slate-300 mt-3">
              {result.interpretation}
            </p>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Note: This is a regional study-area assessment. NDVI variation alone
        does not establish insured-field damage. Field boundaries, crop type,
        season and incident timing must be considered.
      </p>
    </div>
  );
};
