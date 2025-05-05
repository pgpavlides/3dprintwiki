import { createFileRoute } from '@tanstack/react-router'
import { SEO } from '../components/SEO/SEO'

export const Route = createFileRoute('/design-and-postprocessing')({
  component: DesignAndPostProcessingPage,
})

function DesignAndPostProcessingPage() {
  return (
    <>
      <SEO 
        title="Design, Modeling & Post Processing | 3D Print Wiki"
        description="CAD software guides, design tips, model optimization, file preparation, and finishing techniques for 3D printing."
        keywords="3D modeling, CAD software, 3D design tips, model optimization, file preparation, post processing, sanding, painting, vapor smoothing, surface finishing"
        url="https://3dprintwiki.com/design-and-postprocessing"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/logo/logo.svg" 
                alt="3D Print Wiki Logo" 
                className="h-48 w-48 mx-auto"
              />
            </div>
            
            {/* Under Construction Message */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              PAGE UNDER CONSTRUCTION!
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're working on comprehensive guides for CAD software, design tips, model optimization, file preparation, sanding, painting, vapor smoothing, support removal, and surface finishing techniques. Check back soon!
            </p>
            
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-8">
              This is a growing list. If you know of other valuable resources that should be included, please let us know at <a href="mailto:pgpavlides@gmail.com" className="underline hover:text-blue-900 dark:hover:text-blue-300">pgpavlides@gmail.com</a>!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
