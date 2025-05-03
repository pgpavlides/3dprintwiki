import React from 'react';
import type { ComponentProps } from '../types/components';
import { FaCog, FaWrench, FaBox, FaBookmark, FaLightbulb } from 'react-icons/fa';

interface ComponentCardProps {
  component: ComponentProps;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-950 shadow-lg dark:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-indigo-500/10">
        {/* Background gradients */}
        <div className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>
        <div className="absolute -right-16 -bottom-16 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70"></div>

        {/* Image Section */}
        {component.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={component.image}
              alt={component.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
          </div>
        )}

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 dark:bg-white p-2">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-30"></div>
                <FaCog className="h-8 w-8 text-indigo-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {component.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-slate-400">{component.category}</span>
                  {component.specifications.length > 0 && (
                    <>
                      <span className="inline-block h-1 w-1 rounded-full bg-gray-400 dark:bg-slate-400"></span>
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        {component.specifications.length} options
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button className="group/save flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-900 transition-colors hover:bg-gray-200 dark:hover:bg-slate-800">
              <FaBookmark className="h-5 w-5 text-gray-400 dark:text-slate-400 transition-colors group-hover/save:text-indigo-500" />
            </button>
          </div>

          {/* Main Properties */}
          <div className="mt-6 flex flex-wrap gap-2">
            {component.specifications.slice(0, 3).map((spec, index) => (
              <span key={index} className="inline-flex items-center gap-1 rounded-lg bg-indigo-500/10 px-3 py-1 text-sm text-indigo-500">
                <FaBox className="h-4 w-4" />
                {spec.size}
              </span>
            ))}
            {component.specifications.length > 3 && (
              <span className="inline-flex items-center gap-1 rounded-lg bg-purple-500/10 px-3 py-1 text-sm text-purple-500">
                +{component.specifications.length - 3} more
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-gray-600 dark:text-slate-400 line-clamp-2">
            {component.description}
          </p>

          {/* Details List */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                <FaWrench className="h-4 w-4 text-indigo-500" />
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                <span className="font-medium text-gray-700 dark:text-slate-300">Installation:</span>{' '}
                {component.installationMethod.slice(0, 100)}...
              </p>
            </div>
            
            {component.commonUses.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <FaCog className="h-4 w-4 text-indigo-500" />
                </div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  <span className="font-medium text-gray-700 dark:text-slate-300">Common Uses:</span>{' '}
                  {component.commonUses.slice(0, 3).join(', ')}
                  {component.commonUses.length > 3 && ` and ${component.commonUses.length - 3} more`}
                </p>
              </div>
            )}

            {component.tips && component.tips.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
                  <FaLightbulb className="h-4 w-4 text-indigo-500" />
                </div>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                  <span className="font-medium text-gray-700 dark:text-slate-300">Quick Tip:</span>{' '}
                  {component.tips[0]}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <button className="group/btn relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-px font-semibold text-white">
              <div className="relative rounded-xl bg-white dark:bg-slate-950 px-4 py-3 transition-all duration-300 group-hover/btn:bg-opacity-0 dark:group-hover/btn:bg-opacity-0">
                <span className="relative flex items-center justify-center gap-2">
                  View Details
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
