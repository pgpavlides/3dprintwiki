import { Outlet, createRootRoute, Link, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeToggle } from '../components/ThemeToggle'
import { FontToggle } from '../components/FontToggle'
import { SEO } from '../components/SEO/SEO'
import { LenisWrapper, scrollTo } from '../components/LenisWrapper'
import { NavigationProvider, useNavigation } from '../contexts/NavigationContext'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <NavigationProvider>
      <RootComponent />
    </NavigationProvider>
  );
}

function RootComponent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { customBackHandler } = useNavigation();

  return (
    <LenisWrapper>
      <SEO />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative">
        {/* Absolute positioned navigation elements */}
        {!isHomePage && (
          <>
            {/* Back button and Logo - top left */}
            <div className="fixed top-4 left-4 flex items-center space-x-3 z-50">
              <button
                onClick={() => {
                  if (customBackHandler) {
                    customBackHandler();
                  } else if (window.history.length > 1) {
                    window.history.back();
                  } else {
                    // If no history, scroll to top with Lenis
                    scrollTo(0, { duration: 1.2 });
                  }
                }}
                className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg border border-gray-200 dark:border-gray-700"
                title="Go back"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              
              <Link
                to="/"
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 border border-gray-200 dark:border-gray-700"
              >
                <img
                  src="/logo/logo.svg"
                  alt="3D Print Wiki Logo"
                  className="h-6 w-6"
                />
                <span className="text-gray-900 dark:text-white font-bold text-lg">
                  3D Print Wiki
                </span>
              </Link>
            </div>

            {/* Font and Theme toggles - top right */}
            <div className="fixed top-4 right-4 flex items-center space-x-2 z-50">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg p-1 flex items-center space-x-1 border border-gray-200 dark:border-gray-700">
                <FontToggle />
                <ThemeToggle />
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main>
          <Outlet />
        </main>

        <TanStackRouterDevtools />
      </div>
      
      {/* Floating social links - removed from root component */}
    </LenisWrapper>
  )
}
