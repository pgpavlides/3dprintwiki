import React, { useState, useEffect } from 'react';
import { Note, UpdateNote } from '../../types/database';
import { supabase } from '../../utils/supabase/client';

interface NoteEditorProps {
  note: Note | null;
  currentUser: string;
  titleValue?: string;
  onClose?: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, currentUser, titleValue, onClose }) => {
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
      setNoteData({
        ...note,
        title: titleValue || note.title // Use the title from props if provided
      });
      setIsNew(false);
    } else {
      setNoteData({
        id: '',
        title: titleValue || '', // Use the title from props if provided
        content: '',
        created_by: currentUser,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      setIsNew(true);
    }
  }, [note, currentUser, titleValue]);
  
  // Listen for external save requests (from parent component buttons)
  useEffect(() => {
    const handleSaveRequest = (event: CustomEvent) => {
      // Get the title from the event if provided
      const title = event.detail?.title;
      if (title) {
        setNoteData(prevData => ({
          ...prevData,
          title: title
        }));
      }
      handleSaveNote();
    };
    
    const handleDeleteRequest = (event: CustomEvent) => {
      if (event.detail?.noteId && event.detail.noteId === noteData.id) {
        handleDeleteNote();
      }
    };
    
    // Add event listeners
    window.addEventListener('note_save_requested', handleSaveRequest as EventListener);
    window.addEventListener('note_delete_requested', handleDeleteRequest as EventListener);
    
    // Clean up
    return () => {
      window.removeEventListener('note_save_requested', handleSaveRequest as EventListener);
      window.removeEventListener('note_delete_requested', handleDeleteRequest as EventListener);
    };
  }, [noteData]);

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

  // Function to determine if dark mode is active
  const isDarkMode = () => {
    return document.documentElement.classList.contains('dark') ||
           window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Set up state for dark mode
  const [darkMode, setDarkMode] = useState(isDarkMode());

  // Update dark mode state when it changes
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setDarkMode(isDarkMode());
    
    // Add listener for dark mode changes
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    // Also check for changes to the HTML class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setDarkMode(isDarkMode());
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
      observer.disconnect();
    };
  }, []);

  // Add event listeners to handle scroll capture
  useEffect(() => {
    // Function to handle wheel events and prevent them from propagating
    const handleWheel = (e: WheelEvent) => {
      // Don't let the parent capture this event
      e.stopPropagation();
    };

    // Get all textareas after render
    const textareas = document.querySelectorAll('textarea');
    
    // Add event listeners to all textareas
    textareas.forEach(textarea => {
      textarea.addEventListener('wheel', handleWheel, { passive: false });
    });

    // Cleanup function
    return () => {
      textareas.forEach(textarea => {
        textarea.removeEventListener('wheel', handleWheel);
      });
    };
  }, []);

  // Function to convert plain text with URLs to HTML with clickable links
  const convertUrlsToLinks = (text: string | null) => {
    if (!text) return '';
    
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Replace URLs with HTML anchor tags
    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" style="color: ${darkMode ? '#93c5fd' : '#3b82f6'};">${url}</a>`;
    });
  };

  // Create a div with HTML content instead of a textarea when displaying
  // but keep using textarea for editing
  const [isEditing, setIsEditing] = useState(true);

  // Listen for toggle view mode event
  useEffect(() => {
    // Function to toggle between edit and view modes
    const handleToggleViewMode = () => {
      setIsEditing(!isEditing);
    };
    
    // Add event listener
    window.addEventListener('toggle_view_mode', handleToggleViewMode);
    
    // Clean up
    return () => {
      window.removeEventListener('toggle_view_mode', handleToggleViewMode);
    };
  }, [isEditing]);

  if (isEditing) {
    // Return the editable textarea
    return React.createElement('div', {
      style: { position: 'relative', width: '100%', height: '70vh' }
    }, [
      // Textarea for editing
      React.createElement('textarea', {
        key: 'textarea',
        placeholder: 'Start typing your note here...',
        value: noteData.content || '',
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setNoteData({ ...noteData, content: e.target.value }),
        style: {
          width: '100%',
          height: '100%',
          padding: '20px',
          backgroundColor: darkMode ? '#111827' : '#f9fafb',
          border: 'none',
          color: darkMode ? '#f3f4f6' : '#1f2937',
          fontSize: '1rem',
          overflowY: 'auto'
        },
        onWheel: (e: React.WheelEvent<HTMLTextAreaElement>) => {
          // Stop propagation to prevent parent from capturing the event
          e.stopPropagation();
        },
        disabled: isLoading
      })
    ]);
  } else {
    // Return a div with HTML content and clickable links
    return React.createElement('div', {
      style: { position: 'relative', width: '100%', height: '70vh' }
    }, [
      // Content display with links
      React.createElement('div', {
        key: 'content-display',
        dangerouslySetInnerHTML: { __html: convertUrlsToLinks(noteData.content) },
        style: {
          width: '100%',
          height: '100%',
          padding: '20px',
          backgroundColor: darkMode ? '#111827' : '#f9fafb',
          border: 'none',
          color: darkMode ? '#f3f4f6' : '#1f2937',
          fontSize: '1rem',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap'
        },
        onWheel: (e: React.WheelEvent<HTMLDivElement>) => {
          // Stop propagation to prevent parent from capturing the event
          e.stopPropagation();
        }
      })
    ]);
  }
};
