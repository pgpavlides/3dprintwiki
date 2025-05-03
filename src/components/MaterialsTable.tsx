import React, { useState } from 'react';
import type { MaterialProperties } from '../types/materials';
import { ProgressBar } from './ProgressBar';

interface MaterialsTableProps {
  materials: MaterialProperties[];
}

export const MaterialsTable: React.FC<MaterialsTableProps> = ({ materials }) => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);

  const toggleMaterialSelection = (materialName: string) => {
    setSelectedMaterials(prev =>
      prev.includes(materialName)
        ? prev.filter(name => name !== materialName)
        : [...prev, materialName]
    );
  };

  const startComparison = () => {
    if (selectedMaterials.length > 1) {
      setComparisonMode(true);
    }
  };

  const filteredMaterials = comparisonMode
    ? materials.filter(m => selectedMaterials.includes(m.name))
    : materials;

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="sticky left-0 bg-gray-100 p-2 text-left font-bold text-gray-700 border-b w-32">
              Properties
            </th>
            {filteredMaterials.map(material => (
              <th key={material.name} className="p-2 text-center border-b min-w-[80px] max-w-[120px]">
                <div className="font-bold text-gray-900 text-xs">{material.name}</div>
                <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {material.description}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Compare Selection Row */}
          {!comparisonMode && (
            <tr className="bg-gray-50">
              <td className="sticky left-0 bg-gray-50 p-2">
                <button
                  onClick={startComparison}
                  disabled={selectedMaterials.length < 2}
                  className={`px-2 py-1 rounded text-white font-medium text-xs ${
                    selectedMaterials.length < 2
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  Compare Selected
                </button>
              </td>
              {materials.map(material => (
                <td key={material.name} className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material.name)}
                    onChange={() => toggleMaterialSelection(material.name)}
                    className="h-3 w-3 text-blue-600 rounded focus:ring-blue-500"
                  />
                </td>
              ))}
            </tr>
          )}

          {/* Ultimate Strength */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Ultimate Strength
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 border-b">
                <ProgressBar
                  value={material.ultimateStrength.barValue}
                  max={material.ultimateStrength.barMax}
                  color="blue"
                  label={`${material.ultimateStrength.value} ${material.ultimateStrength.unit}`}
                />
              </td>
            ))}
          </tr>

          {/* Stiffness */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Stiffness
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 border-b">
                <ProgressBar
                  value={material.stiffness.value}
                  max={10}
                  color="red"
                  label={`${material.stiffness.value}${material.stiffness.unit}`}
                />
              </td>
            ))}
          </tr>

          {/* Durability */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Durability
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 border-b">
                <ProgressBar
                  value={material.durability.value}
                  max={10}
                  color="purple"
                  label={`${material.durability.value}${material.durability.unit}`}
                />
              </td>
            ))}
          </tr>

          {/* Max Service Temperature */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Max Service Temp
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.maxServiceTemp.value}{material.maxServiceTemp.unit}
              </td>
            ))}
          </tr>

          {/* Density */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Density
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.density.value} {material.density.unit}
              </td>
            ))}
          </tr>

          {/* Price */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Price (per kg)
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.price.currency}{material.price.range}
              </td>
            ))}
          </tr>

          {/* Printability */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Printability
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 border-b">
                <ProgressBar
                  value={material.printability.value}
                  max={10}
                  color="green"
                  label={`${material.printability.value}${material.printability.unit}`}
                />
              </td>
            ))}
          </tr>

          {/* Extruder Temperature */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Extruder Temp
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.extruderTemp.range}{material.extruderTemp.unit}
              </td>
            ))}
          </tr>

          {/* Bed Temperature */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Bed Temperature
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.bedTemp.range}{material.bedTemp.unit}
              </td>
            ))}
          </tr>

          {/* Heated Bed */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Heated Bed
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                <span className={material.heatedBed === 'Required' ? 'text-red-600 font-medium' : 'text-green-600'}>
                  {material.heatedBed}
                </span>
              </td>
            ))}
          </tr>

          {/* Build Surfaces */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Build Surfaces
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.buildSurfaces.join(', ')}
              </td>
            ))}
          </tr>

          {/* Other Requirements */}
          <tr className="hover:bg-gray-50">
            <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
              Other Requirements
            </td>
            {filteredMaterials.map(material => (
              <td key={material.name} className="p-2 text-center border-b text-xs">
                {material.otherRequirements.join(', ')}
              </td>
            ))}
          </tr>

          {/* Characteristics */}
          {Object.keys(materials[0].characteristics).map(characteristic => (
            <tr key={characteristic} className="hover:bg-gray-50">
              <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                {characteristic.replace(/([A-Z])/g, ' $1').trim()}
              </td>
              {filteredMaterials.map(material => (
                <td key={material.name} className="p-2 text-center border-b">
                  {material.characteristics[characteristic as keyof typeof material.characteristics] ? (
                    <span className="text-green-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300 text-lg">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {comparisonMode && (
        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setComparisonMode(false);
              setSelectedMaterials([]);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Exit Comparison Mode
          </button>
        </div>
      )}
    </div>
  );
};
