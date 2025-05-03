import React, { useState } from 'react';
import type { MaterialProperties } from '../types/materials';
import { MaterialCard } from './MaterialCard';

interface MaterialsGridProps {
  materials: MaterialProperties[];
}

export const MaterialsGrid: React.FC<MaterialsGridProps> = ({ materials }) => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const toggleMaterialSelection = (material: MaterialProperties) => {
    setSelectedMaterials(prev =>
      prev.includes(material.name)
        ? prev.filter(name => name !== material.name)
        : [...prev, material.name]
    );
  };

  const startComparison = () => {
    if (selectedMaterials.length > 1) {
      setComparisonMode(true);
    }
  };

  const exitComparison = () => {
    setComparisonMode(false);
    setSelectedMaterials([]);
  };

  const filteredMaterials = comparisonMode
    ? materials.filter(m => selectedMaterials.includes(m.name))
    : materials;

  return (
    <div className="w-full">
      {!comparisonMode && selectedMaterials.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-between">
          <span className="text-blue-700 dark:text-blue-300">
            {selectedMaterials.length} material{selectedMaterials.length !== 1 ? 's' : ''} selected for comparison
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedMaterials([])}
              className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              Clear Selection
            </button>
            <button
              onClick={startComparison}
              disabled={selectedMaterials.length < 2}
              className={`px-4 py-2 text-sm rounded-lg text-white font-medium ${
                selectedMaterials.length < 2
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Compare Selected
            </button>
          </div>
        </div>
      )}

      {comparisonMode && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-between">
          <span className="text-green-700 dark:text-green-300">
            Comparing {selectedMaterials.length} materials
          </span>
          <button
            onClick={exitComparison}
            className="px-4 py-2 text-sm bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            Exit Comparison
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(material => (
          <MaterialCard
            key={material.name}
            material={material}
            onCompare={!comparisonMode ? toggleMaterialSelection : undefined}
            isSelected={selectedMaterials.includes(material.name)}
          />
        ))}
      </div>
    </div>
  );
};
