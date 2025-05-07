import { createFileRoute, useNavigate, Link as RouterLink } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { isAuthenticated, getCurrentUser } from '../../utils/auth';
import { supabase, subscribeToTable } from '../../utils/supabase/client';
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
  notes: string | null;
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
  // Used throughout the component for loading states
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a ref to track the subscription channel
  const subscriptionRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);
  const [linkForm, setLinkForm] = useState<{
    title: string;
    url: string;
    description: string;
    category: string;
    tags: string;
    notes: string;
  }>({
    title: '',
    url: '',
    description: '',
    category: '3D Models',
    tags: '',
    notes: '',
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
        setIsLoading(true);
        
        // Create the links table if it doesn't exist
        await initializeLinksTable();
        
        // Fetch links from Supabase
        const { data, error } = await supabase
          .from('links')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('Error fetching links:', error);
          // If there's an error, we'll just use an empty array
          setLinks([]);
        } else if (data) {
          setLinks(data);
        }
      } catch (error) {
        console.error('Error fetching links:', error);
        setLinks([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Initialize the links table
    const initializeLinksTable = async () => {
      try {
        // Check if links table exists
        const { error: checkError } = await supabase
          .from('links')
          .select('id')
          .limit(1);
        
        if (checkError) {
          console.log('Links table might not exist, attempting to create it');
          
          // Try using SQL to create the table
          const { error: sqlError } = await supabase.rpc('exec_sql', {
            query: `
              CREATE TABLE IF NOT EXISTS links (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                title TEXT NOT NULL,
                url TEXT NOT NULL,
                description TEXT,
                category TEXT NOT NULL,
                tags TEXT[],
                notes TEXT,
                created_by TEXT NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
              );
            `
          });
          
          if (sqlError) {
            console.error('Error creating links table:', sqlError);
          } else {
            console.log('Links table created successfully');
          }
        } else {
          console.log('Links table already exists');
        }
      } catch (error) {
        console.error('Error initializing links table:', error);
      }
    };
    
    // Initial load
    fetchLinks();
    
    // Set up realtime subscription for links
    const channel = subscribeToTable('admin_messages', (payload) => {
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
  const handleAddLink = async () => {
    // Validate required fields
    if (!linkForm.title.trim() || !linkForm.url.trim()) {
      alert('Title and URL are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Ensure URL has http/https protocol
      let url = linkForm.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      // Prepare tags as array
      const tags = linkForm.tags ? 
        linkForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : 
        null;
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('links')
        .insert({
          title: linkForm.title.trim(),
          url: url,
          description: linkForm.description.trim() || null,
          category: linkForm.category,
          tags: tags,
          notes: linkForm.notes.trim() || null,
          created_by: username || 'unknown',
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update links state if Supabase doesn't trigger the subscription
      if (data) {
        setLinks(prev => [data as Link, ...prev]);
      }
      
      // Reset form and exit adding mode
      setLinkForm({
        title: '',
        url: '',
        description: '',
        category: '3D Models',
        tags: '',
        notes: '',
      });
      setIsAddingLink(false);
    } catch (error) {
      console.error('Error adding link:', error);
      alert('Failed to add link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle editing a link
  const handleEditLink = async () => {
    if (!isEditingLink) return;
    
    // Validate required fields
    if (!linkForm.title.trim() || !linkForm.url.trim()) {
      alert('Title and URL are required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Ensure URL has http/https protocol
      let url = linkForm.url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      // Prepare tags as array
      const tags = linkForm.tags ? 
        linkForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : 
        null;
      
      // Update in Supabase
      const { data, error } = await supabase
        .from('links')
        .update({
          title: linkForm.title.trim(),
          url: url,
          description: linkForm.description.trim() || null,
          category: linkForm.category,
          tags: tags,
          notes: linkForm.notes.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', isEditingLink)
        .select()
        .single();
      
      if (error) throw error;
      
      // Update links state if Supabase doesn't trigger the subscription
      if (data) {
        setLinks(prev => prev.map(link => link.id === isEditingLink ? data as Link : link));
      }
      
      // Reset form and exit editing mode
      setLinkForm({
        title: '',
        url: '',
        description: '',
        category: '3D Models',
        tags: '',
        notes: '',
      });
      setIsEditingLink(null);
    } catch (error) {
      console.error('Error updating link:', error);
      alert('Failed to update link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a link
  const handleDeleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    setIsLoading(true);
    
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update links state if Supabase doesn't trigger the subscription
      setLinks(prev => prev.filter(link => link.id !== id));
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle starting to edit a link
  const startEditLink = (link: Link) => {
    setLinkForm({
      title: link.title,
      url: link.url,
      description: link.description || '',
      category: link.category,
      tags: link.tags ? link.tags.join(', ') : '',
      notes: link.notes || '',
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
            <RouterLink
              to="/admin"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </RouterLink>
            <RouterLink
              to="/admin/checklist"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Checklist
            </RouterLink>
            <RouterLink
              to="/admin/notes"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Notes
            </RouterLink>
            <RouterLink
              to="/admin/links"
              className="px-6 py-3 font-medium text-sm text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Links
            </RouterLink>

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
                      Notes (Internal use only)
                    </label>
                    <textarea
                      name="notes"
                      value={linkForm.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                      rows={4}
                      placeholder="Add private notes about this resource (only visible to admins)"
                    ></textarea>
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
                      notes: '',
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
            </div>
          </div>
          
          {/* Links list */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {isLoading ? (
              <div className="p-8 text-center">
                <svg className="animate-spin h-10 w-10 mx-auto text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">Loading links...</p>
              </div>
            ) : filteredLinks.length === 0 ? (
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
