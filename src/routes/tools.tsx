import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SEO } from '../components/SEO/SEO'
import { ToolsTable } from '../components/ToolsTable'

export const Route = createFileRoute('/tools')({
  component: ToolsPage,
})

export interface Tool {
  id: string
  name: string
  description: string
  uses: string[]
  category: 'maintenance' | 'post-processing' | 'safety' | 'measurement' | 'cleaning' | 'lubrication' | 'general'
  image?: string
  price?: string
  recommended?: boolean
}

export const toolsData: Tool[] = [
  {
    id: 'hobby-torch',
    name: 'Hobby Torch',
    description: 'Small handheld torch for removing stringing, smoothing surfaces, and heat-treating prints',
    uses: ['Remove stringing and wisps', 'Smooth surfaces', 'Heat treating parts', 'Welding small plastic parts'],
    category: 'post-processing',
    recommended: true
  },
  {
    id: 'ipa',
    name: 'Isopropyl Alcohol (IPA)',
    description: 'Essential cleaning solvent for 3D printing maintenance and surface preparation',
    uses: ['Clean build plate', 'Remove residue', 'Surface preparation', 'Clean printer components'],
    category: 'cleaning',
    recommended: true
  },
  {
    id: 'microfiber-cloth',
    name: 'Microfiber Cloth',
    description: 'Lint-free cloth for cleaning and maintaining 3D printer components',
    uses: ['Clean build surfaces', 'Wipe down printer', 'Polish prints', 'Apply cleaning solutions'],
    category: 'cleaning',
    recommended: true
  },
  {
    id: 'deburring-tool',
    name: 'Deburring Tool',
    description: 'Specialized tool for removing sharp edges and excess material from printed parts',
    uses: ['Remove sharp edges', 'Clean up holes', 'Smooth edges', 'Remove support marks'],
    category: 'post-processing',
    recommended: true
  },
  {
    id: 'glue-stick',
    name: 'Purple Glue Stick',
    description: 'Water-soluble adhesive for improving bed adhesion on glass or metal build plates',
    uses: ['Improve bed adhesion', 'Prevent warping', 'Easy to clean', 'Works with PLA, PETG, ABS'],
    category: 'maintenance',
    recommended: true
  },
  {
    id: 'plier-set',
    name: 'Plier Set',
    description: 'Various pliers for support removal, part handling, and maintenance tasks',
    uses: ['Remove supports', 'Hold hot parts', 'Maintenance tasks', 'Part assembly'],
    category: 'general',
    recommended: true
  },
  {
    id: 'file-set',
    name: 'File Set',
    description: 'Different file shapes and grits for smoothing and shaping printed parts',
    uses: ['Smooth surfaces', 'Shape parts', 'Remove layer lines', 'Fit adjustments'],
    category: 'post-processing'
  },
  {
    id: 'super-lube',
    name: 'Super Lube',
    description: 'Synthetic grease for lubricating 3D printer rails, bearings, and lead screws',
    uses: ['Lubricate linear rails', 'Grease bearings', 'Maintain lead screws', 'Reduce friction'],
    category: 'lubrication',
    recommended: true
  },
  {
    id: 'nozzle-cleaning',
    name: 'Nozzle Cleaning Tools',
    description: 'Needles and brushes specifically designed for cleaning 3D printer nozzles',
    uses: ['Clear clogs', 'Maintain nozzles', 'Remove debris', 'Prevent jams'],
    category: 'maintenance',
    recommended: true
  },
  {
    id: 'hygrometer',
    name: 'Hygrometer',
    description: 'Measures humidity levels to monitor filament storage conditions',
    uses: ['Monitor humidity', 'Check storage conditions', 'Prevent filament moisture', 'Calibrate dry boxes'],
    category: 'measurement'
  },
  {
    id: 'vacuum-bags',
    name: 'Vacuum Storage Bags',
    description: 'Airtight bags for storing filament and preventing moisture absorption',
    uses: ['Store filament', 'Prevent moisture', 'Long-term storage', 'Save space'],
    category: 'general'
  },
  {
    id: 'silica-gel',
    name: 'Reusable Silica Gel Packages',
    description: 'Moisture-absorbing packets that can be recharged for filament storage',
    uses: ['Absorb moisture', 'Protect filament', 'Reusable desiccant', 'Dry storage'],
    category: 'general',
    recommended: true
  },
  {
    id: 'flush-cutters',
    name: 'Flush Cutters',
    description: 'Precision cutting tool for clean removal of supports and excess material',
    uses: ['Remove supports', 'Cut filament', 'Clean cuts', 'Precise trimming'],
    category: 'post-processing',
    recommended: true
  },
  {
    id: 'allen-key-set',
    name: 'Allen Key Set (Hex Keys)',
    description: 'Essential for 3D printer assembly, maintenance, and adjustments',
    uses: ['Printer assembly', 'Maintenance', 'Adjustments', 'Repairs'],
    category: 'maintenance',
    recommended: true
  },
  {
    id: 'low-profile-wrench',
    name: 'Low Profile Wrench',
    description: 'Thin wrench for adjusting nozzles and reaching tight spaces',
    uses: ['Nozzle changes', 'Tight spaces', 'Hotend maintenance', 'Bed leveling'],
    category: 'maintenance'
  },
  {
    id: 'print-scraper',
    name: 'Print Bed Scraper',
    description: 'Tool for safely removing prints from the build surface',
    uses: ['Remove prints', 'Clean build plate', 'Avoid damage', 'Safe removal'],
    category: 'general',
    recommended: true
  },
  {
    id: 'scalpel-knife',
    name: 'Scalpel/X-ACTO Knife',
    description: 'Precision cutting tool for detailed post-processing work',
    uses: ['Detail work', 'Support removal', 'Precision cuts', 'Model cleanup'],
    category: 'post-processing',
    recommended: true
  },
  {
    id: 'calipers',
    name: 'Digital Calipers',
    description: 'Precision measuring tool for checking print dimensions and calibration',
    uses: ['Measure prints', 'Check accuracy', 'Calibration', 'Design verification'],
    category: 'measurement',
    recommended: true
  },
  {
    id: 'wire-brush',
    name: 'Wire Brush',
    description: 'Brass or steel wire brush for cleaning nozzles and print surfaces',
    uses: ['Clean nozzles', 'Remove debris', 'Surface cleaning', 'Maintenance'],
    category: 'cleaning'
  },
  {
    id: 'dremel',
    name: 'Dremel/Rotary Tool',
    description: 'Versatile rotary tool for detailed post-processing and modifications',
    uses: ['Sanding', 'Cutting', 'Polishing', 'Drilling'],
    category: 'post-processing'
  },
  {
    id: 'cr2032',
    name: 'CR2032 Batteries',
    description: 'Common battery for digital calipers and other measurement tools',
    uses: ['Power calipers', 'Backup power', 'Measurement tools', 'Electronics'],
    category: 'general'
  },
  {
    id: 'plastic-paint',
    name: 'Plastic-Safe Paint',
    description: 'Paint specifically formulated for adhesion to 3D printed plastics',
    uses: ['Paint prints', 'Color models', 'Finishing', 'Aesthetics'],
    category: 'post-processing'
  },
  {
    id: '3d-gloop',
    name: '3D Gloop',
    description: 'Specialized adhesive for bonding 3D printed parts together',
    uses: ['Bond prints', 'Assembly', 'Repairs', 'Strong adhesion'],
    category: 'post-processing'
  },
  {
    id: 'respirator',
    name: 'Respirator Mask',
    description: 'Safety equipment for protection against fumes and particles',
    uses: ['Fume protection', 'Dust protection', 'Painting safety', 'Resin printing'],
    category: 'safety',
    recommended: true
  },
  {
    id: 'foam-sander',
    name: 'Foam Sanding Blocks',
    description: 'Various grit sanding blocks for smoothing printed surfaces',
    uses: ['Surface finishing', 'Remove layer lines', 'Smooth prints', 'Progressive sanding'],
    category: 'post-processing'
  },
  {
    id: 'drill-press',
    name: 'Mini Drill Press',
    description: 'Precision drilling tool for accurate holes in printed parts',
    uses: ['Precise holes', 'Part modification', 'Assembly prep', 'Consistent drilling'],
    category: 'post-processing'
  }
]

function ToolsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'maintenance', name: 'Maintenance' },
    { id: 'post-processing', name: 'Post-Processing' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'measurement', name: 'Measurement' },
    { id: 'safety', name: 'Safety' },
    { id: 'lubrication', name: 'Lubrication' },
    { id: 'general', name: 'General' }
  ]

  const filteredTools = toolsData.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <SEO 
        title="3D Printing Tools & Equipment Guide | 3D Print Wiki"
        description="Essential tools for 3D printing: maintenance tools, post-processing equipment, safety gear, and measurement devices. Complete guide to 3D printing tools."
        keywords="3D printing tools, 3D printer maintenance, post processing tools, 3D printing equipment, safety gear, measurement tools"
        url="https://3dprintwiki.com/tools"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className={`${viewMode === "table" ? "w-full px-2" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              3D Printing Tools & Equipment
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Essential tools for maintenance, post-processing, measurement, and safety in 3D printing.
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
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Content */}
          {viewMode === 'grid' ? (
            <>
              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <div 
                    key={tool.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {tool.name}
                        </h3>
                        {tool.recommended && (
                          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded">
                            Recommended
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {tool.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Common Uses:
                        </h4>
                        <ul className="list-disc list-inside space-y-1">
                          {tool.uses.map((use, index) => (
                            <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                              {use}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No tools found matching your criteria.
                  </p>
                </div>
              )}
            </>
          ) : (
            <ToolsTable tools={toolsData} />
          )}
        </div>
      </div>
    </>
  )
}
