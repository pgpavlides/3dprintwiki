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

  // Handle creating a new note
  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsCreatingNote(true);
  };

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
      return;
    }
    
    // Check for state from navigation to auto-open new note
    const locationState = window.history.state?.usr || {};
    if (locationState.createNew) {
      handleCreateNote();
      
      // Clear the state to prevent re-opening on refresh
      const newState = { ...locationState };
      delete newState.createNew;
      navigate({ to: '/admin/notes', state: newState, replace: true });
    }
  }, [navigate]);

  // Manually handle note events
  useEffect(() => {
    // Handle note deletion
    const handleNoteDeleted = (event: any) => {
      const { noteId } = event.detail;
      
      // Update notes state immediately
      setNotes(prev => prev.filter(note => note.id !== noteId));
      
      // If the deleted note is currently selected, deselect it
      if (selectedNote && selectedNote.id === noteId) {
        setSelectedNote(null);
      }
    };
    
    // Handle note added
    const handleNoteAdded = (event: any) => {
      const { note } = event.detail;
      if (note) {
        // Add to the top of the list
        setNotes(prev => [note, ...prev.filter(n => n.id !== note.id)]);
        setSelectedNote(note);
        setIsCreatingNote(false);
      }
    };

    // Handle note updated
    const handleNoteUpdated = (event: any) => {
      const { note } = event.detail;
      if (note) {
        // Update the note in the list
        setNotes(prev => prev.map(n => n.id === note.id ? note : n));
        // Update selected note if it's the one being edited
        if (selectedNote && selectedNote.id === note.id) {
          setSelectedNote(note);
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('note_deleted', handleNoteDeleted);
    window.addEventListener('note_added', handleNoteAdded);
    window.addEventListener('note_updated', handleNoteUpdated);
    
    // Clean up
    return () => {
      window.removeEventListener('note_deleted', handleNoteDeleted);
      window.removeEventListener('note_added', handleNoteAdded);
      window.removeEventListener('note_updated', handleNoteUpdated);
    };
  }, [selectedNote]);

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
  
  // Limit displayed notes to maximum 3
  const displayedNotes = filteredNotes.slice(0, 3);

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
  
  // State for popups
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isWriteMessageOpen, setIsWriteMessageOpen] = useState(false);
  const [selectedHistoryNote, setSelectedHistoryNote] = useState<Note | null>(null);

  // Open history popup
  const openHistoryPopup = () => {
    setIsHistoryOpen(true);
  };

  // Close history popup
  const closeHistoryPopup = () => {
    setIsHistoryOpen(false);
    setSelectedHistoryNote(null);
  };
  
  // Open write message popup
  const openWriteMessagePopup = () => {
    setIsWriteMessageOpen(true);
  };
  
  // Close write message popup
  const closeWriteMessagePopup = () => {
    setIsWriteMessageOpen(false);
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
              className="px-6 py-3 font-medium text-sm text-blue-600 border-b-2 border-blue-600"
            >
              Notes
            </a>
            <a
              href="/admin/links"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Links
            </a>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex h-[calc(100vh-180px)] gap-6">
            {/* Notes List - Now full width instead of 1/3 */}
            <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium text-gray-900 dark:text-white">Notes</h2>
                  <button 
                    onClick={openHistoryPopup}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center"
                    title="View Message History"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Message History
                  </button>
                </div>
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
                  onClick={openWriteMessagePopup}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Write New Message
                </button>
              </div>
              
              <div className="overflow-y-auto flex-1">
                {filteredNotes.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
                  </div>
                ) : (
                  <>
                  {displayedNotes.map((note) => (
                    <div 
                      key={note.id}
                      onClick={() => {
                        setSelectedHistoryNote(note);
                        setIsHistoryOpen(true);
                      }}
                      className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                        {note.title}
                      </h3>
                      {note.content && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2 whitespace-pre-line">
                          {note.content.replace(/\n\n+/g, '\n')}
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
                  ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
        
        {/* Write Message Popup */}
        {isWriteMessageOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Write New Message</h3>
                <button onClick={closeWriteMessagePopup} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <NoteEditor 
                  note={null}
                  currentUser={username || 'unknown'} 
                  onClose={() => {
                    closeWriteMessagePopup();
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* History Popup */}
        {isHistoryOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Message History</h3>
                <button onClick={closeHistoryPopup} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex h-[70vh] overflow-hidden">
                {/* Notes List */}
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                  {filteredNotes.map((note) => (
                    <div 
                      key={note.id}
                      onClick={() => setSelectedHistoryNote(note)}
                      className={`p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${selectedHistoryNote && selectedHistoryNote.id === note.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                    >
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">{note.title}</h3>
                      {note.content && (
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2 whitespace-pre-line">
                          {note.content.replace(/\n\n+/g, '\n')}
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
                  ))}
                </div>
                
                {/* Note Editor */}
                <div className="w-2/3 overflow-hidden">
                  {selectedHistoryNote ? (
                    <NoteEditor 
                      note={selectedHistoryNote}
                      currentUser={username || 'unknown'} 
                      onClose={() => setSelectedHistoryNote(null)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="text-center p-6">
                        <svg className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          Select a Message
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Select a message from the list to view, edit, or delete.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
