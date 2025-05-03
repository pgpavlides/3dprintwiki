import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link 
                to="/" 
                className="flex items-center px-2 py-2 text-gray-900 font-bold text-xl"
              >
                3D Print Wiki
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  activeProps={{
                    className: 'border-blue-500 text-gray-900'
                  }}
                  inactiveProps={{
                    className: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }}
                >
                  Home
                </Link>
                <Link
                  to="/materials"
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  activeProps={{
                    className: 'border-blue-500 text-gray-900'
                  }}
                  inactiveProps={{
                    className: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }}
                >
                  Materials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} 3D Print Wiki. All rights reserved.
          </p>
        </div>
      </footer>

      <TanStackRouterDevtools />
    </div>
  )
}
