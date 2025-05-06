import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { isAuthenticated, logout, getCurrentUser } from '../../utils/auth';
import { SEO } from '../../components/SEO/SEO';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const username = getCurrentUser();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
    }
  }, [navigate]);

  // If not authenticated, don't render the dashboard
  if (!isAuthenticated()) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate({ to: '/admin/login' });
  };

  // Admin panel sections - customize these based on what you need to manage
  const adminSections = [
    {
      title: 'Content Management',
      icon: '📝',
      description: 'Manage website content and pages',
      path: '/admin/content'
    },
    {
      title: 'User Management',
      icon: '👥',
      description: 'Manage admin users and permissions',
      path: '/admin/users'
    },
    {
      title: 'Statistics',
      icon: '📊',
      description: 'View website analytics and statistics',
      path: '/admin/stats'
    },
    {
      title: 'Settings',
      icon: '⚙️',
      description: 'Configure website settings',
      path: '/admin/settings'
    }
  ];

  return (
    <>
      <SEO
        title="Admin Dashboard | 3D Print Wiki"
        description="Admin dashboard for 3D Print Wiki"
        keywords="admin, dashboard"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo/logo.svg" alt="3D Print Wiki Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {username || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
              <a
                href="/"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                View Site
              </a>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminSections.map((section, index) => (
              <a
                key={index}
                href={section.path}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition hover:shadow-md"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 rounded-md p-3 text-2xl">
                      {section.icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {section.title}
                      </dt>
                      <dd className="flex items-baseline text-sm text-gray-600 dark:text-gray-400">
                        {section.description}
                      </dd>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6">
                  <div className="text-sm">
                    <span className="font-medium text-blue-600 dark:text-blue-400 flex items-center">
                      Manage
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li>
                  <a href="/admin/content/new" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1 flex items-center">
                          <span className="text-2xl mr-3">➕</span>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">Add New Content</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/admin/settings/backup" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1 flex items-center">
                          <span className="text-2xl mr-3">💾</span>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">Backup Website Data</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="/admin/tools/cache" className="block hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1 flex items-center">
                          <span className="text-2xl mr-3">🗑️</span>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">Clear Cache</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
