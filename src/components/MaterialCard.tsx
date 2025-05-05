import React from 'react';
import type { MaterialProperties } from '../types/materials';
import { FaThermometerHalf, FaCog, FaStar, FaBookmark } from 'react-icons/fa';

interface MaterialCardProps {
  material: MaterialProperties;
  onCompare?: (material: MaterialProperties) => void;
  isSelected?: boolean;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, onCompare, isSelected }) => {
  // Calculate a rating based on printability (simplified)
  const rating = Math.min(5, Math.round(material.printability.value / 2));
  
  return (
    <div className="group relative h-full">
      <div
        className={`relative h-full overflow-hidden rounded-xl bg-white dark:bg-slate-950 shadow-md dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-blue-500/10 ${
          isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        {/* Background gradients */}
        <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/0 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"
        ></div>
        <div
          className="absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/0 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"
        ></div>

        <div className="relative p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div
                className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white p-2"
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"
                ></div>
                <span className="text-3xl font-bold text-blue-500">
                  {material.name.substring(0, 3).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {material.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-slate-400">Standard Filament</span>
                  <span
                    className="inline-block h-1 w-1 rounded-full bg-gray-400 dark:bg-slate-400"
                  ></span>
                  <div className="flex items-center gap-1">
                    <FaStar className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-gray-600 dark:text-slate-400">{rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {onCompare && (
              <button
                onClick={() => onCompare(material)}
                className={`group/save flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  isSelected ? 'bg-blue-500/20' : 'bg-gray-100 dark:bg-slate-900'
                } hover:bg-gray-200 dark:hover:bg-slate-800`}
              >
                <FaBookmark
                  className={`h-5 w-5 transition-colors ${
                    isSelected ? 'text-blue-500' : 'text-gray-400 dark:text-slate-400 group-hover/save:text-blue-500'
                  }`}
                />
              </button>
            )}
          </div>

          {/* Main Properties */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-500"
            >
              <FaCog className="h-4 w-4" />
              {material.printability.value}{material.printability.unit} printability
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-lg bg-orange-500/10 px-3 py-1 text-sm text-orange-500"
            >
              <FaThermometerHalf className="h-4 w-4" />
              {material.maxServiceTemp.value}{material.maxServiceTemp.unit} max
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-sm ${
                material.heatedBed === 'Required' 
                  ? 'bg-red-500/10 text-red-500' 
                  : 'bg-green-500/10 text-green-500'
              }`}
            >
              Bed: {material.heatedBed}
            </span>
          </div>

          {/* Properties List */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10"
              >
                <svg
                  className="h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span className="font-medium text-gray-700 dark:text-slate-300">Strength:</span>{' '}
                {material.ultimateStrength.value} {material.ultimateStrength.unit}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10"
              >
                <svg
                  className="h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span className="font-medium text-gray-700 dark:text-slate-300">Extruder:</span>{' '}
                {material.extruderTemp.range}{material.extruderTemp.unit} • 
                <span className="font-medium text-gray-700 dark:text-slate-300"> Bed:</span>{' '}
                {material.bedTemp.range}{material.bedTemp.unit}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10"
              >
                <svg
                  className="h-4 w-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span className="font-medium text-gray-700 dark:text-slate-300">Density:</span>{' '}
                {material.density.value} {material.density.unit} •
                <span className="font-medium text-gray-700 dark:text-slate-300"> Stiffness:</span>{' '}
                {material.stiffness.value} {material.stiffness.unit}
              </p>
            </div>
          </div>

          {/* Characteristics */}
          {Object.keys(material.characteristics).length > 0 && (
            <div className="mt-4 h-12 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {Object.entries(material.characteristics)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <span
                      key={key}
                      className="inline-flex items-center rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500"
                    >
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex-grow">
            <button
              className="group/btn relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-px font-semibold text-white"
            >
              <div
                className="relative rounded-lg bg-white dark:bg-slate-950 px-3 py-2 text-xs transition-all duration-300 group-hover/btn:bg-opacity-0 dark:group-hover/btn:bg-opacity-0"
              >
                <span className="relative flex items-center justify-center gap-2">
                  View Details
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
