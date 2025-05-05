import { Outlet, createRootRoute, Link, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeToggle } from '../components/ThemeToggle'
import { FontToggle } from '../components/FontToggle'
import { SEO } from '../components/SEO/SEO'
import { LenisWrapper, scrollTo } from '../components/LenisWrapper'
import { NavigationProvider, useNavigation } from '../contexts/NavigationContext'
import { useState } from 'react'
import { FaQuestion } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

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
  const [showCreatorInfo, setShowCreatorInfo] = useState(false);

  return (
    <LenisWrapper>
      <SEO />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative">
        {/* Absolute positioned navigation elements */}
        {!isHomePage ? (
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
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setShowCreatorInfo(true)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50"
                  title="About Creator"
                >
                  <FaQuestion className="w-4 h-4" />
                </button>
                <FontToggle />
                <ThemeToggle />
              </div>
            </div>
          </>
        ) : (
          /* Only show theme/font toggles and info on homepage */
          <div className="fixed top-4 right-4 flex items-center space-x-2 z-50">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setShowCreatorInfo(true)}
                className="w-9 h-9 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm rounded-full hover:bg-white/50 dark:hover:bg-gray-700/50"
                title="About Creator"
              >
                <FaQuestion className="w-4 h-4" />
              </button>
              <FontToggle />
              <ThemeToggle />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div>
        <Outlet />
        </div>

        {/* Creator Info Popup */}
      {showCreatorInfo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setShowCreatorInfo(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Content */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About 3D Print Wiki</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded">v0.0.7 alpha</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">Created by</h4>
              <p className="text-lg font-bold text-gray-900 dark:text-white">George Pavlides (Broccoli)</p>
              
              {/* Social links */}
              <div className="flex justify-center mt-3 space-x-4">
                <a 
                  href="https://www.linkedin.com/in/pgpavlides/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com/pgpavlides" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
                  title="GitHub Profile"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div className="text-center text-gray-600 dark:text-gray-300 text-sm mb-6">
              <p className="mb-3">I'm an amateur in 3D printing and I have a lot to learn! This wiki is my way of organizing knowledge and sharing it with the community.</p>
              <p>I would appreciate any corrections or additions! Please email me at <a href="mailto:pgpavlides@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">pgpavlides@gmail.com</a></p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => setShowCreatorInfo(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <TanStackRouterDevtools />
      </div>
      
      {/* Floating social links - removed from root component */}
    </LenisWrapper>
  )
}
