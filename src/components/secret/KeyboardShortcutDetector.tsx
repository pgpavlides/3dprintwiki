import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { isAuthenticated } from '../../utils/auth';
import '../../../styles/CommandInput.css';

/**
 * Keyboard shortcut detector component
 * Provides a command-line style input triggered by ~ or ` keys
 * Allows navigation to specific pages via commands
 * Displays a command input UI at the bottom of the page
 */
export const KeyboardShortcutDetector = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [commandInputVisible, setCommandInputVisible] = useState<boolean>(false);
  const [commandValue, setCommandValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Define keyword mappings to pages
  const KEYWORD_MAPPINGS = {
    'admin': '/admin', // Admin dashboard
    'home': '/', // Home page
    'hardware': '/hardware', // Hardware page
    'hard': '/hardware', // Alternative for hardware
    'elec': '/electronics', // Electronics page
    'tools': '/tools', // Tools page
    'materials': '/materials', // Materials page
    'mat': '/materials', // Alternative for materials
    'design': '/design-and-postprocessing', // Design page
    'links': '/links', // Links page
    'contributors': '/contributors', // Contributors page
    'cale': '/calendar', // Calendar page
    'calc': '/calculator', // Calculator page
    'video': '/resources/video-library', // Video library page
    'lib': '/resources/video-library', // Alternative for video library
    'post': '/design-and-postprocessing', // Postprocessing page
    'back': '__BACK__', // Special keyword for going back
  };

  // Execute the command entered by the user
  const executeCommand = (command: string) => {
    const lowerCommand = command.trim().toLowerCase();
    
    // Check if the command matches any of our keywords
    for (const [keyword, path] of Object.entries(KEYWORD_MAPPINGS)) {
      if (lowerCommand === keyword) {
        // Handle the special back case
        if (path === '__BACK__') {
          window.history.back();
          return true;
        }
        
        // For admin, check auth status first
        if (keyword === 'admin') {
          if (isAuthenticated()) {
            navigate({ to: path as any });
          } else {
            navigate({ to: '/admin/login' });
          }
          return true;
        }
        
        // Navigate to the requested page
        navigate({ to: path as any });
        return true;
      }
    }
    
    // No matching command found
    return false;
  };

  // Handle keyboard events for the whole document
  const handleDocumentKeyDown = useCallback((event: KeyboardEvent) => {
    // Check if we're in an input field
    const activeElement = document.activeElement as HTMLElement;
    const isInputField = activeElement.tagName === 'INPUT' || 
                         activeElement.tagName === 'TEXTAREA' || 
                         activeElement.isContentEditable;
    const isCommandInput = inputRef.current === activeElement;
    
    // Handle ~ or ` key to toggle command input
    if (event.key === '~' || event.key === '`') {
      // Only handle if we're not in another input field OR we're in our command input
      if (!isInputField || isCommandInput) {
        event.preventDefault();
        setCommandInputVisible(!commandInputVisible);
        
        // Focus the input if we're opening it
        if (!commandInputVisible) {
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 10);
        }
      }
      return;
    }
    
    // Handle Backspace for navigation ONLY when command panel is NOT open
    // and we're not in any input field
    if (event.key === 'Backspace' && !commandInputVisible && !isInputField) {
      event.preventDefault();
      window.history.back();
      return;
    }
  }, [commandInputVisible, navigate]);

  // Handle command input submission
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (commandValue.trim()) {
      const success = executeCommand(commandValue);
      if (!success) {
        // Flash the input or show an error message
        if (inputRef.current) {
          inputRef.current.classList.add('command-error');
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.classList.remove('command-error');
            }
          }, 500);
        }
      } else {
        // Command was successful, hide the input
        setCommandInputVisible(false);
        // Reset focus to the document body
        document.body.focus();
        // Important: remove any active element focus to ensure keyboard events work
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
    
    setCommandValue('');
  };

  // Handle escape key or ` to close command input
  const handleCommandInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' || e.key === '`' || e.key === '~') {
      e.preventDefault(); // Prevent the key from being entered in the input
      setCommandInputVisible(false);
      setCommandValue('');
      // Reset focus to ensure keyboard events work
      document.body.focus();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
  };

  // Set up the global keyboard event listener
  useEffect(() => {
    // Add the global keyboard event listener
    window.addEventListener('keydown', handleDocumentKeyDown);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  // Force blur any active element when the component mounts
  // This ensures keyboard shortcuts work right from the start
  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);
  
  // Reset command panel visibility when location changes
  useEffect(() => {
    setCommandInputVisible(false);
    setCommandValue('');
    
    // Force blur active element after navigation
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [location.pathname]);
  
  // We now have a visual component
  return (
    <div className={`command-input-container ${commandInputVisible ? 'visible' : ''}`}>
      <form onSubmit={handleCommandSubmit}>
        <div className="command-prompt">➜</div>
        <input
          ref={inputRef}
          type="text"
          value={commandValue}
          onChange={(e) => setCommandValue(e.target.value)}
          onKeyDown={handleCommandInputKeyDown}
          placeholder="Enter command..."
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};
