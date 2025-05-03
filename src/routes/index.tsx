import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const menuItems = [
    {
      icon: '💰',
      title: 'Print Cost Calculator',
      description: 'Calculate the exact cost of your 3D prints based on material, electricity, and other factors',
      path: '/calculator'
    },
    {
      icon: '🧬',
      title: 'Material Guide',
      description: 'Comprehensive guide to 3D printing materials: PLA, ABS, PETG, TPU, and more',
      path: '/materials'
    },
    {
      icon: '🔩',
      title: 'Component Guide',
      description: 'Essential components for 3D printing projects: threaded inserts, screws, bearings, and more',
      path: '/components'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to 3D Print Wiki
          </h1>
          <p className="text-xl text-gray-600">
            Your comprehensive resource for 3D printing information
          </p>
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 group w-full max-w-sm"
              activeProps={{
                className: 'bg-blue-50'
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
