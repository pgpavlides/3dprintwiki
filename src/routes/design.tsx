import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '../components/SEO/SEO'

export const Route = createFileRoute('/design')({
  component: DesignPage,
})

function DesignPage() {
  return (
    <>
      <SEO 
        title="3D Printing Design & Modeling Guide | 3D Print Wiki"
        description="Learn 3D modeling for printing: CAD software guides, design tips, model optimization, and file preparation. Master design for additive manufacturing."
        keywords="3D modeling, CAD software, design for 3D printing, model optimization, STL files, Fusion 360, Tinkercad, design tips"
        url="https://3dprintwiki.com/design"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Design & Modeling Guide
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Master 3D modeling for printing with CAD software guides, design tips, and optimization techniques.
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
                  This section is coming soon! We're creating comprehensive design and modeling guides.
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
                <li>• CAD software comparisons</li>
                <li>• Fusion 360 tutorials</li>
                <li>• Tinkercad basics</li>
                <li>• OpenSCAD programming</li>
                <li>• Design for printability</li>
                <li>• Support structure considerations</li>
                <li>• Wall thickness guidelines</li>
                <li>• Bridging and overhang rules</li>
                <li>• Model repair techniques</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Coming Features
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Interactive design tutorials</li>
                <li>• Printability checker tool</li>
                <li>• Model optimization wizard</li>
                <li>• Design templates library</li>
                <li>• Video modeling courses</li>
                <li>• Community design challenges</li>
                <li>• Advanced modeling techniques</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
