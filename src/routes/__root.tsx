import { Outlet, createRootRoute, Link, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeToggle } from '../components/ThemeToggle'
import { FontToggle } from '../components/FontToggle'
import { SEO } from '../components/SEO/SEO'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isCalculatorPage = location.pathname === '/calculator';
  const showNavAndFooter = !isHomePage && !isCalculatorPage;

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Navigation - Only show if not on homepage or calculator page */}
      {showNavAndFooter && (
        <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 px-2 py-2"
                >
                  <img 
                    src="/logo/logo.svg" 
                    alt="3D Print Wiki Logo" 
                    className="h-10 w-10"
                  />
                  <span className="text-gray-900 dark:text-white font-bold text-xl">
                    3D Print Wiki
                  </span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    activeProps={{
                      className: 'border-blue-500 text-gray-900 dark:text-white'
                    }}
                    inactiveProps={{
                      className: 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                    }}
                  >
                    Home
                  </Link>
                  <Link
                    to="/materials"
                    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    activeProps={{
                      className: 'border-blue-500 text-gray-900 dark:text-white'
                    }}
                    inactiveProps={{
                      className: 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-300'
                    }}
                  >
                    Materials
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FontToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer - Only show if not on homepage or calculator page */}
      {showNavAndFooter && (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} 3D Print Wiki. All rights reserved.
            </p>
          </div>
        </footer>
      )}

      <TanStackRouterDevtools />
      </div>
      
      {/* Floating social links */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
        <a
          href="https://github.com/pgpavlides"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 animate-fade-in-right"
          style={{ animationDelay: '0.1s' }}
          title="GitHub"
        >
          <img src="/svg/github.svg" alt="GitHub" className="w-6 h-6" />
        </a>
        <a
          href="https://buymeacoffee.com/broccolidev"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon bg-[#FFDD00] hover:bg-[#FFEE00] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 animate-fade-in-right"
          style={{ animationDelay: '0.2s' }}
          title="Buy Me a Coffee"
        >
          <img src="/svg/buymeacoffee.svg" alt="Buy Me a Coffee" className="w-6 h-6" />
        </a>
      </div>
    </>
  )
}
