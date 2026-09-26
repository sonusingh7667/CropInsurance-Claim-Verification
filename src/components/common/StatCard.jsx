import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = 'emerald', // 'emerald' | 'amber' | 'blue' | 'purple'
  className = '',
}) => {
  const schemes = {
    emerald: {
      bg: 'bg-emerald-50/70 border-emerald-200/60',
      iconBg: 'bg-emerald-600 text-white',
      valueColor: 'text-emerald-950',
    },
    amber: {
      bg: 'bg-amber-50/70 border-amber-200/60',
      iconBg: 'bg-amber-600 text-white',
      valueColor: 'text-amber-950',
    },
    blue: {
      bg: 'bg-blue-50/70 border-blue-200/60',
      iconBg: 'bg-blue-600 text-white',
      valueColor: 'text-blue-950',
    },
    purple: {
      bg: 'bg-purple-50/70 border-purple-200/60',
      iconBg: 'bg-purple-600 text-white',
      valueColor: 'text-purple-950',
    },
  };

  const scheme = schemes[colorScheme] || schemes.emerald;

  return (
    <div className={`p-5 rounded-2xl border ${scheme.bg} shadow-xs flex items-start justify-between ${className}`}>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
        <p className={`text-2xl sm:text-3xl font-extrabold mt-1.5 ${scheme.valueColor}`}>{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>}
        {trend && (
          <span className="inline-block mt-2 text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>

      {Icon && (
        <div className={`w-12 h-12 rounded-xl ${scheme.iconBg} flex items-center justify-center shadow-xs shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};
