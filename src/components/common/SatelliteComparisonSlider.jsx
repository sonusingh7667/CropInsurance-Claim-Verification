
import React, { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

export const SatelliteComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After"
}) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="space-y-3">
      <div className="relative h-80 md:h-[430px] overflow-hidden rounded-2xl bg-slate-900">
        <img src={afterImage} alt="After satellite image"
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}>
          <img src={beforeImage} alt="Before satellite image"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: '100%', minWidth: '100%', maxWidth: 'none' }} />
        </div>
        <span className="absolute top-3 left-3 bg-emerald-700 text-white px-3 py-1 rounded-full text-xs">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 bg-rose-700 text-white px-3 py-1 rounded-full text-xs">
          {afterLabel}
        </span>
        <div className="absolute top-0 bottom-0 w-1 bg-white"
          style={{ left: `${position}%` }}>
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-slate-800 p-2 shadow">
            <MoveHorizontal size={20}/>
          </div>
        </div>
        <input aria-label="Compare satellite images" type="range"
          min="0" max="100" value={position}
          onChange={e => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"/>
      </div>
      <p className="text-center text-xs text-slate-500">
        Drag the slider left or right to compare satellite images.
      </p>
    </div>
  );
};
