import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SEO } from '../components/SEO/SEO'
import { HardwareTable } from '../components/HardwareTable'
import { hardwareData, type Hardware, getHardwareByCategory, getHardwareBySubcategory } from '../data/hardware/hardwareData'
import { hardwareCategories, getAllSubcategories } from '../data/hardware/hardwareCategories'
import { metricScrewDimensions, hexKeySizes, screwStrengthGrades, screwMaterialInfo } from '../data/hardware/screwDimensions'

export const Route = createFileRoute('/hardware')({
  component: HardwarePage,
})

function HardwarePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

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

  // Group hardware by subcategory for display
  const groupedHardware = filteredHardware.reduce((acc, item) => {
    if (!acc[item.subcategory]) {
      acc[item.subcategory] = []
    }
    acc[item.subcategory].push(item)
    return acc
  }, {} as Record<string, Hardware[]>)

  return (
    <>
      <SEO 
        title="3D Printing Hardware Guide | 3D Print Wiki"
        description="Essential hardware for 3D printing: fasteners, bearings, electronics, threaded inserts, and mechanical components. Complete hardware reference guide."
        keywords="3D printing hardware, threaded inserts, bearings, fasteners, electronics, mechanical components, printer parts"
        url="https://3dprintwiki.com/hardware"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 transition-colors">
        <div className={`${viewMode === "table" ? "w-full px-2" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              3D Printing Hardware Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential hardware components for 3D printing projects: fasteners, bearings, electronics, and mechanical parts.
            </p>
          </div>

          {/* View Mode Toggle */}
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
          </div>

          {/* Search and Filter - Only show in grid mode */}
          {viewMode === 'grid' && (
            <div className="mb-8 space-y-4">
              {/* Show search and filters if any filter is active */}
              {(selectedCategory !== 'all' || searchTerm !== '' || selectedSubcategory !== 'all') && (
                <>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="text"
                      placeholder="Search hardware..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Category Overview - Show when no specific category selected */}
          {viewMode === 'grid' && selectedCategory === 'all' && searchTerm === '' && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Hardware Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hardwareCategories.map(category => (
                  <div 
                    key={category.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {category.subcategories.length} subcategories
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {viewMode === 'grid' ? (
            <>
              {/* Show only categories if none selected and no search */}
              {selectedCategory === 'all' && searchTerm === '' ? null : (
                <>
                  {/* Hardware Grid - Grouped by Subcategory */}
                  {selectedSubcategory === 'all' && Object.keys(groupedHardware).length > 0 ? (
                    Object.entries(groupedHardware).map(([subcategoryId, items]) => {
                      const subcategory = getAllSubcategories().find(sub => sub.id === subcategoryId)
                      return (
                        <div key={subcategoryId} className="mb-12">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {subcategory?.name || subcategoryId}
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {items.map((item) => (
                              <div 
                                key={item.id} 
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                              >
                                {item.image && (
                                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-contain p-4"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                )}
                                <div className="p-6">
                                  <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                      {item.name}
                                    </h3>
                                    {item.recommended && (
                                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded">
                                        Essential
                                      </span>
                                    )}
                                  </div>
                                  
                                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {item.description}
                                  </p>
                                  
                                  <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                      Common Uses:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                      {item.uses.map((use, index) => (
                                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                          {use}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  {item.specifications && (
                                    <div className="mb-4">
                                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Specifications:
                                      </h4>
                                      <ul className="list-disc list-inside space-y-1">
                                        {item.specifications.map((spec, index) => (
                                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                            {spec}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {item.buyingTips && (
                                    <div className="mb-4">
                                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                        Buying Tips:
                                      </h4>
                                      <ul className="list-disc list-inside space-y-1">
                                        {item.buyingTips.map((tip, index) => (
                                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                            {tip}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  <div className="flex justify-between items-center">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                                      {subcategory?.name || item.subcategory}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredHardware.map((item) => (
                        <div 
                          key={item.id} 
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                        >
                          {item.image && (
                            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain p-4"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {item.name}
                              </h3>
                              {item.recommended && (
                                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded">
                                  Essential
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {item.description}
                            </p>
                            
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Common Uses:
                              </h4>
                              <ul className="list-disc list-inside space-y-1">
                                {item.uses.map((use, index) => (
                                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                    {use}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {item.specifications && (
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                  Specifications:
                                </h4>
                                <ul className="list-disc list-inside space-y-1">
                                  {item.specifications.map((spec, index) => (
                                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                                      {spec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                                {item.subcategory}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
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
            <HardwareTable hardware={hardwareData} />
          )}


        </div>
      </div>
    </>
  )
}
