import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { isAuthenticated } from '../../utils/auth';

/**
 * Secret keyboard shortcut detector component
 * Listens for the secret keyword "admin" to navigate to admin page
 * Has a timeout to reset partial inputs
 * No visual component - works invisibly in the background
 */
export const KeyboardShortcutDetector = () => {
  const navigate = useNavigate();
  const [secretKeySequence, setSecretKeySequence] = useState<string>('');
  const [resetTimer, setResetTimer] = useState<number | null>(null);
  
  const RESET_TIMEOUT = 2000; // 2 seconds to reset if user stops typing
  const SECRET_KEYWORD = 'admin'; // The secret keyword to trigger admin navigation

  // Handle keydown events globally
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only detect alphanumeric keys and ignore modifier keys
    if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
      // Add key to the current sequence
      const newSequence = secretKeySequence + event.key.toLowerCase();
      setSecretKeySequence(newSequence);
      
      // Reset any existing timer
      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }
      
      // Set a new timer to reset the sequence after timeout
      const timer = window.setTimeout(() => {
        setSecretKeySequence('');
      }, RESET_TIMEOUT);
      
      setResetTimer(timer);
      
      // Check if secret keyword is typed
      if (newSequence.includes(SECRET_KEYWORD)) {
        // Reset the sequence
        setSecretKeySequence('');
        
        // Navigate to appropriate page based on auth status
        if (isAuthenticated()) {
          navigate({ to: '/admin' });
        } else {
          navigate({ to: '/admin/login' });
        }
      }
    }
  }, [secretKeySequence, resetTimer, navigate]);
  
  // Set up and clean up event listeners
  useEffect(() => {
    // Add the event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up the event listener and any timers when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }
    };
  }, [handleKeyDown, resetTimer]);
  
  // This component doesn't render anything visible
  return null;
};
