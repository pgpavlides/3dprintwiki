import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { materialData } from '../data/materials';
import { bambuMaterialData } from '../data/bambuMaterials';
import { MaterialCard } from '../components/MaterialCard';
import { MaterialsTable } from '../components/MaterialsTable';
import { BambuMaterialsTable } from '../components/BambuMaterialsTable';
import { BambuMaterialCard } from '../components/BambuMaterialCard';

export const Route = createFileRoute('/materials')({
  component: MaterialsPage,
});

function MaterialsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [tableType, setTableType] = useState<'generic' | 'bambu'>('bambu');

  // Get unique characteristics for filtering
  const allCharacteristics = [...new Set(
    materialData.flatMap(material => 
      Object.entries(material.characteristics)
        .filter(([_, value]) => value)
        .map(([key]) => key)
    )
  )];

  const filteredMaterials = selectedFilter
    ? materialData.filter(material => 
        material.characteristics[selectedFilter as keyof typeof material.characteristics]
      )
    : materialData;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className={`${viewMode === 'table' ? 'w-full px-2' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            3D Printing Materials Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to 3D printing materials: PLA, ABS, PETG, TPU, and more.
            Compare properties, print settings, and choose the right material for your project.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => {
                setViewMode('table');
                setTableType('bambu');
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'table'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Table View
            </button>
          </div>

          {viewMode === 'table' && (
            <div className="flex gap-2">
              <button
                onClick={() => setTableType('generic')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tableType === 'generic'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Generic Materials
              </button>
              <button
                onClick={() => setTableType('bambu')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  tableType === 'bambu'
                    ? 'bg-green-500 text-white'
                    : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                Bambu Materials
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bambuMaterialData.map(material => (
              <BambuMaterialCard
                key={material.name}
                material={material}
              />
            ))}
          </div>
        ) : (
          tableType === 'generic' ? (
            <MaterialsTable materials={filteredMaterials} />
          ) : (
            <BambuMaterialsTable materials={bambuMaterialData} />
          )
        )}

        {/* Additional Info */}
        <div className="mt-16 p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choosing the Right Material</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">For Beginners</h3>
              <p className="text-gray-600 mb-4">
                PLA is recommended for beginners due to its ease of use, low printing temperature, 
                and minimal warping. It doesn't require a heated bed and produces good quality prints.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">For Functional Parts</h3>
              <p className="text-gray-600 mb-4">
                ABS, PETG, or Nylon are better choices for functional parts that need strength, 
                durability, and heat resistance. These materials require more advanced printing skills.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">For Flexible Objects</h3>
              <p className="text-gray-600 mb-4">
                TPU and other flexible filaments are perfect for creating objects that need to bend 
                or compress, such as phone cases, gaskets, or wearable items.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">For Special Applications</h3>
              <p className="text-gray-600">
                Specialty materials like Carbon Fiber Filled for strength, Wood Filled for aesthetic 
                appeal, or PVA for dissolvable supports offer unique properties for specific projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
