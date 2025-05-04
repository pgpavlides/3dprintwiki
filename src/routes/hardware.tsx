import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { SEO } from '../components/SEO/SEO'
import { HardwareTable } from '../components/HardwareTable'

export const Route = createFileRoute('/hardware')({
  component: HardwarePage,
})

export interface Hardware {
  id: string
  name: string
  description: string
  uses: string[]
  category: 'fasteners' | 'threaded-inserts' | 'bearings' | 'springs' | 'electronics' | 'accessories' | 'seals'
  specifications?: string[]
  recommended?: boolean
  image?: string
}

export const hardwareData: Hardware[] = [
  {
    id: 'brass-inserts',
    name: 'Brass Threaded Inserts',
    description: 'Heat-set threaded inserts for creating strong, reusable threads in 3D printed parts',
    uses: ['Create durable threads', 'Reusable screw holes', 'Stronger assemblies', 'Professional finish'],
    specifications: ['M2, M2.5, M3, M4, M5 sizes', 'Heat-set installation', 'Knurled exterior for grip'],
    category: 'threaded-inserts',
    recommended: true
  },
  {
    id: 'o-rings',
    name: 'O-Ring Assortment',
    description: 'Various sizes of rubber O-rings for sealing applications and mechanical assemblies',
    uses: ['Waterproof seals', 'Gas-tight connections', 'Vibration dampening', 'Mechanical assemblies'],
    specifications: ['Multiple sizes', 'Nitrile rubber', 'Temperature resistant'],
    category: 'seals',
    recommended: true
  },
  {
    id: 'rubber-bands',
    name: 'Rubber Bands',
    description: 'Assorted sizes of rubber bands for temporary holding, tensioning, and prototype testing',
    uses: ['Temporary holding', 'Tensioning mechanisms', 'Prototype testing', 'Quick fixes'],
    specifications: ['Various sizes', 'Natural rubber', 'Elastic properties'],
    category: 'accessories'
  },
  {
    id: 'compression-springs',
    name: 'Stainless Steel Compression Springs',
    description: 'Assortment of compression springs for mechanical projects and printer upgrades',
    uses: ['Bed leveling springs', 'Tensioning mechanisms', 'Shock absorption', 'Return mechanisms'],
    specifications: ['304 Stainless steel', 'Various diameters and lengths', 'Different spring rates'],
    category: 'springs',
    recommended: true
  },
  {
    id: 'm3-screws',
    name: 'M3 Screw Assortment',
    description: 'Common metric screws used in 3D printers and printed projects',
    uses: ['Printer assembly', 'Project assembly', 'Repairs', 'Modifications'],
    specifications: ['M3 x 6mm to 30mm', 'Socket head cap screws', 'Stainless steel or black oxide'],
    category: 'fasteners',
    recommended: true
  },
  {
    id: 'm4-screws',
    name: 'M4 Screw Assortment',
    description: 'Larger metric screws for structural assemblies and frame connections',
    uses: ['Frame assembly', 'Structural connections', 'Heavy-duty applications', 'Printer frames'],
    specifications: ['M4 x 8mm to 40mm', 'Socket head and button head', 'Steel with zinc plating'],
    category: 'fasteners',
    recommended: true
  },
  {
    id: 'm5-screws',
    name: 'M5 Screw Assortment',
    description: 'Heavy-duty screws for frame construction and load-bearing assemblies',
    uses: ['Frame construction', 'Load-bearing joints', 'Heavy assemblies', 'Structural support'],
    specifications: ['M5 x 8mm to 50mm', 'Various head types', 'High-strength steel'],
    category: 'fasteners'
  },
  {
    id: 't-nuts',
    name: 'T-Nuts for 2020/3030 Extrusion',
    description: 'Sliding T-nuts for aluminum extrusion assembly and modifications',
    uses: ['Extrusion assembly', 'Frame modifications', 'Mounting accessories', 'Adjustable connections'],
    specifications: ['M3, M4, M5 thread sizes', 'Drop-in and slide-in types', 'Steel construction'],
    category: 'fasteners',
    recommended: true
  },
  {
    id: 'hex-nuts',
    name: 'Hex Nut Assortment',
    description: 'Standard hex nuts in various metric sizes for general assembly',
    uses: ['General assembly', 'Securing bolts', 'Mechanical connections', 'Repairs'],
    specifications: ['M2 to M8 sizes', 'Steel with zinc plating', 'DIN 934 standard'],
    category: 'fasteners',
    recommended: true
  },
  {
    id: 'nyloc-nuts',
    name: 'Nyloc Nuts (Lock Nuts)',
    description: 'Self-locking nuts with nylon insert to prevent loosening from vibration',
    uses: ['Vibration resistance', 'Secure connections', 'Moving parts', 'Critical assemblies'],
    specifications: ['M3 to M8 sizes', 'Nylon insert', 'Zinc-plated steel'],
    category: 'fasteners',
    recommended: true
  },
  {
    id: 'washers',
    name: 'Washer Assortment',
    description: 'Flat and lock washers in various sizes for proper load distribution',
    uses: ['Load distribution', 'Surface protection', 'Prevent loosening', 'Spacing'],
    specifications: ['M2 to M8 sizes', 'Flat and split lock types', 'Stainless steel'],
    category: 'fasteners',
    recommended: true
  },
  {
    id: 'linear-bearings',
    name: 'Linear Bearings (LM8UU)',
    description: 'Linear ball bearings for smooth motion on 8mm rods',
    uses: ['Linear motion', 'Printer upgrades', 'CNC projects', 'Smooth movement'],
    specifications: ['8mm bore', 'Standard LM8UU dimensions', 'Chrome steel balls'],
    category: 'bearings',
    recommended: true
  },
  {
    id: '608-bearings',
    name: '608 Bearings',
    description: 'Common skateboard bearings used in many 3D printer designs',
    uses: ['Spool holders', 'Idler pulleys', 'Rotary motion', 'V-slot wheels'],
    specifications: ['8mm bore, 22mm OD, 7mm width', 'ABEC rated', 'Sealed design'],
    category: 'bearings',
    recommended: true
  },
  {
    id: '625-bearings',
    name: '625 Bearings',
    description: 'Small precision bearings for idler pulleys and small assemblies',
    uses: ['Idler pulleys', 'Small mechanisms', 'Belt tensioners', 'Precision applications'],
    specifications: ['5mm bore, 16mm OD, 5mm width', 'Sealed 2RS', 'Chrome steel'],
    category: 'bearings'
  },
  {
    id: 'timing-belts',
    name: 'GT2 Timing Belts',
    description: 'Reinforced rubber timing belts for precise motion control',
    uses: ['Motion systems', 'Printer upgrades', 'CNC machines', 'Precise positioning'],
    specifications: ['2mm pitch', '6mm width standard', 'Fiberglass reinforced'],
    category: 'accessories',
    recommended: true
  },
  {
    id: 'timing-pulleys',
    name: 'GT2 Timing Pulleys',
    description: 'Aluminum timing pulleys for GT2 belts',
    uses: ['Belt drive systems', 'Motion control', 'Printer upgrades', 'Power transmission'],
    specifications: ['20 tooth standard', '5mm bore', 'Aluminum construction'],
    category: 'accessories',
    recommended: true
  },
  {
    id: 'shaft-couplers',
    name: 'Flexible Shaft Couplers',
    description: 'Flexible couplings for connecting motor shafts to lead screws',
    uses: ['Z-axis coupling', 'Motor connections', 'Misalignment compensation', 'Vibration dampening'],
    specifications: ['5mm to 8mm', 'Aluminum with rubber spider', 'Various sizes available'],
    category: 'accessories',
    recommended: true
  },
  {
    id: 'lead-screws',
    name: 'Lead Screws and Nuts',
    description: 'Trapezoidal lead screws for linear motion in Z-axis',
    uses: ['Z-axis motion', 'Linear actuators', 'Precise positioning', 'Heavy lifting'],
    specifications: ['8mm diameter standard', '2mm or 8mm pitch', 'Brass nuts included'],
    category: 'accessories'
  },
  {
    id: 'smooth-rods',
    name: 'Precision Smooth Rods',
    description: 'Hardened steel rods for linear motion systems',
    uses: ['Linear guides', 'Motion systems', 'Printer frames', 'Precision alignment'],
    specifications: ['8mm standard diameter', 'Chrome plated', 'H6 tolerance'],
    category: 'accessories'
  },
  {
    id: 'stepper-motors',
    name: 'NEMA 17 Stepper Motors',
    description: 'Standard stepper motors for 3D printer motion control',
    uses: ['X/Y/Z axis motion', 'Extruder drive', 'CNC machines', 'Automation projects'],
    specifications: ['1.8° step angle', '1.5A-2A rating', '40-50 N⋅cm holding torque'],
    category: 'electronics',
    recommended: true
  },
  {
    id: 'endstops',
    name: 'Mechanical Endstops',
    description: 'Limit switches for homing and position detection',
    uses: ['Axis homing', 'Position limits', 'Safety stops', 'Calibration'],
    specifications: ['Microswitch based', 'NO/NC contacts', 'With PCB mount'],
    category: 'electronics',
    recommended: true
  },
  {
    id: 'thermistors',
    name: 'Thermistors',
    description: 'Temperature sensors for hotend and heated bed monitoring',
    uses: ['Temperature monitoring', 'Hotend sensing', 'Bed temperature', 'Thermal protection'],
    specifications: ['100K NTC', '3950 Beta value', 'Glass bead type'],
    category: 'electronics',
    recommended: true
  },
  {
    id: 'heater-cartridges',
    name: 'Heater Cartridges',
    description: 'Heating elements for hotend temperature control',
    uses: ['Hotend heating', 'Temperature control', 'Filament melting', 'Part replacement'],
    specifications: ['12V/24V options', '40W standard', '6mm diameter'],
    category: 'electronics',
    recommended: true
  },
  {
    id: 'fans',
    name: 'Cooling Fans',
    description: 'Various fans for hotend cooling, part cooling, and electronics cooling',
    uses: ['Part cooling', 'Hotend cooling', 'Electronics cooling', 'Heat management'],
    specifications: ['40mm standard size', '12V/24V options', 'Ball bearing type'],
    category: 'electronics',
    recommended: true
  },
  {
    id: 'ptfe-tube',
    name: 'PTFE Tubing',
    description: 'Low-friction tubing for filament guidance',
    uses: ['Bowden tubes', 'Filament path', 'Direct drive guide', 'Reduced friction'],
    specifications: ['2mm ID/4mm OD standard', 'Capricorn for high temp', 'High quality PTFE'],
    category: 'accessories',
    recommended: true
  },
  {
    id: 'pneumatic-fittings',
    name: 'Pneumatic Fittings',
    description: 'Push-to-connect fittings for PTFE tube connections',
    uses: ['PTFE connections', 'Bowden setup', 'Quick release', 'Secure tubing'],
    specifications: ['PC4-M6 standard', 'PC4-M10 for E3D', 'Brass construction'],
    category: 'accessories',
    recommended: true
  },
  {
    id: 'cable-management',
    name: 'Cable Management Kit',
    description: 'Cable chains, zip ties, and spiral wrap for wire organization',
    uses: ['Wire organization', 'Cable protection', 'Professional finish', 'Prevent tangles'],
    specifications: ['10x10mm chain links', 'Various zip tie sizes', 'Spiral wrap included'],
    category: 'accessories',
    recommended: true
  }
]

function HardwarePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Hardware' },
    { id: 'fasteners', name: 'Fasteners' },
    { id: 'threaded-inserts', name: 'Threaded Inserts' },
    { id: 'bearings', name: 'Bearings' },
    { id: 'springs', name: 'Springs' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'seals', name: 'Seals & O-Rings' }
  ]

  const filteredHardware = hardwareData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <SEO 
        title="3D Printing Hardware Guide | 3D Print Wiki"
        description="Essential hardware for 3D printing: fasteners, bearings, electronics, threaded inserts, and mechanical components. Complete hardware reference guide."
        keywords="3D printing hardware, threaded inserts, bearings, fasteners, electronics, mechanical components, printer parts"
        url="https://3dprintwiki.com/hardware"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
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
              {/* Hardware Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHardware.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
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
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredHardware.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No hardware items found matching your criteria.
                  </p>
                </div>
              )}
            </>
          ) : (
            <HardwareTable hardware={hardwareData} />
          )}

          {/* Additional Information */}
          <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hardware Selection Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Quality Matters
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Invest in quality hardware components. Poor quality fasteners can strip, bearings can fail prematurely, and cheap electronics can cause safety issues.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Standardization
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Stick to standard sizes when possible. M3, M4, and M5 fasteners are widely available and used in most 3D printing projects.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Material Compatibility
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Consider the environment your hardware will be used in. Stainless steel resists corrosion, brass inserts work well with plastics, and certain materials handle heat better.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Buy in Bulk
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Common fasteners and components are often much cheaper when bought in assortment kits rather than individually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
