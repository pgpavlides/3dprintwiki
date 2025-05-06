import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { isAuthenticated, getCurrentUser } from '../../utils/auth';
import { supabase, subscribeToTable } from '../../utils/supabase/client';
import { NoteEditor } from '../../components/admin/NoteEditor';
import { Note } from '../../types/database';
import { SEO } from '../../components/SEO/SEO';

export const Route = createFileRoute('/admin/notes')({
  component: NotesPage,
});

function NotesPage() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  
  // Use a ref to track the subscription channel
  const subscriptionRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
    }
  }, [navigate]);

  // Load notes and set up realtime subscription
  useEffect(() => {
    if (!isAuthenticated()) return;
    
    const fetchNotes = async () => {
      try {
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    
    // Initial load
    fetchNotes();
    
    // Set up realtime subscription
    const channel = subscribeToTable('notes', (payload) => {
      // Handle realtime updates
      if (payload.eventType === 'INSERT') {
        setNotes(prev => [payload.new as Note, ...prev]);
        
        // If creating a new note, select it automatically
        if (isCreatingNote) {
          setSelectedNote(payload.new as Note);
          setIsCreatingNote(false);
        }
      } else if (payload.eventType === 'UPDATE') {
        setNotes(prev => 
          prev.map(note => note.id === payload.new.id ? payload.new as Note : note)
        );
        
        // Update selected note if it's the one being edited
        if (selectedNote && selectedNote.id === payload.new.id) {
          setSelectedNote(payload.new as Note);
        }
      } else if (payload.eventType === 'DELETE') {
        setNotes(prev => 
          prev.filter(note => note.id !== payload.old.id)
        );
        
        // Clear selected note if it's the one being deleted
        if (selectedNote && selectedNote.id === payload.old.id) {
          setSelectedNote(null);
        }
      }
    });
    
    subscriptionRef.current = channel;
    
    // Cleanup subscription on unmount
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [navigate, isCreatingNote, selectedNote]);

  // Filter notes based on search query
  const filteredNotes = notes.filter(note => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) || 
      (note.content && note.content.toLowerCase().includes(query))
    );
  });

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    if (name === 'admin') return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
    if (name === 'partner') return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
    return 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
  };

  // Handle creating a new note
  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreatingNote(true);
  };

  // If not authenticated, don't render the page
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <SEO
        title="Shared Notes | 3D Print Wiki Admin"
        description="Admin shared notes for 3D Print Wiki"
        keywords="admin, notes, collaboration"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo/logo.svg" alt="3D Print Wiki Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Shared Notes
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Welcome, {username || 'Admin'}
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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex h-[calc(100vh-180px)] gap-6">
            {/* Notes List */}
            <div className="w-1/3 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-medium text-gray-900 dark:text-white">Notes</h2>
                <div className="mt-2">
                  <input 
                    type="text" 
                    placeholder="Search notes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <button 
                  onClick={handleCreateNote}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                >
                  Create New Note
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {filteredNotes.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <div 
                      key={note.id}
                      onClick={() => {
                        setSelectedNote(note);
                        setIsCreatingNote(false);
                      }}
                      className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        selectedNote && selectedNote.id === note.id 
                          ? 'bg-blue-50 dark:bg-blue-900/20' 
                          : ''
                      }`}
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                        {note.title}
                      </h3>
                      {note.content && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">
                          {note.content.replace(/\n/g, ' ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Updated {formatDate(note.updated_at)}
                        </span>
                        <span className={`${getAvatarColor(note.created_by)} rounded-full w-6 h-6 flex items-center justify-center`}>
                          <span className="text-xs">{getInitial(note.created_by)}</span>
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Note Editor */}
            <div className="w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              {isCreatingNote ? (
                <NoteEditor 
                  note={null}
                  currentUser={username || 'unknown'} 
                  onClose={() => setIsCreatingNote(false)}
                />
              ) : selectedNote ? (
                <NoteEditor 
                  note={selectedNote}
                  currentUser={username || 'unknown'} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-center p-6">
                    <svg className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No Note Selected
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Select a note from the list or create a new one.
                    </p>
                    <button 
                      onClick={handleCreateNote}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                    >
                      Create New Note
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
