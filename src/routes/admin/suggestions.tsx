import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { isAuthenticated, getCurrentUser } from '../../utils/auth';
import { supabase, subscribeToTable } from '../../utils/supabase/client';
import { Suggestion, UpdateSuggestion } from '../../types/database';
import { SEO } from '../../components/SEO/SEO';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/suggestions')({
  component: SuggestionsAdmin,
});

function SuggestionsAdmin() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  
  // Ref for subscription channel
  const suggestionsChannelRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
      return;
    }

    // Load suggestions from Supabase
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('suggestions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching suggestions:', error);
        } else {
          setSuggestions(data || []);
        }
      } catch (error) {
        console.error('Error in suggestion fetch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();

    // Set up realtime subscription
    const suggestionsChannel = subscribeToTable('suggestions', (payload) => {
      if (payload.eventType === 'INSERT') {
        setSuggestions(prev => [payload.new as Suggestion, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setSuggestions(prev => 
          prev.map(suggestion => 
            suggestion.id === payload.new.id ? payload.new as Suggestion : suggestion
          )
        );
        // Update selected suggestion if it was updated
        if (selectedSuggestion && selectedSuggestion.id === payload.new.id) {
          setSelectedSuggestion(payload.new as Suggestion);
        }
      } else if (payload.eventType === 'DELETE') {
        setSuggestions(prev => prev.filter(suggestion => suggestion.id !== payload.old.id));
        // Clear selected suggestion if it was deleted
        if (selectedSuggestion && selectedSuggestion.id === payload.old.id) {
          setSelectedSuggestion(null);
        }
      }
    });

    suggestionsChannelRef.current = suggestionsChannel;

    // Cleanup subscription on unmount
    return () => {
      if (suggestionsChannelRef.current) {
        supabase.removeChannel(suggestionsChannelRef.current);
      }
    };
  }, [navigate]);

  // Filter suggestions based on activeFilter
  const filteredSuggestions = suggestions.filter(suggestion => {
    if (activeFilter === 'all') return true;
    return suggestion.status === activeFilter;
  });

  // Handle changing suggestion status
  const handleStatusChange = async (id: string, newStatus: 'new' | 'in_progress' | 'completed' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('suggestions')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating suggestion status:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in status update:', error);
      return false;
    }
  };

  // Handle deleting a suggestion
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this suggestion?')) return;

    try {
      const { error } = await supabase
        .from('suggestions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting suggestion:', error);
      } else {
        if (selectedSuggestion && selectedSuggestion.id === id) {
          setSelectedSuggestion(null);
        }
      }
    } catch (error) {
      console.error('Error in delete operation:', error);
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get suggestion type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'bug':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'content':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'improvement':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <SEO
        title="Suggestions Admin | 3D Print Wiki"
        description="Manage user suggestions for 3D Print Wiki"
        keywords="admin, suggestions, feedback"
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
                Welcome, {username === 'admin' ? 'George' : username === 'partner' ? 'Sokratis' : username || 'Admin'}
              </span>
              <Link
                to="/"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
            <Link
              to="/admin"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/admin/checklist"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Checklist
            </Link>
            <Link
              to="/admin/notes"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Notes
            </Link>
            <Link
              to="/admin/links"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Links
            </Link>
            <Link
              to="/admin/suggestions"
              className="px-6 py-3 font-medium text-sm text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Suggestions
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Suggestions List */}
            <div className="w-full md:w-2/3">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    User Suggestions
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    All suggestions and feedback received from users
                  </p>
                  
                  {/* Filter tabs */}
                  <div className="mt-4 border-b border-gray-200 dark:border-gray-700">
                    <nav className="-mb-px flex space-x-4">
                      <button
                        onClick={() => setActiveFilter('all')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeFilter === 'all'
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        All Suggestions
                      </button>
                      <button
                        onClick={() => setActiveFilter('new')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeFilter === 'new'
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => setActiveFilter('in_progress')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeFilter === 'in_progress'
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => setActiveFilter('completed')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeFilter === 'completed'
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => setActiveFilter('rejected')}
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeFilter === 'rejected'
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                      >
                        Rejected
                      </button>
                    </nav>
                  </div>
                </div>
                
                {/* Suggestions list */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden">
                  {isLoading ? (
                    <div className="p-4 text-center">
                      <svg className="inline animate-spin h-5 w-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">Loading suggestions...</p>
                    </div>
                  ) : filteredSuggestions.length === 0 ? (
                    <div className="p-8 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <p className="mt-2 text-lg font-medium text-gray-600 dark:text-gray-400">No suggestions found</p>
                      <p className="mt-1 text-gray-500 dark:text-gray-500">
                        {activeFilter === 'all' 
                          ? 'There are no user suggestions yet.' 
                          : `There are no ${activeFilter} suggestions.`}
                      </p>
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredSuggestions.map((suggestion) => (
                        <li 
                          key={suggestion.id}
                          className={`px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                            selectedSuggestion?.id === suggestion.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                          }`}
                          onClick={() => setSelectedSuggestion(suggestion)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap gap-2 mb-1">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(suggestion.type)}`}>
                                  {suggestion.type}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(suggestion.status)}`}>
                                  {suggestion.status}
                                </span>
                              </div>
                              
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {suggestion.text.length > 80 ? `${suggestion.text.substring(0, 80)}...` : suggestion.text}
                              </p>
                              
                              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                                <span>
                                  Page: {suggestion.page}
                                </span>
                                <span className="mx-2">•</span>
                                <span>
                                  {formatDate(suggestion.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right Column - Selected Suggestion Details */}
            <div className="w-full md:w-1/3">
              {selectedSuggestion ? (
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden h-full">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Suggestion Details
                    </h3>
                    <button 
                      onClick={() => handleDelete(selectedSuggestion.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1"
                      title="Delete suggestion"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(selectedSuggestion.type)}`}>
                          {selectedSuggestion.type}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedSuggestion.status)}`}>
                          {selectedSuggestion.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        <span className="font-medium">From Page:</span> {selectedSuggestion.page}
                      </div>
                      
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <span className="font-medium">Submitted:</span> {formatDate(selectedSuggestion.created_at)}
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                          {selectedSuggestion.text}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update Status</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStatusChange(selectedSuggestion.id, 'in_progress')}
                          className={`py-2 px-3 text-sm font-medium rounded-md border ${
                            selectedSuggestion.status === 'in_progress'
                              ? 'bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                          }`}
                        >
                          In Progress
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedSuggestion.id, 'completed')}
                          className={`py-2 px-3 text-sm font-medium rounded-md border ${
                            selectedSuggestion.status === 'completed'
                              ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                          }`}
                        >
                          Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedSuggestion.id, 'new')}
                          className={`py-2 px-3 text-sm font-medium rounded-md border ${
                            selectedSuggestion.status === 'new'
                              ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                          }`}
                        >
                          New
                        </button>
                        <button
                          onClick={() => handleStatusChange(selectedSuggestion.id, 'rejected')}
                          className={`py-2 px-3 text-sm font-medium rounded-md border ${
                            selectedSuggestion.status === 'rejected'
                              ? 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-800 dark:text-red-300'
                              : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                          }`}
                        >
                          Rejected
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <h2 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Select a suggestion</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Click on a suggestion from the list to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
