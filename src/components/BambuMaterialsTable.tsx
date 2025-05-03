import React, { useState } from 'react';
import type { BambuMaterialProperties } from '../types/bambuMaterials';
import { ProgressBar } from './ProgressBar';
import { PropertyInfoModal } from './modals/PropertyInfoModal';
import { propertyInfoData } from '../data/propertyInfo';
import { 
  FaShieldAlt, 
  FaFistRaised, 
  FaRuler, 
  FaLayerGroup, 
  FaThermometerHalf, 
  FaTint,
  FaFan,
  FaClock,
  FaServer,
  FaPrint,
  FaGripLinesVertical,
  FaPalette,
  FaTape,
  FaBox,
  FaTachometerAlt,
  FaTemperatureHigh,
  FaWind,
  FaIndustry,
  FaHourglassHalf
} from 'react-icons/fa';

interface BambuMaterialsTableProps {
  materials: BambuMaterialProperties[];
}

export const BambuMaterialsTable: React.FC<BambuMaterialsTableProps> = ({ materials }) => {
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
            <FaShieldAlt className="text-xl mb-1" />
            <span className="text-xs font-medium">Properties</span>
          </button>
          <button
            onClick={() => toggleSection('preprinting')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'preprinting' 
                ? 'bg-green-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500'
            }`}
          >
            <FaFan className="text-xl mb-1" />
            <span className="text-xs font-medium">Pre-print</span>
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
            <span className="text-xs font-medium">Printer</span>
          </button>
          <button
            onClick={() => toggleSection('postprinting')}
            className={`flex flex-col items-center justify-center p-3 w-20 h-20 rounded-xl transition-all duration-200 ${
              expandedSection === 'postprinting' 
                ? 'bg-purple-500 text-white shadow-lg transform -translate-y-0.5' 
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500'
            }`}
          >
            <FaIndustry className="text-xl mb-1" />
            <span className="text-xs font-medium">Post-print</span>
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
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="sticky left-0 bg-gray-100 dark:bg-gray-700 p-2 text-left font-bold text-gray-700 dark:text-gray-300 border-b dark:border-gray-600 w-32">
                Filament
              </th>
              {filteredMaterials.map(material => (
                <th key={material.name} className="p-2 text-center border-b dark:border-gray-600 w-32">
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
                <tr className="bg-blue-50 dark:bg-blue-900">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-blue-900 dark:text-blue-100 text-xs">
                    Properties
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('toughness')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaShieldAlt className="text-blue-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Toughness<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Impact Strength - XY</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const toughnessValue = parseFloat(material.properties.toughness);
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(toughnessValue) ? (
                            <ProgressBar
                              value={toughnessValue}
                              max={150} // Based on typical range of 0-150 kJ/m²
                              color="blue"
                              label={material.properties.toughness}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.toughness}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('strength')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaFistRaised className="text-red-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Strength<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Bending Strength - XY</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const strengthValue = parseFloat(material.properties.strength);
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(strengthValue) ? (
                            <ProgressBar
                              value={strengthValue}
                              max={250} // Based on typical range up to 250 MPa
                              color="red"
                              label={material.properties.strength}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.strength}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('stiffness')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaRuler className="text-purple-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Stiffness<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Bending Modulus - XY</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const stiffnessValue = parseFloat(material.properties.stiffness);
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(stiffnessValue) ? (
                            <ProgressBar
                              value={stiffnessValue}
                              max={10000} // Based on typical range up to 10000 MPa
                              color="purple"
                              label={material.properties.stiffness}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.stiffness}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('layerAdhesion')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaLayerGroup className="text-green-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Layer Adhesion<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Impact Strength - Z</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => {
                    const adhesionValue = parseFloat(material.properties.layerAdhesion);
                    return (
                      <td key={material.name} className="p-2 border-b dark:border-gray-700 w-32 dark:bg-gray-900">
                        <div className="w-full">
                          {!isNaN(adhesionValue) ? (
                            <ProgressBar
                              value={adhesionValue}
                              max={100} // Based on typical range up to 100 kJ/m²
                              color="green"
                              label={material.properties.layerAdhesion}
                            />
                          ) : (
                            <div className="text-sm text-center dark:text-gray-300">{material.properties.layerAdhesion}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('heatResistance')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaThermometerHalf className="text-orange-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Heat Resistance<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">HDT, 0.45 MPa</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.properties.heatResistance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('waterAbsorption')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaTint className="text-blue-400 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">
                        Water Absorption<br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">25°C, 55% RH</span>
                      </div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.properties.waterAbsorption}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Pre-printing Section */}
            {(expandedSection === 'preprinting' || expandedSection === null) && (
              <>
                <tr className="bg-green-50 dark:bg-green-900">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-green-900 dark:text-green-100 text-xs">
                    Pre-printing Preparation
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('drying')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaFan className="text-amber-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Dry Out Before Use</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs dark:bg-gray-900 dark:border-gray-700">
                      <span className={material.preprinting.dryingRequired === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        {material.preprinting.dryingRequired}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('dryingCondition')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaClock className="text-gray-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Drying Condition</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-xs border-b dark:border-gray-700 whitespace-pre-line dark:text-gray-300 dark:bg-gray-900">
                      {material.preprinting.dryingCondition}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('amsCompatibility')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaServer className="text-gray-700 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">AMS Compatibility</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center text-xs border-b dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900">
                      {material.preprinting.amsCompatibility}
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
                      onClick={() => setActiveModal('nozzleSize')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaPrint className="text-blue-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Nozzle Size/Material</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center text-xs border-b dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.nozzleSizeMaterial}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('buildPlate')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaPalette className="text-indigo-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Build Plate & Bed Temp</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-xs border-b dark:border-gray-700 dark:bg-gray-900">
                      <ul className="list-none dark:text-gray-300">
                        {material.printerSettings.buildPlate.map((plate, index) => (
                          <li key={index} className="mb-1">{plate}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('adhesionMethods')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaTape className="text-yellow-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Adhesion Methods</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.adhesionMethods.join(', ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('enclosure')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaBox className="text-gray-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Print with Enclosure</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs dark:bg-gray-900 dark:border-gray-700">
                      <span className={material.printerSettings.enclosureRequired === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        {material.printerSettings.enclosureRequired}
                      </span>
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
                      <div className="text-gray-900 dark:text-gray-100">Print Speed</div>
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
                      onClick={() => setActiveModal('nozzleTemp')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaTemperatureHigh className="text-red-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Nozzle Temperature</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.nozzleTemperature}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('partCooling')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaWind className="text-blue-500 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Part Cooling Fan</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.printerSettings.partCoolingFan}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Post-printing Section */}
            {(expandedSection === 'postprinting' || expandedSection === null) && (
              <>
                <tr className="bg-purple-50 dark:bg-purple-900">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-purple-900 dark:text-purple-100 text-xs">
                    Post-printing Processes
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('desiccant')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaIndustry className="text-purple-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Seal with Desiccant</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs dark:bg-gray-900 dark:border-gray-700">
                      <span className={material.postprinting.sealWithDesiccant === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600 dark:text-gray-400'}>
                        {material.postprinting.sealWithDesiccant}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white dark:bg-gray-900 p-2 font-medium border-b dark:border-gray-700 text-xs">
                    <button 
                      onClick={() => setActiveModal('annealing')}
                      className="flex flex-col items-center text-center w-full hover:opacity-75 transition-opacity"
                    >
                      <FaHourglassHalf className="text-orange-600 text-xl mb-1" />
                      <div className="text-gray-900 dark:text-gray-100">Annealing</div>
                    </button>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b dark:border-gray-700 text-xs dark:text-gray-300 dark:bg-gray-900">
                      {material.postprinting.annealing}
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
    case 'toughness':
      return <FaShieldAlt className="text-blue-500" />;
    case 'strength':
      return <FaFistRaised className="text-red-500" />;
    case 'stiffness':
      return <FaRuler className="text-purple-500" />;
    case 'layerAdhesion':
      return <FaLayerGroup className="text-green-500" />;
    case 'heatResistance':
      return <FaThermometerHalf className="text-orange-500" />;
    case 'waterAbsorption':
      return <FaTint className="text-blue-400" />;
    case 'drying':
      return <FaFan className="text-amber-600" />;
    case 'dryingCondition':
      return <FaClock className="text-gray-600" />;
    case 'amsCompatibility':
      return <FaServer className="text-gray-700" />;
    case 'nozzleSize':
      return <FaPrint className="text-blue-600" />;
    case 'buildPlate':
      return <FaPalette className="text-indigo-500" />;
    case 'adhesionMethods':
      return <FaTape className="text-yellow-500" />;
    case 'enclosure':
      return <FaBox className="text-gray-600" />;
    case 'printSpeed':
      return <FaTachometerAlt className="text-green-600" />;
    case 'nozzleTemp':
      return <FaTemperatureHigh className="text-red-600" />;
    case 'partCooling':
      return <FaWind className="text-blue-500" />;
    case 'desiccant':
      return <FaIndustry className="text-purple-600" />;
    case 'annealing':
      return <FaHourglassHalf className="text-orange-600" />;
    default:
      return null;
  }
};
