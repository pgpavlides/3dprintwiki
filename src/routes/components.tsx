import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ComponentCard } from '../components/ComponentCard';
import { ComponentsTable } from '../components/ComponentsTable';
import { componentData } from '../data/components';

export const Route = createFileRoute('/components')({
  component: ComponentsPage,
});

function ComponentsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories
  const categories = ['all', ...new Set(componentData.map(component => component.category))];

  // Filter components
  const filteredComponents = componentData.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            3D Printing Components Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Essential hardware components for your 3D printing projects: threaded inserts, screws, bearings, and more.
            Find the right components to complete your prints.
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
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'table'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
            >
              Table View
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map(component => (
              <ComponentCard
                key={component.id}
                component={component}
              />
            ))}
          </div>
        ) : (
          <ComponentsTable components={filteredComponents} />
        )}

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choosing Components</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Material Considerations</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose component materials based on your application. Steel for strength and durability, 
                  brass for corrosion resistance, nylon for lightweight applications, and stainless steel 
                  for outdoor or marine environments.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Size Standards</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Most 3D printing projects use metric hardware (M2, M3, M4, M5). Ensure your design 
                  accommodates standard sizes to avoid sourcing issues. Consider clearance holes 
                  and tolerances for your specific printer.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Installation Methods</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Different components require different installation techniques. Threaded inserts 
                  need heat or ultrasonic installation, press-fit components need precise tolerances, 
                  and some parts may require adhesives or mechanical retention.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Best Practices</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Design Guidelines</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Always design clearance holes slightly larger than nominal size</li>
                  <li>Consider thermal expansion when mixing materials</li>
                  <li>Account for layer lines when designing press-fit features</li>
                  <li>Use standardized components whenever possible</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Assembly Tips</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Pre-heat threaded inserts before installation</li>
                  <li>Use proper torque specifications for fasteners</li>
                  <li>Consider thread-locking compounds for vibration resistance</li>
                  <li>Test fit components before final assembly</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Common Pitfalls</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Over-tightening plastic threads</li>
                  <li>Insufficient wall thickness around inserts</li>
                  <li>Mismatched thread standards (metric vs imperial)</li>
                  <li>Ignoring material compatibility issues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
