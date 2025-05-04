import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '../components/SEO/SEO'

export const Route = createFileRoute('/electronics')({
  component: ElectronicsPage,
})

function ElectronicsPage() {
  return (
    <>
      <SEO 
        title="3D Printer Electronics & Upgrades | 3D Print Wiki"
        description="Guide to 3D printer electronics: firmware, motherboards, sensors, wiring diagrams, and upgrade paths. Learn about control boards and electronic components."
        keywords="3D printer electronics, firmware, motherboard upgrades, sensors, wiring diagrams, control boards, stepper drivers"
        url="https://3dprintwiki.com/electronics"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Electronics & Upgrades
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive guide to 3D printer electronics, firmware configuration, and upgrade paths.
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  This section is coming soon! We're preparing detailed electronics and firmware guides.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Planned Content
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Control board comparisons</li>
                <li>• Firmware installation guides</li>
                <li>• Marlin configuration</li>
                <li>• Klipper setup tutorials</li>
                <li>• Stepper driver upgrades</li>
                <li>• Sensor installations (BLTouch, filament sensors)</li>
                <li>• Wiring diagrams and pinouts</li>
                <li>• Power supply calculations</li>
                <li>• Display upgrades</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Features
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Interactive wiring diagrams</li>
                <li>• Firmware configuration wizards</li>
                <li>• Troubleshooting flowcharts</li>
                <li>• Component compatibility checker</li>
                <li>• Video installation guides</li>
                <li>• Community firmware configurations</li>
                <li>• Electronics safety guidelines</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
