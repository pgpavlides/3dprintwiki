import React from 'react';
import type { ComponentProps } from '../types/components';

interface ComponentCardProps {
  component: ComponentProps;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      {component.image && (
        <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg overflow-hidden">
          <img
            src={component.image}
            alt={component.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{component.name}</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">{component.category}</p>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{component.description}</p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Specifications</h4>
            <div className="grid grid-cols-1 gap-1 text-sm">
              {component.specifications.slice(0, 3).map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{spec.size}</span>
                  <span className="text-gray-800 dark:text-gray-200">{spec.material}</span>
                </div>
              ))}
              {component.specifications.length > 3 && (
                <div className="text-blue-600 dark:text-blue-400">+{component.specifications.length - 3} more options</div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Common Uses</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {component.commonUses.slice(0, 3).map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Installation</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {component.installationMethod}
            </p>
          </div>

          {component.tips && component.tips.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Quick Tips</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                {component.tips.slice(0, 2).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
