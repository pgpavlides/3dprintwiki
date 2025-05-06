import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { isAuthenticated, getCurrentUser, logout } from '../../utils/auth';
import { supabase, subscribeToTable, createSupabaseSession } from '../../utils/supabase/client';
import { Task, Note } from '../../types/database';
import { SEO } from '../../components/SEO/SEO';

export const Route = createFileRoute('/admin/')({  
  component: AdminDashboard,
});

type ActivityItem = {
  id: string;
  type: 'task_added' | 'task_completed' | 'note_added' | 'note_updated';
  timestamp: string;
  user: string;
  title: string;
  objectId: string;
};

interface AdminMessage {
  id: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [adminMessage, setAdminMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<AdminMessage[]>([]);
  const [isSavingMessage, setIsSavingMessage] = useState(false);
  const [showAllMessages, setShowAllMessages] = useState(false);
  const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);

  // Use refs to track subscription channels
  const tasksChannelRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);
  const notesChannelRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);
  const messagesChannelRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
      return;
    }

    // Initialize Supabase session
    const initSupabase = async () => {
      const success = await createSupabaseSession();
      setIsSupabaseConnected(success);
      
      // Clean up sample messages
      cleanupSampleMessages();
    };

    initSupabase();
  }, [navigate]);
  
  // Clean up sample messages with specific content
  const cleanupSampleMessages = async () => {
    try {
      // Delete known sample messages
      const sampleMessages = [
        'I updated the materials section with some new filament types. Please check if they look good!',
        'Found some great resources on calibration, added them to the setup guide.'
      ];
      
      // Delete each sample message
      for (const content of sampleMessages) {
        const { error } = await supabase
          .from('admin_messages')
          .delete()
          .eq('content', content);
          
        if (error) {
          console.error(`Error deleting sample message: ${content}`, error);
        }
      }
    } catch (error) {
      console.error('Error cleaning up sample messages:', error);
    }
  };

  // Load data and set up realtime subscriptions
  useEffect(() => {
    if (!isAuthenticated()) return;
    
    const fetchData = async () => {
      try {
        // Fetch tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (tasksError) {
          console.error('Error fetching tasks:', tasksError);
        } else if (tasksData) {
          setTasks(tasksData);
        }
        
        // Fetch notes
        const { data: notesData, error: notesError } = await supabase
          .from('notes')
          .select('*')
          .order('updated_at', { ascending: false })
          .limit(10);
        
        if (notesError) {
          console.error('Error fetching notes:', notesError);
        } else if (notesData) {
          setNotes(notesData);
        }
        
        // Fetch admin messages from Supabase
        const { data: messagesData, error: messagesError } = await supabase
          .from('admin_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(30);
          
        if (messagesError) {
          console.error('Error fetching admin messages:', messagesError);
          // If table doesn't exist, it will be created in initializeTables()
          // We can log the error but don't need to show it to the user
        } else if (messagesData) {
          setSavedMessages(messagesData);
        }
        
        // Generate activity feed
        const activityItems: ActivityItem[] = [];
        
        // Add task activities
        tasksData?.forEach(task => {
          activityItems.push({
            id: `task-${task.id}`,
            type: task.status === 'completed' ? 'task_completed' : 'task_added',
            timestamp: task.status === 'completed' ? task.updated_at : task.created_at,
            user: task.created_by,
            title: task.title,
            objectId: task.id,
          });
        });
        
        // Add note activities
        notesData?.forEach(note => {
          activityItems.push({
            id: `note-${note.id}`,
            type: 'note_added',
            timestamp: note.created_at,
            user: note.created_by,
            title: note.title,
            objectId: note.id,
          });
          
          // Only add update activity if the note was updated after creation
          if (new Date(note.updated_at).getTime() > new Date(note.created_at).getTime() + 1000) {
            activityItems.push({
              id: `note-update-${note.id}`,
              type: 'note_updated',
              timestamp: note.updated_at,
              user: note.created_by,
              title: note.title,
              objectId: note.id,
            });
          }
        });
        
        // Sort activities by timestamp (newest first)
        activityItems.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        // Limit to 10 most recent activities
        setActivities(activityItems.slice(0, 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    // Initial data load
    fetchData();
    
    // Set up realtime subscription for tasks
    const tasksChannel = subscribeToTable('tasks', (payload) => {
      if (payload.eventType === 'INSERT') {
        setTasks(prev => {
          const newTasks = [payload.new as Task, ...prev].slice(0, 10);
          // Update activities
          setActivities(prevActivities => {
            const newActivity: ActivityItem = {
              id: `task-${payload.new.id}`,
              type: 'task_added',
              timestamp: payload.new.created_at,
              user: payload.new.created_by,
              title: payload.new.title,
              objectId: payload.new.id,
            };
            return [newActivity, ...prevActivities].slice(0, 10);
          });
          return newTasks;
        });
      } else if (payload.eventType === 'UPDATE') {
        setTasks(prev => {
          const updatedTasks = prev.map(task => 
            task.id === payload.new.id ? payload.new as Task : task
          );
          
          // Check if task was completed in this update
          if (payload.old.status !== 'completed' && payload.new.status === 'completed') {
            // Add completion activity
            setActivities(prevActivities => {
              const newActivity: ActivityItem = {
                id: `task-complete-${payload.new.id}`,
                type: 'task_completed',
                timestamp: payload.new.updated_at,
                user: payload.new.created_by,
                title: payload.new.title,
                objectId: payload.new.id,
              };
              return [newActivity, ...prevActivities].slice(0, 10);
            });
          }
          
          return updatedTasks;
        });
      } else if (payload.eventType === 'DELETE') {
        setTasks(prev => prev.filter(task => task.id !== payload.old.id));
      }
    });
    
    // Set up realtime subscription for notes
    const notesChannel = subscribeToTable('notes', (payload) => {
      if (payload.eventType === 'INSERT') {
        setNotes(prev => {
          const newNotes = [payload.new as Note, ...prev].slice(0, 10);
          // Update activities
          setActivities(prevActivities => {
            const newActivity: ActivityItem = {
              id: `note-${payload.new.id}`,
              type: 'note_added',
              timestamp: payload.new.created_at,
              user: payload.new.created_by,
              title: payload.new.title,
              objectId: payload.new.id,
            };
            return [newActivity, ...prevActivities].slice(0, 10);
          });
          return newNotes;
        });
      } else if (payload.eventType === 'UPDATE') {
        setNotes(prev => {
          const updatedNotes = prev.map(note => 
            note.id === payload.new.id ? payload.new as Note : note
          );
          
          // Add update activity
          setActivities(prevActivities => {
            const newActivity: ActivityItem = {
              id: `note-update-${payload.new.id}-${Date.now()}`,
              type: 'note_updated',
              timestamp: payload.new.updated_at,
              user: payload.new.created_by,
              title: payload.new.title,
              objectId: payload.new.id,
            };
            return [newActivity, ...prevActivities].slice(0, 10);
          });
          
          return updatedNotes;
        });
      } else if (payload.eventType === 'DELETE') {
        setNotes(prev => prev.filter(note => note.id !== payload.old.id));
      }
    });
    
    tasksChannelRef.current = tasksChannel;
    notesChannelRef.current = notesChannel;
    
    // Set up realtime subscription for admin messages
    const messagesChannel = subscribeToTable('admin_messages', (payload) => {
      if (payload.eventType === 'INSERT') {
        setSavedMessages(prev => [payload.new as AdminMessage, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setSavedMessages(prev => 
          prev.map(message => message.id === payload.new.id ? payload.new as AdminMessage : message)
        );
      } else if (payload.eventType === 'DELETE') {
        setSavedMessages(prev => prev.filter(message => message.id !== payload.old.id));
      }
    });
    
    messagesChannelRef.current = messagesChannel;
    
    // Cleanup subscriptions on unmount
    return () => {
      if (tasksChannelRef.current) {
        supabase.removeChannel(tasksChannelRef.current);
      }
      if (notesChannelRef.current) {
        supabase.removeChannel(notesChannelRef.current);
      }
      if (messagesChannelRef.current) {
        supabase.removeChannel(messagesChannelRef.current);
      }
    };
  }, [isSupabaseConnected]);

  const handleLogout = () => {
    logout();
    navigate({ to: '/admin/login' });
  };

  // Handle saving admin message
  const handleSaveMessage = async () => {
    if (!adminMessage.trim()) return;
    
    setIsSavingMessage(true);
    
    try {
      // Insert message into Supabase database
      const { data, error } = await supabase
        .from('admin_messages')
        .insert([{
          content: adminMessage.trim(),
          created_by: username || 'unknown',
        }])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        setSavedMessages(prev => [data[0] as AdminMessage, ...prev]);
        setAdminMessage(''); // Clear the input field
        console.log('Message saved successfully to database');
      }
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Failed to save message to database. Please try again.');
    } finally {
      setIsSavingMessage(false);
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      // Delete from Supabase database
      const { error } = await supabase
        .from('admin_messages')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setSavedMessages(prev => prev.filter(message => message.id !== id));
      console.log('Message deleted successfully from database');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message from database. Please try again.');
    }
  };

  // Reset message view
  const handleCloseAllMessages = () => {
    setShowAllMessages(false);
  };
  
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

  const getActivityIcon = (user: string) => {
    const getUserAvatar = (name: string) => {
      if (name === 'admin') {
        // Blue color for George (admin)
        return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
      }
      if (name === 'partner') {
        // Purple color for Sokratis (partner)
        return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
      }
      return 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
    };
    
    // Get first letter for avatar
    const userMapping = {
      'admin': 'G', // G for George
      'partner': 'S', // S for Sokratis
    };
    
    const userInitial = userMapping[user as keyof typeof userMapping] || user.charAt(0).toUpperCase();
    
    return (
      <div className={`${getUserAvatar(user)} rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
        <span>{userInitial}</span>
      </div>
    );
  };

  const getActivityText = (activity: ActivityItem) => {
    // Map usernames to display names
    const mapUserToDisplayName = (username: string) => {
      if (username === 'admin') return 'George';
      if (username === 'partner') return 'Sokratis';
      return username;
    };
    
    const displayName = mapUserToDisplayName(activity.user);
    
    switch (activity.type) {
      case 'task_added':
        return (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">{displayName}</span> created a new task "{activity.title}"
          </p>
        );
      case 'task_completed':
        return (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">{displayName}</span> completed the task "{activity.title}"
          </p>
        );
      case 'note_added':
        return (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">{displayName}</span> created a new note "{activity.title}"
          </p>
        );
      case 'note_updated':
        return (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">{displayName}</span> updated the note "{activity.title}"
          </p>
        );
      default:
        return (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium text-gray-900 dark:text-white">{displayName}</span> performed an action
          </p>
        );
    }
  };

  // If not authenticated, don't render the dashboard
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <SEO
        title="Admin Dashboard | 3D Print Wiki"
        description="Admin dashboard for 3D Print Wiki"
        keywords="admin, dashboard"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
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
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
              <a
                href="/"
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              >
                View Site
              </a>
            </div>
          </div>
        </header>

        {/* Navigation - Now with sticky positioning */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex">
            <Link
              to="/admin"
              activeProps={{ className: 'text-blue-600 border-b-2 border-blue-600' }}
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/checklist"
              activeProps={{ className: 'text-blue-600 border-b-2 border-blue-600' }}
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Checklist
            </Link>
            <Link
              to="/admin/notes"
              activeProps={{ className: 'text-blue-600 border-b-2 border-blue-600' }}
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Notes
            </Link>
            <Link
              to="/admin/links"
              activeProps={{ className: 'text-blue-600 border-b-2 border-blue-600' }}
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Links
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
<div className="flex flex-wrap -mx-3">
            {/* Overview - Left Side (20% width) */}
            <div className="w-full md:w-1/5 px-3 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Overview</h2>
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Tasks</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                      {tasks.filter(t => t.status !== 'completed').length}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Tasks</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                      {tasks.filter(t => t.status === 'completed').length}
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{notes.length}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Activities</h3>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{activities.length}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Feed - Middle (60% width) */}
            <div className="w-full md:w-3/5 px-3 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Activity Feed</h2>
                {!isSupabaseConnected ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">Connecting to Supabase...</p>
                  </div>
                ) : activities.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 dark:text-gray-400">No activity yet. Start collaborating with your partner!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[510px] overflow-y-auto pr-2">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        {getActivityIcon(activity.user)}
                        <div>
                          {getActivityText(activity)}
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Admin Message Board - Right Side (20% width) */}
            <div className="w-full md:w-1/5 px-3 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Message Board</h2>
                  <button
                    onClick={() => setShowNewMessagePopup(true)}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-105"
                    title="Write a new message"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                {/* Previous Messages - Compact View */}
                <div className="space-y-2 overflow-y-auto max-h-[450px]">
                  {savedMessages.length === 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic text-center">No messages yet</p>
                  ) : showAllMessages ? (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">Message History</h4>
                        <button
                          onClick={handleCloseAllMessages}
                          className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          Close
                        </button>
                      </div>
                      
                      {savedMessages.map((message) => {
                        const displayName = message.created_by === 'admin' ? 'George' : 
                                          message.created_by === 'partner' ? 'Sokratis' : 
                                          message.created_by;
                        
                        return (
                          <div key={message.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 relative group">
                            <div className="flex items-start">
                              {getActivityIcon(message.created_by)}
                              <div className="flex-1 min-w-0 pr-5">
                                <p className="text-xs text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                                  {message.content}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {displayName}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDate(message.created_at)}
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleDeleteMessage(message.id)}
                                className="absolute top-1 right-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete message"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {/* Show only the 2 most recent messages */}
                      {savedMessages.slice(0, 2).map((message) => {
                        const displayName = message.created_by === 'admin' ? 'George' : 
                                          message.created_by === 'partner' ? 'Sokratis' : 
                                          message.created_by;
                        
                        return (
                          <div key={message.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 relative group">
                            <div className="flex items-start">
                              {getActivityIcon(message.created_by)}
                              <div className="flex-1 min-w-0 pr-5">
                                <p className="text-xs text-gray-900 dark:text-white whitespace-pre-wrap break-words">
                                  {message.content}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                    {displayName}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDate(message.created_at)}
                                  </p>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleDeleteMessage(message.id)}
                                className="absolute top-1 right-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Delete message"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Show view all button if there are more than 2 messages */}
                      {savedMessages.length > 2 && (
                        <button
                          onClick={() => setShowAllMessages(true)}
                          className="w-full text-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 py-1 rounded mt-1"
                        >
                          View all ({savedMessages.length})
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Action Buttons - Same width as Overview and Message Board (20%) */}
            <div className="w-full md:w-1/5 px-3 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-full">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h2>
                <div className="grid grid-cols-1 gap-3">
                  <Link
                    to="/admin/notes"
                    search={{ createNew: true }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-3 rounded-lg text-center flex items-center justify-center transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-medium">New Note</span>
                  </Link>
                  <Link
                    to="/admin/checklist"
                    search={{ createNew: true }}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-2 py-3 rounded-lg text-center flex items-center justify-center transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="font-medium">New Task</span>
                  </Link>
                  <Link
                    to="/admin/links"
                    search={{ createNew: true }}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-2 py-3 rounded-lg text-center flex items-center justify-center transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="font-medium">New Link</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* New Message Popup */}
        {showNewMessagePopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Write New Message</h3>
                <button onClick={() => setShowNewMessagePopup(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <textarea
                  value={adminMessage}
                  onChange={(e) => setAdminMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500"
                  rows={5}
                  placeholder="Type your message here..."
                  autoFocus
                ></textarea>
                
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setShowNewMessagePopup(false)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSaveMessage();
                      if (adminMessage.trim()) {
                        setShowNewMessagePopup(false);
                      }
                    }}
                    disabled={isSavingMessage || !adminMessage.trim()}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSavingMessage ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Posting...
                      </>
                    ) : (
                      <>Post Message</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
