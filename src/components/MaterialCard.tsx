import React from 'react';
import type { MaterialProperties } from '../types/materials';

interface MaterialCardProps {
  material: MaterialProperties;
  onCompare?: (material: MaterialProperties) => void;
  isSelected?: boolean;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({ material, onCompare, isSelected }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{material.name}</h3>
        {onCompare && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCompare(material)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
          />
        )}
      </div>
      
      <p className="text-gray-600 mb-4">{material.description}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Properties</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="text-gray-600">Strength:</span>{' '}
              <span className="font-medium">{material.ultimateStrength.value} {material.ultimateStrength.unit}</span>
            </li>
            <li>
              <span className="text-gray-600">Printability:</span>{' '}
              <span className="font-medium">{material.printability.value}{material.printability.unit}</span>
            </li>
            <li>
              <span className="text-gray-600">Max Temp:</span>{' '}
              <span className="font-medium">{material.maxServiceTemp.value}{material.maxServiceTemp.unit}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Print Settings</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="text-gray-600">Extruder:</span>{' '}
              <span className="font-medium">{material.extruderTemp.range}{material.extruderTemp.unit}</span>
            </li>
            <li>
              <span className="text-gray-600">Bed:</span>{' '}
              <span className="font-medium">{material.bedTemp.range}{material.bedTemp.unit}</span>
            </li>
            <li>
              <span className="text-gray-600">Heated Bed:</span>{' '}
              <span className={`font-medium ${material.heatedBed === 'Required' ? 'text-red-600' : 'text-green-600'}`}>
                {material.heatedBed}
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      {Object.keys(material.characteristics).length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Characteristics</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(material.characteristics)
              .filter(([_, value]) => value)
              .map(([key]) => (
                <span
                  key={key}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
