import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SEO } from '../components/SEO/SEO'
import { HardwareTable } from '../components/HardwareTable'
import { hardwareData, type Hardware, getHardwareByCategory, getHardwareBySubcategory } from '../data/hardware/hardwareData'
import { hardwareCategories, getAllSubcategories } from '../data/hardware/hardwareCategories'
import { metricScrewDimensions, hexKeySizes, screwStrengthGrades, screwMaterialInfo } from '../data/hardware/screwDimensions'
import { 
  FaScrewdriver
} from 'react-icons/fa'

export const Route = createFileRoute('/hardware')({
  component: HardwarePage,
})

function HardwarePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Icon mapping for subcategories
  const subcategoryIcons: { [key: string]: any } = {
    'screws': FaScrewdriver,
    'nuts': FaScrewdriver,
    'washers': FaScrewdriver,
    'threaded-inserts': FaScrewdriver,
    'extrusion-hardware': FaScrewdriver,
    'bearings': FaScrewdriver,
    'linear-rails': FaScrewdriver,
    'rods-shafts': FaScrewdriver,
    'pulleys-belts': FaScrewdriver,
    'couplers': FaScrewdriver,
    'stepper-motors': FaScrewdriver,
    'boards': FaScrewdriver,
    'sensors': FaScrewdriver,
    'power-supplies': FaScrewdriver,
    'wiring': FaScrewdriver,
    'springs': FaScrewdriver,
    'dampers': FaScrewdriver,
    'profiles': FaScrewdriver,
    'brackets': FaScrewdriver,
    'plates': FaScrewdriver,
    'tools': FaScrewdriver,
    'storage': FaScrewdriver
  }

  // Get subcategory data with counts
  const getSubcategoryData = (subcategoryId: string) => {
    const itemCount = hardwareData.filter(item => item.subcategory === subcategoryId).length
    const subcategory = getAllSubcategories().find(sub => sub.id === subcategoryId)
    const Icon = subcategoryIcons[subcategoryId] || FaScrewdriver
    return { itemCount, subcategory, Icon }
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedSubcategory('all')
    setSearchTerm('')
  }

  // Get subcategories for selected category
  const subcategories = selectedCategory === 'all' 
    ? getAllSubcategories()
    : hardwareCategories.find(cat => cat.id === selectedCategory)?.subcategories || []

  // Filter hardware based on selection
  const filteredHardware = hardwareData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSubcategory = selectedSubcategory === 'all' || item.subcategory === selectedSubcategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSubcategory && matchesSearch
  })

  // Reset subcategory when category changes
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory('all')
  }


  return (
    <>
      <SEO 
        title="3D Printing Hardware Guide | 3D Print Wiki"
        description="Essential hardware for 3D printing: fasteners, bearings, electronics, threaded inserts, and mechanical components. Complete hardware reference guide."
        keywords="3D printing hardware, threaded inserts, bearings, fasteners, electronics, mechanical components, printer parts"
        url="https://3dprintwiki.com/hardware"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 transition-colors">
        <div className={`${viewMode === "table" ? "w-full px-2" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              3D Printing Hardware Guide
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential hardware components for 3D printing projects
            </p>
          </div>

          {/* View Mode Toggle and Filters */}
          <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg font-medium text-sm ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Grid View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg font-medium text-sm ${
                  viewMode === 'table'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Table View
              </button>
            </div>
            
            {/* Filters Button - Always show in table view, show in grid view when category selected */}
            {(viewMode === 'table' || selectedCategory !== 'all') && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium">Filters</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* Filters Panel - Show when filters are expanded */}
          {showFilters && (
            <div className="mb-6 space-y-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search hardware..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="all">All Categories</option>
                  {hardwareCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {selectedCategory !== 'all' && (
                  <select
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="all">All Subcategories</option>
                    {subcategories.map(subcategory => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}

          {/* Category Overview - Show when no specific category selected */}
          {viewMode === 'grid' && selectedCategory === 'all' && searchTerm === '' && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Hardware Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {hardwareCategories.map(category => {
                  const categoryIcons: { [key: string]: string } = {
                    'fasteners': '🔩',
                    'motion-components': '⚙️',
                    'electronics': '🔌',
                    'springs-rubber': '🔄',
                    'pneumatics-hydraulics': '💨',
                    'structural': '🏗️',
                    'tools-accessories': '🔧',
                    'filament-handling': '🧵'
                  };

                  return (
                    <div 
                      key={category.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 cursor-pointer hover:shadow-lg transition-shadow flex flex-col justify-between"
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <div>
                        <div className="text-2xl mb-1">{categoryIcons[category.id] || '📦'}</div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                          {category.description}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {category.subcategories.length} subcategories
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Subcategory Cards - Show when a specific category is selected */}
          {viewMode === 'grid' && selectedCategory !== 'all' && selectedSubcategory === 'all' && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {hardwareCategories.find(cat => cat.id === selectedCategory)?.name} Subcategories
              </h2>
              <div className="flex flex-wrap gap-4 justify-start">
                {subcategories.map(subcategory => {
                  const { itemCount, Icon } = getSubcategoryData(subcategory.id)
                  return (
                    <div
                      key={subcategory.id}
                      className="flex-none bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-40"
                      onClick={() => setSelectedSubcategory(subcategory.id)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-3">
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          {subcategory.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {itemCount} items
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Content */}
          {viewMode === 'grid' ? (
            <>
              {/* Show only categories if none selected and no search */}
              {selectedCategory === 'all' && searchTerm === '' ? null : (
                <>
                  {/* Hardware Grid - Show items directly when subcategory is selected */}
                  {selectedSubcategory !== 'all' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredHardware.map((item) => {
                        const subcategory = getAllSubcategories().find(sub => sub.id === item.subcategory)
                        return (
                          <div 
                            key={item.id} 
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                          >
                            {item.image && (
                              <div className="relative h-32 w-full bg-gray-100 dark:bg-gray-700">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-contain p-2"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {item.name}
                                </h3>
                                {item.recommended && (
                                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-0.5 rounded">
                                    Essential
                                  </span>
                                )}
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                {item.description}
                              </p>
                              
                              <div className="mb-3">
                                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
                                  Common Uses:
                                </h4>
                                <ul className="list-disc list-inside">
                                  {item.uses.slice(0, 3).map((use, index) => (
                                    <li key={index} className="text-xs text-gray-600 dark:text-gray-400">
                                      {use}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                                  {subcategory?.name || item.subcategory}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Metric Screw Dimensions Reference - Only show for fasteners category */}
                  {selectedCategory === 'fasteners' && (
                    <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Metric Screw Dimensions Reference
                      </h2>
                      
                      {/* Screw Dimensions Table */}
                      <div className="overflow-x-auto mb-8">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thread Diameter</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thread Pitch</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Socket Head</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Hex Key Size</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Common Lengths</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {metricScrewDimensions.map((dimension) => (
                              <tr key={dimension.size}>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{dimension.size}</td>
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{dimension.threadDiameter}mm</td>
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{dimension.threadPitch}mm</td>
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{dimension.socketHeadDiameter}mm</td>
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{dimension.socketSize}mm</td>
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{dimension.commonLengths}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Screw Strength Grades */}
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Screw Strength Grades
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {screwStrengthGrades.map((grade) => (
                            <div key={grade.grade} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Grade {grade.grade}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                <span className="font-medium">Tensile:</span> {grade.tensileStrength}<br />
                                <span className="font-medium">Yield:</span> {grade.yieldStrength}<br />
                                <span className="font-medium">Use:</span> {grade.application}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Screw Materials */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Screw Materials
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(screwMaterialInfo).map(([key, material]) => (
                            <div key={key} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">{material.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                <span className="font-medium">Strength:</span> {material.strength}
                              </p>
                              <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                                {material.properties.map((prop, index) => (
                                  <li key={index}>{prop}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {filteredHardware.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400 text-lg">
                        No hardware items found matching your criteria.
                      </p>
                    </div>
                  )}
                </>
              )}
              </>
            ) : (
              <HardwareTable 
                hardware={filteredHardware} 
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                searchTerm={searchTerm}
                onCategoryChange={handleCategoryChange}
                onSubcategoryChange={setSelectedSubcategory}
                onSearchChange={setSearchTerm}
              />
            )}


        </div>
      </div>
    </>
  )
}
