import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { isAuthenticated } from '../../utils/auth';
import { SEO } from '../../components/SEO/SEO';

export const Route = createFileRoute('/admin/content')({
  component: ContentManagement,
});

function ContentManagement() {
  const navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
    }
  }, [navigate]);

  // If not authenticated, don't render the page
  if (!isAuthenticated()) {
    return null;
  }

  // Sample content data - this would typically come from your database or CMS
  const contentItems = [
    {
      id: 1,
      title: 'Material Guide: PLA',
      type: 'Guide',
      dateCreated: '2025-02-15',
      lastModified: '2025-04-20',
      status: 'Published',
    },
    {
      id: 2,
      title: 'Print Cost Calculator',
      type: 'Tool',
      dateCreated: '2025-01-10',
      lastModified: '2025-04-18',
      status: 'Published',
    },
    {
      id: 3,
      title: 'Hardware Guide: Screws',
      type: 'Guide',
      dateCreated: '2025-03-05',
      lastModified: '2025-03-05',
      status: 'Draft',
    },
  ];

  return (
    <>
      <SEO
        title="Content Management | 3D Print Wiki Admin"
        description="Manage website content for 3D Print Wiki"
        keywords="admin, content management"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo/logo.svg" alt="3D Print Wiki Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Content Management
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/admin"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Dashboard
              </a>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6 flex justify-between">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">Content Items</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Add New Content
            </button>
          </div>

          {/* Content Table */}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {contentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.dateCreated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {item.lastModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Published' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/admin/content/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                        Edit
                      </a>
                      <a href="#" className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
