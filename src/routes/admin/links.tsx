import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { isAuthenticated, getCurrentUser } from '../../utils/auth';
import { SEO } from '../../components/SEO/SEO';

export const Route = createFileRoute('/admin/links')({
  component: LinksPage,
});

// Define the Link type
interface Link {
  id: string;
  title: string;
  url: string;
  description: string | null;
  category: string;
  tags: string[] | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Define the LinkCategory type
interface LinkCategory {
  id: string;
  name: string;
  color: string;
}

function LinksPage() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState<string | null>(null);
  const [linkForm, setLinkForm] = useState<{
    title: string;
    url: string;
    description: string;
    category: string;
    tags: string;
  }>({
    title: '',
    url: '',
    description: '',
    category: '3D Models',
    tags: '',
  });
  
  // Define link categories with colors
  const categories: LinkCategory[] = [
    { id: '1', name: '3D Models', color: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' },
    { id: '2', name: 'YouTube Channels', color: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' },
    { id: '3', name: 'Tutorials', color: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' },
    { id: '4', name: 'Documentation', color: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' },
    { id: '5', name: 'Software', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' },
    { id: '6', name: 'Hardware', color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' },
    { id: '7', name: 'Communities', color: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200' },
    { id: '8', name: 'Blogs', color: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' },
    { id: '9', name: 'Tools', color: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200' },
    { id: '10', name: 'Materials', color: 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200' },
    { id: '11', name: 'Research Papers', color: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' },
    { id: '12', name: 'Other', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200' },
  ];

  // Use a ref to track the subscription channel
  const subscriptionRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
    }
    
    // Check for state from navigation to auto-open new link form
    const locationState = window.history.state?.usr || {};
    if (locationState.createNew) {
      setIsAddingLink(true);
      
      // Clear the state to prevent re-opening on refresh
      const newState = { ...locationState };
      delete newState.createNew;
      navigate({ to: '/admin/links', state: newState, replace: true });
    }
  }, [navigate]);

  // Simulate loading links and set up realtime subscription
  useEffect(() => {
    if (!isAuthenticated()) return;
    
    const fetchLinks = async () => {
      try {
        // For the initial implementation, we'll mock some sample links
        // In the future, this will be replaced with a real Supabase query
        const sampleLinks: Link[] = [
          {
            id: '1',
            title: 'Thingiverse - 3D Models Platform',
            url: 'https://www.thingiverse.com/',
            description: 'A large repository of free 3D models for printing',
            category: '3D Models',
            tags: ['repositories', 'free', 'models'],
            created_by: username || 'admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Teaching Tech YouTube Channel',
            url: 'https://www.youtube.com/channel/UCbgBDBrwsikmtoLqtpc59Bw',
            description: 'Great 3D printing tutorials and calibration guides',
            category: 'YouTube Channels',
            tags: ['tutorials', 'education', 'calibration'],
            created_by: username || 'admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '3',
            title: 'Prusa Knowledge Base',
            url: 'https://help.prusa3d.com/',
            description: 'Official documentation for Prusa 3D printers',
            category: 'Documentation',
            tags: ['guides', 'official', 'prusa'],
            created_by: username || 'admin',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ];
        
        setLinks(sampleLinks);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };
    
    // Initial load
    fetchLinks();
    
    // In the future, this will be a real Supabase subscription
    // For now, it's just a placeholder
    
    /*
    // Once we have a 'links' table in Supabase, we'll use this code:
    const channel = subscribeToTable('links', (payload) => {
      if (payload.eventType === 'INSERT') {
        setLinks(prev => [payload.new as Link, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setLinks(prev => 
          prev.map(link => link.id === payload.new.id ? payload.new as Link : link)
        );
      } else if (payload.eventType === 'DELETE') {
        setLinks(prev => 
          prev.filter(link => link.id !== payload.old.id)
        );
      }
    });
    
    subscriptionRef.current = channel;
    
    // Cleanup subscription on unmount
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
    */
  }, [navigate, username]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLinkForm({
      ...linkForm,
      [name]: value,
    });
  };

  // Handle adding a new link
  const handleAddLink = () => {
    // Validate required fields
    if (!linkForm.title.trim() || !linkForm.url.trim()) {
      alert('Title and URL are required');
      return;
    }
    
    // Ensure URL has http/https protocol
    let url = linkForm.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Create a new link object
    const newLink: Link = {
      id: Date.now().toString(), // temporary ID, would be replaced by Supabase
      title: linkForm.title.trim(),
      url: url,
      description: linkForm.description.trim() || null,
      category: linkForm.category,
      tags: linkForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') || null,
      created_by: username || 'unknown',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Add to state (would be inserted to Supabase in the real implementation)
    setLinks(prev => [newLink, ...prev]);
    
    // Reset form and exit adding mode
    setLinkForm({
      title: '',
      url: '',
      description: '',
      category: '3D Models',
      tags: '',
    });
    setIsAddingLink(false);
  };

  // Handle editing a link
  const handleEditLink = () => {
    if (!isEditingLink) return;
    
    // Validate required fields
    if (!linkForm.title.trim() || !linkForm.url.trim()) {
      alert('Title and URL are required');
      return;
    }
    
    // Ensure URL has http/https protocol
    let url = linkForm.url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    // Update the link (in the real implementation, this would be a Supabase update)
    setLinks(prev => prev.map(link => {
      if (link.id === isEditingLink) {
        return {
          ...link,
          title: linkForm.title.trim(),
          url: url,
          description: linkForm.description.trim() || null,
          category: linkForm.category,
          tags: linkForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') || null,
          updated_at: new Date().toISOString(),
        };
      }
      return link;
    }));
    
    // Reset form and exit editing mode
    setLinkForm({
      title: '',
      url: '',
      description: '',
      category: '3D Models',
      tags: '',
    });
    setIsEditingLink(null);
  };

  // Handle deleting a link
  const handleDeleteLink = (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    // Remove from state (would delete from Supabase in the real implementation)
    setLinks(prev => prev.filter(link => link.id !== id));
  };

  // Handle starting to edit a link
  const startEditLink = (link: Link) => {
    setLinkForm({
      title: link.title,
      url: link.url,
      description: link.description || '',
      category: link.category,
      tags: link.tags ? link.tags.join(', ') : '',
    });
    setIsEditingLink(link.id);
  };

  // Filter links based on search query and selected category
  const filteredLinks = links.filter(link => {
    // Filter by category if one is selected
    if (selectedCategory && link.category !== selectedCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        link.title.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        (link.description && link.description.toLowerCase().includes(query)) ||
        (link.tags && link.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    return true;
  });

  // Get category color by name
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // If not authenticated, don't render the page
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <SEO
        title="Resource Links | 3D Print Wiki Admin"
        description="Resource link management for 3D Print Wiki"
        keywords="admin, links, resources, 3D printing"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo/logo.svg" alt="3D Print Wiki Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Resource Links
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {username === 'admin' ? 'George' : username === 'partner' ? 'Sokratis' : username || 'Admin'}
              </span>
              <a
                href="/admin"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                Dashboard
              </a>
            </div>
          </div>
        </header>

        {/* Navigation - Now with sticky positioning */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
            <a
              href="/admin"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Dashboard
            </a>
            <a
              href="/admin/checklist"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Checklist
            </a>
            <a
              href="/admin/notes"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Notes
            </a>
            <a
              href="/admin/links"
              className="px-6 py-3 font-medium text-sm text-blue-600 border-b-2 border-blue-600"
            >
              Links
            </a>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Add link form */}
          {(isAddingLink || isEditingLink) && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isEditingLink ? 'Edit Link' : 'Add New Link'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={linkForm.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                      placeholder="Enter link title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      URL *
                    </label>
                    <input
                      type="text"
                      name="url"
                      value={linkForm.url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      value={linkForm.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={linkForm.description}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                      rows={3}
                      placeholder="Enter a brief description (optional)"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={linkForm.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                      placeholder="e.g. tutorials, beginner, slicer"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsAddingLink(false);
                    setIsEditingLink(null);
                    setLinkForm({
                      title: '',
                      url: '',
                      description: '',
                      category: '3D Models',
                      tags: '',
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditingLink ? handleEditLink : handleAddLink}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                >
                  {isEditingLink ? 'Save Changes' : 'Add Link'}
                </button>
              </div>
            </div>
          )}
          
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-3 py-1 text-xs rounded-full ${
                      selectedCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : category.color
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setIsAddingLink(true)}
                className="md:w-auto w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Link
              </button>
            </div>
          </div>
          
          {/* Links list */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {filteredLinks.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">No links found</p>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {searchQuery || selectedCategory
                    ? 'Try changing your search or category filter'
                    : 'Start by adding your first link'}
                </p>
                {!isAddingLink && (
                  <button
                    onClick={() => setIsAddingLink(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                  >
                    Add New Link
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title & Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Added By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredLinks.map((link) => (
                      <tr key={link.id}>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                            >
                              {link.title}
                            </a>
                            {link.description && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                {link.description}
                              </p>
                            )}
                            {link.tags && link.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {link.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(link.category)}`}>
                            {link.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {link.created_by === 'admin' ? 'George' : 
                           link.created_by === 'partner' ? 'Sokratis' : 
                           link.created_by}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(link.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => startEditLink(link)}
                              className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Edit Link"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDeleteLink(link.id)}
                              className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete Link"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
