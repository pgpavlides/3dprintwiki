import React from 'react';
import type { BambuMaterialProperties } from '../types/bambuMaterials';

interface BambuMaterialCardProps {
  material: BambuMaterialProperties;
}

export const BambuMaterialCard: React.FC<BambuMaterialCardProps> = ({ material }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{material.name}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Properties</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="text-gray-600">Toughness:</span>{' '}
              <span className="font-medium">{material.properties.toughness}</span>
            </li>
            <li>
              <span className="text-gray-600">Strength:</span>{' '}
              <span className="font-medium">{material.properties.strength}</span>
            </li>
            <li>
              <span className="text-gray-600">Heat Resistance:</span>{' '}
              <span className="font-medium">{material.properties.heatResistance}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Print Settings</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="text-gray-600">Nozzle Temp:</span>{' '}
              <span className="font-medium">{material.printerSettings.nozzleTemperature}</span>
            </li>
            <li>
              <span className="text-gray-600">Print Speed:</span>{' '}
              <span className="font-medium">{material.printerSettings.printSpeed}</span>
            </li>
            <li>
              <span className="text-gray-600">Enclosure:</span>{' '}
              <span className={`font-medium ${material.printerSettings.enclosureRequired === 'Required' ? 'text-red-600' : 'text-green-600'}`}>
                {material.printerSettings.enclosureRequired}
              </span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700 mb-2">Requirements</h4>
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            material.preprinting.dryingRequired === 'Required' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            Drying: {material.preprinting.dryingRequired}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            material.postprinting.sealWithDesiccant === 'Required' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            Seal: {material.postprinting.sealWithDesiccant}
          </span>
        </div>
      </div>
    </div>
  );
};
