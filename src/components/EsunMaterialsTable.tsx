import React, { useState } from 'react';
import type { EsunMaterialProperties } from '../types/esunMaterials';
import { ProgressBar } from './ProgressBar';
import { PropertyInfoModal } from './modals/PropertyInfoModal';
import { propertyInfoData } from '../data/propertyInfo';
import { 
  FaThermometerHalf, 
  FaWeightHanging, 
  FaFire,
  FaFistRaised, 
  FaArrowsAltH,
  FaRuler, 
  FaTachometerAlt,
  FaTools,
  FaWind,
  FaBed,
  FaCheck,
  FaTimes,
  FaPrint,
  FaTemperatureHigh
} from 'react-icons/fa';

interface EsunMaterialsTableProps {
  materials: EsunMaterialProperties[];
}

export const EsunMaterialsTable: React.FC<EsunMaterialsTableProps> = ({ materials }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null); // null shows all sections
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

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

  const filteredMaterials = compareMode
    ? materials.filter(m => selectedMaterials.includes(m.name))
    : materials;

  return (
    <div className="w-full overflow-x-auto">
      {/* eSun Logo and Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">eSUN 3D PRINTING FILAMENTS PROPERTIES TABLE</h2>
        <div className="flex gap-2">

        </div>
      </div>

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
            <FaThermometerHalf className="text-xl mb-1" />
            <span className="text-xs font-medium">Properties</span>
          </button>
          <button
            onClick={() => toggleSection('printer')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'printer' 
                ? 'bg-orange-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500'
            }`}
          >
            <FaPrint className="text-xl mb-1" />
            <span className="text-xs font-medium">Print Settings</span>
          </button>
          <button
            onClick={() => toggleSection('characteristics')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'characteristics' 
                ? 'bg-purple-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500'
            }`}
          >
            <FaTools className="text-xl mb-1" />
            <span className="text-xs font-medium">Characteristics</span>
          </button>
        </div>
        
        {/* Compare Controls */}
        <div className="flex justify-end gap-3">
          {!compareMode && (
            <button
              onClick={() => selectedMaterials.length > 1 && setCompareMode(true)}
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
          
          {compareMode && (
            <button
              onClick={() => {
                setCompareMode(false);
                setSelectedMaterials([]);
              }}
              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Exit Comparison
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-blue-50 dark:bg-blue-900">
              <th className="sticky left-0 bg-gray-100 dark:bg-gray-700 p-2 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600 w-32">
                Filament
              </th>
              {filteredMaterials.map(material => (
                <th key={material.name} className="p-2 text-center border-b dark:border-emerald-600 w-32">
                  <div className="font-bold text-gray-900 dark:text-white text-xs">{material.name}</div>
                  {!compareMode && (
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
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-blue-900 dark:text-blue-100 text-xs">
                    Properties
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('density')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaWeightHanging className="text-emerald-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Density<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(g/cm³)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const densityValue = parseFloat(material.properties.density);
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(densityValue) ? (
                            <ProgressBar
                              value={densityValue}
                              max={2} // Typical range for filament density
                              color="emerald"
                              label={material.properties.density}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.density}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('heatDistortion')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaThermometerHalf className="text-orange-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Heat Distortion Temp<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(°C, 0.45MPa)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const heatDistortionValue = material.properties.heatDistortion !== '/' ? 
                      parseFloat(material.properties.heatDistortion) : NaN;
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(heatDistortionValue) ? (
                            <ProgressBar
                              value={heatDistortionValue}
                              max={200} // Max heat distortion range
                              color="orange"
                              label={material.properties.heatDistortion}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.heatDistortion}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('meltFlow')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaFire className="text-red-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Melt Flow Index<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(g/10min)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.properties.meltFlow}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('tensileStrength')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaFistRaised className="text-blue-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Tensile Strength<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(MPa)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const tensileValue = material.properties.tensileStrength !== 'N/A' ? 
                      parseFloat(material.properties.tensileStrength) : NaN;
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(tensileValue) ? (
                            <ProgressBar
                              value={tensileValue}
                              max={100} // Typical max tensile strength range
                              color="blue"
                              label={material.properties.tensileStrength}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.tensileStrength}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('elongation')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaArrowsAltH className="text-purple-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Elongation at Break<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(%)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.properties.elongation}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('bendingStrength')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaRuler className="text-green-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Bending Strength<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(MPa)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const bendingValue = material.properties.bendingStrength !== '/' ? 
                      parseFloat(material.properties.bendingStrength) : NaN;
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(bendingValue) ? (
                            <ProgressBar
                              value={bendingValue}
                              max={150} // Typical max bending strength range
                              color="green"
                              label={material.properties.bendingStrength}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.bendingStrength}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('flexuralModulus')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaRuler className="text-indigo-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Flexural Modulus<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(MPa)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const flexuralValue = material.properties.flexuralModulus !== '/' ? 
                      parseFloat(material.properties.flexuralModulus) : NaN;
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(flexuralValue) ? (
                            <ProgressBar
                              value={flexuralValue}
                              max={6000} // Typical max flexural modulus range
                              color="indigo"
                              label={material.properties.flexuralModulus}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.flexuralModulus}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('izodImpact')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaFistRaised className="text-pink-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        IZOD Impact Strength<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(kJ/m²)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const izodValue = material.properties.izodImpact !== '/' ? 
                      parseFloat(material.properties.izodImpact) : NaN;
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(izodValue) ? (
                            <ProgressBar
                              value={izodValue}
                              max={70} // Typical max IZOD impact strength range
                              color="pink"
                              label={material.properties.izodImpact}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.izodImpact}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('weatherResistance')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaThermometerHalf className="text-yellow-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Weather Resistance<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(0-10)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.properties.weatherResistance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('printability')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaPrint className="text-emerald-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Printability<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(0-10)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.properties.printability}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Printer Settings Section */}
            {(expandedSection === 'printer' || expandedSection === null) && (
              <>
                <tr className="bg-orange-50 dark:bg-orange-900">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-orange-900 dark:text-orange-100 text-xs">
                    Printer Settings
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('printTemp')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaTemperatureHigh className="text-red-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Print Temperature<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(°C)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.printTemp}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('bedTemp')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaBed className="text-orange-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Bed Temperature<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(°C)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.bedTemp}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('fanSpeed')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaWind className="text-blue-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Fan Speed<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(%)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.fanSpeed}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('printSpeed')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaTachometerAlt className="text-green-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Print Speed<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">(mm/s)</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.printSpeed}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('heatBed')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaBed className="text-purple-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Heat Bed
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs dark:bg-gray-900 dark:border-gray-700">
                      <span className={material.printerSettings.heatBedRequired === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        {material.printerSettings.heatBedRequired}
                      </span>
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
                    Characteristics
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Flexibility
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.flexibility ? (
                        <FaCheck className="mx-auto text-green-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Elasticity
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.elasticity ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Impact Resistance
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.impactResistance ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Soft
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.soft ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Complex
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.complex ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    UV Resistance
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.uvResistance ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Waterproof
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.waterproof ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Solubility
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.solubility ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Heat Resistance
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.heatResistance ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Chemical Resistance
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.chemicalResistance ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Fatigue Resistance
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.fatigueResistance ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Need to Dry
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.needToDry ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    Need Heat Bed
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700">
                      {material.characteristics.needHeatBed ? (
                        <FaCheck className="mx-auto text-emerald-500" />
                      ) : (
                        <FaTimes className="mx-auto text-gray-300 dark:text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* Property Info Modal */}
      {activeModal && propertyInfoData[activeModal] && (
        <PropertyInfoModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={propertyInfoData[activeModal].title}
          icon={getIconForProperty(activeModal)}
          content={{
            description: propertyInfoData[activeModal].description,
            measurement: propertyInfoData[activeModal].measurement,
            importance: propertyInfoData[activeModal].importance,
            tips: propertyInfoData[activeModal].tips,
          }}
        />
      )}
    </div>
  );
};

// Helper function to get the icon component for each property
const getIconForProperty = (propertyId: string): React.ReactNode => {
  switch (propertyId) {
    case 'density':
      return <FaWeightHanging className="text-emerald-500" />;
    case 'heatDistortion':
      return <FaThermometerHalf className="text-orange-500" />;
    case 'meltFlow':
      return <FaFire className="text-red-500" />;
    case 'tensileStrength':
      return <FaFistRaised className="text-blue-500" />;
    case 'elongation':
      return <FaArrowsAltH className="text-purple-500" />;
    case 'bendingStrength':
      return <FaRuler className="text-green-600" />;
    case 'flexuralModulus':
      return <FaRuler className="text-indigo-500" />;
    case 'izodImpact':
      return <FaFistRaised className="text-pink-500" />;
    case 'weatherResistance':
      return <FaThermometerHalf className="text-yellow-500" />;
    case 'printability':
      return <FaPrint className="text-emerald-600" />;
    case 'printTemp':
      return <FaTemperatureHigh className="text-red-600" />;
    case 'bedTemp':
      return <FaBed className="text-orange-500" />;
    case 'fanSpeed':
      return <FaWind className="text-blue-500" />;
    case 'printSpeed':
      return <FaTachometerAlt className="text-green-600" />;
    case 'heatBed':
      return <FaBed className="text-purple-500" />;
    default:
      return null;
  }
};
