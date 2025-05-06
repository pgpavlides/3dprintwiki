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

function AdminDashboard() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Use refs to track subscription channels
  const tasksChannelRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);
  const notesChannelRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
      return;
    }

    // Initialize Supabase session
    const initSupabase = async () => {
      const success = await createSupabaseSession(username || 'unknown');
      setIsSupabaseConnected(success);
    };

    initSupabase();
  }, [navigate, username]);

  // Load data and set up realtime subscriptions
  useEffect(() => {
    if (!isAuthenticated()) return;
    // Proceed even if Supabase isn't connected - we'll handle errors gracefully
    
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
          // Continue with empty tasks
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
          // Continue with empty notes
        } else if (notesData) {
          setNotes(notesData);
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
    
    // Cleanup subscriptions on unmount
    return () => {
      if (tasksChannelRef.current) {
        supabase.removeChannel(tasksChannelRef.current);
      }
      if (notesChannelRef.current) {
        supabase.removeChannel(notesChannelRef.current);
      }
    };
  }, [isSupabaseConnected]);

  const handleLogout = () => {
    logout();
    navigate({ to: '/admin/login' });
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

  const getActivityIcon = (type: ActivityItem['type'], user: string) => {
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
            <Link
              to="/admin/"
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Activity Feed */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Feed</h2>
              {!isSupabaseConnected ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">Connecting to Supabase...</p>
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">No activity yet. Start collaborating with your partner!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      {getActivityIcon(activity.type, activity.user)}
                      <div>
                        {getActivityText(activity)}
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overview</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Tasks</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {tasks.filter(t => t.status !== 'completed').length}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Tasks</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {tasks.filter(t => t.status === 'completed').length}
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{notes.length}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Activities</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activities.length}</p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Link
                  to="/admin/checklist"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm text-center"
                >
                  Manage Tasks
                </Link>
                <Link
                  to="/admin/notes"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm text-center"
                >
                  Manage Notes
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="/admin/notes"
                  state={{ createNew: true }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-6 rounded-lg text-center flex flex-col items-center justify-center transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-sm">Create New Note</span>
                </Link>
                <Link
                  to="/admin/checklist"
                  state={{ createNew: true }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-6 rounded-lg text-center flex flex-col items-center justify-center transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <span className="font-medium text-sm">Create New Task</span>
                </Link>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resource Collection</h3>
              <div className="grid grid-cols-1 gap-4">
                <Link
                  to="/admin/links"
                  state={{ createNew: true }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-6 rounded-lg text-center flex flex-col items-center justify-center transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="font-medium text-sm">Save New Resource Link</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
