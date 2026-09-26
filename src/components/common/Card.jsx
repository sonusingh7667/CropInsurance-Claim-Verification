import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  badge,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 transition-all duration-200 ${
        hoverable ? 'hover:shadow-md hover:border-slate-300 cursor-pointer hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {badge && (
        <div className="mb-3">
          {badge}
        </div>
      )}
      {children}
    </div>
  );
};
