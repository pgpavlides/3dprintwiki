import React, { useState } from 'react';
import type { MaterialProperties } from '../types/materials';
import { ProgressBar } from './ProgressBar';
import { 
  FaShieldAlt, 
  FaFistRaised, 
  FaRuler, 
  FaThermometerHalf, 
  FaDollarSign,
  FaCog,
  FaFire,
  FaExclamationTriangle,
  FaWater,
  FaCloud,
  FaCube,
  FaCheckCircle,
  FaArrowsAltH,
  FaLayerGroup,
  FaWeight
} from 'react-icons/fa';

interface MaterialsTableProps {
  materials: MaterialProperties[];
}

export const MaterialsTable: React.FC<MaterialsTableProps> = ({ materials }) => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleMaterialSelection = (materialName: string) => {
    setSelectedMaterials(prev =>
      prev.includes(materialName)
        ? prev.filter(name => name !== materialName)
        : [...prev, materialName]
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const filteredMaterials = comparisonMode
    ? materials.filter(m => selectedMaterials.includes(m.name))
    : materials;

  return (
    <div className="w-full overflow-x-auto">
      {/* Section Navigation */}
      <div className="mb-6">
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => toggleSection('properties')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'properties' 
                ? 'bg-blue-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
            }`}
          >
            <FaRuler className="text-xl mb-1" />
            <span className="text-xs font-medium">Properties</span>
          </button>
          <button
            onClick={() => toggleSection('printing')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'printing' 
                ? 'bg-green-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500'
            }`}
          >
            <FaCog className="text-xl mb-1" />
            <span className="text-xs font-medium">Printing</span>
          </button>
          <button
            onClick={() => toggleSection('characteristics')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'characteristics' 
                ? 'bg-purple-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500'
            }`}
          >
            <FaCheckCircle className="text-xl mb-1" />
            <span className="text-xs font-medium">Traits</span>
          </button>
        </div>
        
        {/* Compare Controls */}
        <div className="flex justify-end gap-3">
          {!comparisonMode && (
            <button
              onClick={() => selectedMaterials.length > 1 && setComparisonMode(true)}
              disabled={selectedMaterials.length < 2}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                selectedMaterials.length < 2
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Compare ({selectedMaterials.length})
            </button>
          )}
          
          {comparisonMode && (
            <button
              onClick={() => {
                setComparisonMode(false);
                setSelectedMaterials([]);
              }}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Exit Comparison
            </button>
          )}
        </div>
      </div>

      <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden text-sm">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="sticky left-0 bg-gray-100 dark:bg-gray-700 p-2 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600 w-32">
              Properties
            </th>
            {filteredMaterials.map(material => (
              <th key={material.name} className="p-2 text-center border-b dark:border-gray-600 min-w-[80px] max-w-[120px]">
                <div className="font-bold text-gray-900 dark:text-white text-xs">{material.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {material.description}
                </div>
                {!comparisonMode && (
                  <div className="mt-1 flex justify-center items-center">
                    <label className="custom-checkbox-container">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material.name)}
                        onChange={() => toggleMaterialSelection(material.name)}
                      />
                      <div className="custom-checkmark"></div>
                    </label>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Properties Section */}
          {(expandedSection === 'properties' || expandedSection === null) && (
            <>
              <tr className="bg-blue-50 dark:bg-blue-900">
                <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-blue-900 dark:text-blue-100 text-xs">
                  Material Properties
                </td>
              </tr>
              
              {/* Ultimate Strength */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaFistRaised className="text-red-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Ultimate Strength
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 border-b dark:border-gray-700">
                    <ProgressBar
                      value={material.ultimateStrength.barValue}
                      max={material.ultimateStrength.barMax}
                      color="red"
                      label={`${material.ultimateStrength.value} ${material.ultimateStrength.unit}`}
                    />
                  </td>
                ))}
              </tr>

              {/* Stiffness */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaRuler className="text-purple-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Stiffness
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 border-b dark:border-gray-700">
                    <ProgressBar
                      value={material.stiffness.value}
                      max={10}
                      color="purple"
                      label={`${material.stiffness.value}${material.stiffness.unit}`}
                    />
                  </td>
                ))}
              </tr>

              {/* Durability */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaShieldAlt className="text-blue-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Durability
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 border-b dark:border-gray-700">
                    <ProgressBar
                      value={material.durability.value}
                      max={10}
                      color="blue"
                      label={`${material.durability.value}${material.durability.unit}`}
                    />
                  </td>
                ))}
              </tr>

              {/* Max Service Temperature */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaThermometerHalf className="text-orange-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Max Service Temp
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.maxServiceTemp.value}{material.maxServiceTemp.unit}
                  </td>
                ))}
              </tr>

              {/* Thermal Expansion */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaArrowsAltH className="text-yellow-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Thermal Expansion
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.thermalExpansion.value} {material.thermalExpansion.unit}
                  </td>
                ))}
              </tr>

              {/* Density */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaWeight className="text-gray-600 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Density
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.density.value} {material.density.unit}
                  </td>
                ))}
              </tr>

              {/* Price */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaDollarSign className="text-green-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Price (per kg)
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.price.currency}{material.price.range}
                  </td>
                ))}
              </tr>
            </>
          )}

          {/* Printing Section */}
          {(expandedSection === 'printing' || expandedSection === null) && (
            <>
              <tr className="bg-green-50 dark:bg-green-900">
                <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-green-900 dark:text-green-100 text-xs">
                  Printing Settings
                </td>
              </tr>

              {/* Printability */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaCog className="text-blue-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Printability
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 border-b dark:border-gray-700">
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
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaFire className="text-red-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Extruder Temp
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.extruderTemp.range}{material.extruderTemp.unit}
                  </td>
                ))}
              </tr>

              {/* Bed Temperature */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaLayerGroup className="text-orange-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Bed Temperature
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.bedTemp.range}{material.bedTemp.unit}
                  </td>
                ))}
              </tr>

              {/* Heated Bed */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaExclamationTriangle className="text-yellow-600 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Heated Bed
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs">
                    <span className={material.heatedBed === 'Required' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                      {material.heatedBed}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Build Surfaces */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaCube className="text-indigo-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Build Surfaces
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.buildSurfaces.join(', ')}
                  </td>
                ))}
              </tr>

              {/* Other Requirements */}
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900">
                <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                  <div className="flex flex-col items-center text-center w-full">
                    <FaExclamationTriangle className="text-red-500 text-xl mb-1" />
                    <div className="text-gray-900 dark:text-gray-100">
                      Other Requirements
                    </div>
                  </div>
                </td>
                {filteredMaterials.map(material => (
                  <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300">
                    {material.otherRequirements.join(', ')}
                  </td>
                ))}
              </tr>
            </>
          )}

          {/* Characteristics Section */}
          {(expandedSection === 'characteristics' || expandedSection === null) && (
            <>
              <tr className="bg-purple-50 dark:bg-purple-900">
                <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-purple-900 dark:text-purple-100 text-xs">
                  Material Characteristics
                </td>
              </tr>
              {Object.keys(materials[0].characteristics).map(characteristic => (
                <tr key={characteristic} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="sticky left-0 bg-white dark:bg-gray-800 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <div className="flex flex-col items-center text-center w-full">
                      <FaCheckCircle className="text-green-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        {characteristic.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics[characteristic as keyof typeof material.characteristics] ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-300 text-lg">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
