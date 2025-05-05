import React from 'react';
import type { EsunMaterialProperties } from '../types/esunMaterials';
import { FaThermometerHalf, FaTint, FaPrint, FaBox, FaRuler } from 'react-icons/fa';

interface EsunMaterialCardProps {
  material: EsunMaterialProperties;
}

export const EsunMaterialCard: React.FC<EsunMaterialCardProps> = ({ material }) => {
  // Calculate rating based on printability (0-10 scale)
  const printabilityRating = parseFloat(material.properties.printability.split('/')[0]) || 5;
  const rating = (printabilityRating / 2).toFixed(1); // Convert to 5-star scale
  
  return (
    <div className="group relative h-full">
      <div className="relative h-full overflow-hidden rounded-xl bg-white dark:bg-slate-950 shadow-md dark:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-emerald-500/10">
        {/* Background gradients */}
        <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/0 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>
        <div className="absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/0 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>

        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-white p-2">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>
                <FaPrint className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {material.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-gray-600 dark:text-slate-400">eSun</span>
                  <span className="inline-block h-1 w-1 rounded-full bg-gray-400 dark:bg-slate-400"></span>
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="text-xs text-gray-600 dark:text-slate-400">{rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Properties */}
          <div className="mt-4 flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-xs text-emerald-500">
              <FaRuler className="h-3 w-3" />
              {material.properties.tensileStrength} MPa
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-orange-500/10 px-2 py-1 text-xs text-orange-500">
              <FaThermometerHalf className="h-3 w-3" />
              {material.properties.heatDistortion !== '/' ? material.properties.heatDistortion + '°C' : 'N/A'}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-2 py-1 text-xs text-blue-500">
              <FaPrint className="h-3 w-3" />
              {material.properties.printability}
            </span>
          </div>

          {/* Properties List */}
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-slate-400">
                <span className="font-medium text-gray-700 dark:text-slate-300">Print:</span>{' '}
                {material.printerSettings.printTemp}°C • 
                <span className="font-medium text-gray-700 dark:text-slate-300"> Bed:</span>{' '}
                {material.printerSettings.bedTemp}°C
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 mt-0.5">
                <svg className="h-3 w-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-slate-400">
                <span className="font-medium text-gray-700 dark:text-slate-300">Speed:</span>{' '}
                {material.printerSettings.printSpeed} mm/s • 
                <span className="font-medium text-gray-700 dark:text-slate-300"> Fan:</span>{' '}
                {material.printerSettings.fanSpeed}
              </p>
            </div>
          </div>

          {/* Characteristics */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-1">
              {material.characteristics.heatResistance && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-red-500/10 px-2 py-1 text-xs font-medium text-red-500">
                  <FaThermometerHalf className="h-3 w-3" />
                  Heat Resistant
                </span>
              )}
              {material.characteristics.waterproof && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500">
                  <FaTint className="h-3 w-3" />
                  Waterproof
                </span>
              )}
              {material.characteristics.flexibility && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-500">
                  <FaRuler className="h-3 w-3" />
                  Flexible
                </span>
              )}
              {material.characteristics.needHeatBed && (
                <span className="inline-flex items-center gap-1 rounded-lg bg-orange-500/10 px-2 py-1 text-xs font-medium text-orange-500">
                  <FaBox className="h-3 w-3" />
                  Heat Bed Required
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4">
            <button className="group/btn relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 p-px font-semibold text-white">
              <div className="relative rounded-lg bg-white dark:bg-slate-950 px-3 py-2 text-xs transition-all duration-300 group-hover/btn:bg-opacity-0 dark:group-hover/btn:bg-opacity-0">
                <span className="relative flex items-center justify-center gap-1">
                  View Details
                  <svg className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
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
