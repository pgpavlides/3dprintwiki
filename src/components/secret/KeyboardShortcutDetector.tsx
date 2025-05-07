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

  // Handle global keydown events to show/hide command input
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Check if the active element is an input, textarea, or has contentEditable
    // BUT allow toggling the command panel even if our command input is focused
    const activeElement = document.activeElement as HTMLElement;
    const isCommandInput = inputRef.current === activeElement;
    const isInputField = !isCommandInput && (
      activeElement.tagName === 'INPUT' || 
      activeElement.tagName === 'TEXTAREA' || 
      activeElement.isContentEditable
    );
    
    // Special case for ~ or ` key to toggle command input
    if ((event.key === '~' || event.key === '`') && (!isInputField || isCommandInput)) {
      event.preventDefault();
      
      // Toggle the command input visibility
      const newVisibility = !commandInputVisible;
      setCommandInputVisible(newVisibility);
      
      // If opening, focus the input after it's visible
      if (newVisibility) {
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 10);
      }
      return;
    }
    
    // Special case for Backspace key as a 'back' shortcut (only when not in command mode)
    if (event.key === 'Backspace' && !commandInputVisible && !isInputField) {
      event.preventDefault();
      window.history.back();
    }
  }, [navigate, location]);
  
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
        // Focus the body to ensure keyboard events are captured globally
        document.body.focus();
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
    }
  };

  // Set up and clean up event listeners
  useEffect(() => {
    // Add the event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // Reset command input visibility when location changes
  useEffect(() => {
    setCommandInputVisible(false);
    setCommandValue('');
    
    // Re-register the keydown event listener after navigation
    const reRegisterKeyListener = () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keydown', handleKeyDown);
    };
    
    // Small delay to ensure the DOM has settled after navigation
    const timerId = setTimeout(reRegisterKeyListener, 100);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [location.pathname, handleKeyDown]);
  
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
