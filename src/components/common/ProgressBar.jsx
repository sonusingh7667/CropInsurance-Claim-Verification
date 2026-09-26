import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  valueText,
  colorScheme = 'auto', // 'auto' | 'emerald' | 'amber' | 'rose' | 'blue'
  size = 'md',
  showPercentage = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const getColor = () => {
    if (colorScheme !== 'auto') {
      const colors = {
        emerald: 'bg-emerald-600',
        amber: 'bg-amber-500',
        rose: 'bg-rose-600',
        blue: 'bg-blue-600',
      };
      return colors[colorScheme] || 'bg-emerald-600';
    }

    // Auto based on severity
    if (percentage < 33) return 'bg-emerald-500';
    if (percentage < 65) return 'bg-amber-500';
    return 'bg-rose-600';
  };

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage || valueText) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-slate-600">
          {label && <span>{label}</span>}
          <span>{valueText || (showPercentage ? `${percentage}%` : `${value}/${max}`)}</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClasses[size] || heightClasses.md}`}>
        <div
          className={`${getColor()} h-full transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
