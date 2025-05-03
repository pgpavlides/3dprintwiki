import React, { useState } from 'react';
import type { BambuMaterialProperties } from '../types/bambuMaterials';
import { ProgressBar } from './ProgressBar';
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
      {/* Controls */}
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => toggleSection('properties')}
            className={`px-2 py-1 text-sm rounded-lg ${
              expandedSection === 'properties' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Properties
          </button>
          <button
            onClick={() => toggleSection('preprinting')}
            className={`px-2 py-1 text-sm rounded-lg ${
              expandedSection === 'preprinting' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Pre-printing
          </button>
          <button
            onClick={() => toggleSection('printer')}
            className={`px-2 py-1 text-sm rounded-lg ${
              expandedSection === 'printer' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Printer Settings
          </button>
          <button
            onClick={() => toggleSection('postprinting')}
            className={`px-2 py-1 text-sm rounded-lg ${
              expandedSection === 'postprinting' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Post-printing
          </button>
        </div>
        
        {!compareMode && (
          <button
            onClick={() => selectedMaterials.length > 1 && setCompareMode(true)}
            disabled={selectedMaterials.length < 2}
            className={`px-2 py-1 text-sm rounded-lg ${
              selectedMaterials.length < 2
                ? 'bg-gray-300 cursor-not-allowed'
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
            className="px-2 py-1 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Exit Comparison
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="sticky left-0 bg-gray-100 p-2 text-left font-bold text-gray-700 border-b w-32">
                Filament
              </th>
              {filteredMaterials.map(material => (
                <th key={material.name} className="p-2 text-center border-b w-32">
                  <div className="font-bold text-gray-900 text-xs">{material.name}</div>
                  {!compareMode && (
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material.name)}
                      onChange={() => toggleMaterialSelection(material.name)}
                      className="mt-1 h-3 w-3"
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Properties Section */}
            {(expandedSection === 'properties' || expandedSection === null) && (
              <>
                <tr className="bg-blue-50">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-blue-900 text-xs">
                    Properties
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-blue-500" />
                      <div>
                        Toughness<br />
                        <span className="text-xs text-gray-600">Impact Strength - XY</span>
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => {
                    const toughnessValue = parseFloat(material.properties.toughness);
                    return (
                      <td key={material.name} className="p-2 border-b w-32">
                        <div className="w-full">
                          {!isNaN(toughnessValue) ? (
                            <ProgressBar
                              value={toughnessValue}
                              max={150} // Based on typical range of 0-150 kJ/m²
                              color="blue"
                              label={material.properties.toughness}
                            />
                          ) : (
                            <div className="text-sm text-center">{material.properties.toughness}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaFistRaised className="text-red-500" />
                      <div>
                        Strength<br />
                        <span className="text-xs text-gray-600">Bending Strength - XY</span>
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => {
                    const strengthValue = parseFloat(material.properties.strength);
                    return (
                      <td key={material.name} className="p-2 border-b w-32">
                        <div className="w-full">
                          {!isNaN(strengthValue) ? (
                            <ProgressBar
                              value={strengthValue}
                              max={250} // Based on typical range up to 250 MPa
                              color="red"
                              label={material.properties.strength}
                            />
                          ) : (
                            <div className="text-sm text-center">{material.properties.strength}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaRuler className="text-purple-500" />
                      <div>
                        Stiffness<br />
                        <span className="text-xs text-gray-600">Bending Modulus - XY</span>
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => {
                    const stiffnessValue = parseFloat(material.properties.stiffness);
                    return (
                      <td key={material.name} className="p-2 border-b w-32">
                        <div className="w-full">
                          {!isNaN(stiffnessValue) ? (
                            <ProgressBar
                              value={stiffnessValue}
                              max={10000} // Based on typical range up to 10000 MPa
                              color="purple"
                              label={material.properties.stiffness}
                            />
                          ) : (
                            <div className="text-sm text-center">{material.properties.stiffness}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaLayerGroup className="text-green-500" />
                      <div>
                        Layer Adhesion<br />
                        <span className="text-xs text-gray-600">Impact Strength - Z</span>
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => {
                    const adhesionValue = parseFloat(material.properties.layerAdhesion);
                    return (
                      <td key={material.name} className="p-2 border-b w-32">
                        <div className="w-full">
                          {!isNaN(adhesionValue) ? (
                            <ProgressBar
                              value={adhesionValue}
                              max={100} // Based on typical range up to 100 kJ/m²
                              color="green"
                              label={material.properties.layerAdhesion}
                            />
                          ) : (
                            <div className="text-sm text-center">{material.properties.layerAdhesion}</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaThermometerHalf className="text-orange-500" />
                      <div>
                        Heat Resistance<br />
                        <span className="text-xs text-gray-600">HDT, 0.45 MPa</span>
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.heatResistance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaTint className="text-blue-400" />
                      <div>
                        Water Absorption<br />
                        <span className="text-xs text-gray-600">25°C, 55% RH</span>
                      </div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.waterAbsorption}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Pre-printing Section */}
            {(expandedSection === 'preprinting' || expandedSection === null) && (
              <>
                <tr className="bg-green-50">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-green-900 text-xs">
                    Pre-printing Preparation
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaFan className="text-amber-600" />
                      <div>Dry Out Before Use</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      <span className={material.preprinting.dryingRequired === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {material.preprinting.dryingRequired}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-600" />
                      <div>Drying Condition</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-xs border-b whitespace-pre-line">
                      {material.preprinting.dryingCondition}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaServer className="text-gray-700" />
                      <div>AMS Compatibility</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center text-xs border-b">
                      {material.preprinting.amsCompatibility}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Printer Settings Section */}
            {(expandedSection === 'printer' || expandedSection === null) && (
              <>
                <tr className="bg-orange-50">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-orange-900 text-xs">
                    Printer Settings
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaPrint className="text-blue-600" />
                      <div>Nozzle Size/Material</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center text-xs border-b">
                      {material.printerSettings.nozzleSizeMaterial}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaPalette className="text-indigo-500" />
                      <div>Build Plate & Bed Temp</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-xs border-b">
                      <ul className="list-none">
                        {material.printerSettings.buildPlate.map((plate, index) => (
                          <li key={index} className="mb-1">{plate}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaTape className="text-yellow-500" />
                      <div>Adhesion Methods</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.adhesionMethods.join(', ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaBox className="text-gray-600" />
                      <div>Print with Enclosure</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      <span className={material.printerSettings.enclosureRequired === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {material.printerSettings.enclosureRequired}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaTachometerAlt className="text-green-600" />
                      <div>Print Speed</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.printSpeed}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaTemperatureHigh className="text-red-600" />
                      <div>Nozzle Temperature</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.nozzleTemperature}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaWind className="text-blue-500" />
                      <div>Part Cooling Fan</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.partCoolingFan}
                    </td>
                  ))}
                </tr>
              </>
            )}

            {/* Post-printing Section */}
            {(expandedSection === 'postprinting' || expandedSection === null) && (
              <>
                <tr className="bg-purple-50">
                  <td colSpan={filteredMaterials.length + 1} className="p-1 font-bold text-purple-900 text-xs">
                    Post-printing Processes
                  </td>
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaIndustry className="text-purple-600" />
                      <div>Seal with Desiccant</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      <span className={material.postprinting.sealWithDesiccant === 'Required' ? 'text-red-600 font-medium' : 'text-gray-600'}>
                        {material.postprinting.sealWithDesiccant}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    <div className="flex items-center gap-2">
                      <FaHourglassHalf className="text-orange-600" />
                      <div>Annealing</div>
                    </div>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.postprinting.annealing}
                    </td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
