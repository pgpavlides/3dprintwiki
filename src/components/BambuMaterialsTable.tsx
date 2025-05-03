import React, { useState } from 'react';
import type { BambuMaterialProperties } from '../types/bambuMaterials';

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
                <th key={material.name} className="p-2 text-center border-b min-w-[80px] max-w-[120px]">
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
                    Toughness<br />
                    <span className="text-xs text-gray-600">Impact Strength - XY</span>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.toughness}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Strength<br />
                    <span className="text-xs text-gray-600">Bending Strength - XY</span>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.strength}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Stiffness<br />
                    <span className="text-xs text-gray-600">Bending Modulus - XY</span>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.stiffness}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Layer Adhesion<br />
                    <span className="text-xs text-gray-600">Impact Strength - Z</span>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.layerAdhesion}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Heat Resistance<br />
                    <span className="text-xs text-gray-600">HDT, 0.45 MPa</span>
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.properties.heatResistance}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Water Absorption<br />
                    <span className="text-xs text-gray-600">25°C, 55% RH</span>
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
                    Dry Out Before Use
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
                    Drying Condition
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-xs border-b whitespace-pre-line">
                      {material.preprinting.dryingCondition}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    AMS Compatibility
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
                    Nozzle Size/Material
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center text-xs border-b">
                      {material.printerSettings.nozzleSizeMaterial}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Build Plate & Bed Temp
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
                    Adhesion Methods
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.adhesionMethods.join(', ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Print with Enclosure
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
                    Print Speed
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.printSpeed}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Nozzle Temperature
                  </td>
                  {filteredMaterials.map(material => (
                    <td key={material.name} className="p-2 text-center border-b text-xs">
                      {material.printerSettings.nozzleTemperature}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 bg-white p-2 font-medium border-b text-xs">
                    Part Cooling Fan
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
                    Seal with Desiccant
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
                    Annealing
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
