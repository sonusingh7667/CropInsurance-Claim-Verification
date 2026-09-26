import React, { useState } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FileUpload = ({
  label,
  helperText,
  accept = 'image/*',
  maxFiles = 3,
  onChange,
  className = '',
}) => {
  const { language } = useLanguage();
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const newFiles = [...files, ...selected].slice(0, maxFiles);
      setFiles(newFiles);
      if (onChange) onChange(newFiles);
    }
  };

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-slate-800 mb-1.5">
          {label}
        </label>
      )}

      <div className="relative border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 rounded-2xl p-6 text-center transition-all cursor-pointer group">
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-105 transition-transform">
            <Camera className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {language === 'hi' ? 'फोटो खींचें या गैलरी से चुनें' : 'Take a photo or choose from gallery'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi' ? 'खेत की स्पष्ट तस्वीरें (अधिकतम 3)' : 'Clear photos of affected crop area (max 3)'}
          </p>
        </div>
      </div>

      {helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>}

      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {files.map((file, i) => (
            <div
              key={i}
              className="relative flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 shadow-2xs"
            >
              <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[140px] font-medium">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-slate-400 hover:text-rose-500 ml-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
