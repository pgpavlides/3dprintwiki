import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
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
  
  // State for view mode toggle
  const [isViewMode, setIsViewMode] = useState(true);
  
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
  const [isWriteMessageOpen, setIsWriteMessageOpen] = useState(false);
  
  // Open write message popup
  const openWriteMessagePopup = () => {
    setSelectedNote(null);
    setIsWriteMessageOpen(true);
    
    // Trigger view mode when opening the popup
    setTimeout(() => {
      setIsViewMode(true);
      const toggleEvent = new CustomEvent('toggle_view_mode');
      window.dispatchEvent(toggleEvent);
    }, 100);
  };
  
  // Close write message popup
  const closeWriteMessagePopup = () => {
    setIsWriteMessageOpen(false);
    setSelectedNote(null);
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
              className="px-6 py-3 font-medium text-sm text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400 flex items-center"
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
                        setSelectedNote(note);
                        setIsWriteMessageOpen(true);
                        
                        // Trigger view mode when opening an existing note
                        setTimeout(() => {
                          setIsViewMode(true);
                          const toggleEvent = new CustomEvent('toggle_view_mode');
                          window.dispatchEvent(toggleEvent);
                        }, 100);
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
        
        {/* Write/Edit Message Popup */}
        {isWriteMessageOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {selectedNote ? 'Edit Message -' : 'Write New Message'}
                  </h3>
                  
                  {selectedNote && (
                    <>
                      <span className="text-xl text-gray-900 dark:text-white font-medium">
                        {selectedNote.title}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Last edited: {formatDate(selectedNote.updated_at)}
                      </span>
                      <span className={`${getAvatarColor(selectedNote.created_by)} rounded-full w-6 h-6 flex items-center justify-center`}>
                        <span className="text-xs">{getInitial(selectedNote.created_by)}</span>
                      </span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                {/* Delete button (only show for existing notes) */}
                {selectedNote && (
                <button 
                onClick={() => {
                if (confirm('Are you sure you want to delete this note?')) {
                // Dispatch a custom event that the NoteEditor will listen for
                const noteDeleteEvent = new CustomEvent('note_delete_requested', {
                detail: { noteId: selectedNote.id }
                });
                window.dispatchEvent(noteDeleteEvent);
                // Close after a small delay
                setTimeout(() => {
                closeWriteMessagePopup();
                }, 300);
                }
                }} 
                className="px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-md flex items-center text-sm"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
                </button>
                )}
                
                <button 
                onClick={() => {
                  setIsViewMode(!isViewMode);
                  const toggleEvent = new CustomEvent('toggle_view_mode');
                  window.dispatchEvent(toggleEvent);
                }} 
                className={`px-3 py-1.5 rounded-md flex items-center text-sm ${isViewMode ? 
                  'bg-teal-100 hover:bg-teal-200 dark:bg-teal-900/30 dark:hover:bg-teal-900/50 text-teal-600 dark:text-teal-400' : 
                  'bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isViewMode ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                    {isViewMode ? null : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                  {isViewMode ? 'Edit Mode' : 'View Mode'}
                </button>
                
                <button 
                onClick={closeWriteMessagePopup} 
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-700 dark:text-gray-200 text-sm"
                >
                Cancel
                </button>
                
                <button 
                onClick={() => {
                  // Dispatch a custom event that the NoteEditor will listen for
                  const noteSaveEvent = new CustomEvent('note_save_requested', {
                      detail: { title: selectedNote?.title || '' }
                      });
                      window.dispatchEvent(noteSaveEvent);
                      // Close after a small delay
                      setTimeout(() => {
                        closeWriteMessagePopup();
                      }, 300);
                    }} 
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-md flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    {selectedNote ? 'Save Changes' : 'Create Note'}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <NoteEditor 
                  note={selectedNote}
                  currentUser={username || 'unknown'} 
                  titleValue={selectedNote?.title || ''}
                  onClose={() => {
                    setSelectedNote(null);
                    closeWriteMessagePopup();
                  }}
                />
              </div>
            </div>
          </div>
        )}
        

      </div>
    </>
  );
}
