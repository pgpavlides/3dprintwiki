import React, { useState, useEffect } from 'react';
import { Note, UpdateNote } from '../../types/database';
import { supabase } from '../../utils/supabase/client';

interface NoteEditorProps {
  note: Note | null;
  currentUser: string;
  onClose?: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, currentUser, onClose }) => {
  const [isNew, setIsNew] = useState<boolean>(!note);
  const [noteData, setNoteData] = useState<Note | { 
    id: string, 
    title: string, 
    content: string | null,
    created_by: string,
    created_at: string,
    updated_at: string
  }>({
    id: '',
    title: '',
    content: '',
    created_by: currentUser,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (note) {
      setNoteData(note);
      setIsNew(false);
    } else {
      setNoteData({
        id: '',
        title: '',
        content: '',
        created_by: currentUser,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      setIsNew(true);
    }
  }, [note, currentUser]);

  const handleSaveNote = async () => {
    if (!noteData.title.trim()) {
      alert('Please enter a title for the note');
      return;
    }

    setIsLoading(true);

    try {
      if (isNew) {
        // Create a new note
        const { data, error } = await supabase
          .from('notes')
          .insert({
            title: noteData.title,
            content: noteData.content,
            created_by: currentUser,
          })
          .select('*')
          .single();

        if (error) throw error;
        
        // Dispatch custom event for new note
        if (data) {
          const noteAddedEvent = new CustomEvent('note_added', {
            detail: { note: data }
          });
          window.dispatchEvent(noteAddedEvent);
        }
      } else {
        // Update existing note
        const updateData: UpdateNote = {
          title: noteData.title,
          content: noteData.content,
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from('notes')
          .update(updateData)
          .eq('id', noteData.id)
          .select('*')
          .single();

        if (error) throw error;
        
        // Dispatch custom event for updated note
        if (data) {
          const noteUpdatedEvent = new CustomEvent('note_updated', {
            detail: { note: data }
          });
          window.dispatchEvent(noteUpdatedEvent);
        }
      }

      // Close editor after saving
      if (onClose) onClose();
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async () => {
    if (isNew) {
      if (onClose) onClose();
      return;
    }

    if (!confirm('Are you sure you want to delete this note?')) return;

    setIsLoading(true);

    try {
      // Custom event to notify parent about deletion
      const noteDeleteEvent = new CustomEvent('note_deleted', {
        detail: { noteId: noteData.id }
      });
      
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteData.id);

      if (error) throw error;

      // Dispatch event to notify parent component about the deletion
      window.dispatchEvent(noteDeleteEvent);
      
      if (onClose) onClose();
      
      // The parent component will handle UI update
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsLoading(false);
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

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    if (name === 'admin') return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
    if (name === 'partner') return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
    return 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Note Title"
            value={noteData.title}
            onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
            className="w-full text-lg font-semibold bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white p-0"
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center space-x-3">
          {!isNew && (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                Last edited: {formatDate(noteData.updated_at)}
              </span>
              <span className={`${getAvatarColor(noteData.created_by)} rounded-full w-6 h-6 flex items-center justify-center`}>
                <span className="text-xs">{getInitial(noteData.created_by)}</span>
              </span>
            </div>
          )}
          <div className="flex space-x-2">
            <button
              onClick={handleDeleteNote}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-lg"
              title={isNew ? "Cancel" : "Delete Note"}
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleSaveNote}
              className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-lg"
              title="Save Note"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <textarea
          placeholder="Start typing your note here..."
          value={noteData.content || ''}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
          className="w-full h-full min-h-[300px] bg-transparent border-0 focus:ring-0 resize-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
          disabled={isLoading}
          onKeyDown={(e) => {
            // Make sure we don't prevent default behavior for Enter key
            // This allows normal textarea behavior of inserting a new line
            if (e.key === 'Enter') {
              // Let the default behavior happen
              // No need to call e.preventDefault()
            }
          }}
        ></textarea>
      </div>
    </div>
  );
};
