import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import { isAuthenticated, getCurrentUser } from '../../utils/auth';
import { supabase, subscribeToTable } from '../../utils/supabase/client';
import { TaskItem } from '../../components/admin/TaskItem';
import { Task, InsertTask } from '../../types/database';
import { SEO } from '../../components/SEO/SEO';

export const Route = createFileRoute('/admin/checklist')({
  component: ChecklistPage,
});

function ChecklistPage() {
  const navigate = useNavigate();
  const username = getCurrentUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    due_date: string;
    assigned_to: string;
  }>({
    title: '',
    description: '',
    due_date: '',
    assigned_to: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Use a ref to track the subscription channel
  const subscriptionRef = useRef<ReturnType<typeof subscribeToTable> | null>(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/admin/login' });
    }
    
    // Check for state from navigation to auto-open new task
    const locationState = window.history.state?.usr || {};
    if (locationState.createNew) {
      setIsAddingTask(true);
      
      // Clear the state to prevent re-opening on refresh
      const newState = { ...locationState };
      delete newState.createNew;
      navigate({ to: '/admin/checklist', state: newState, replace: true });
    }
  }, [navigate]);

  // Load tasks and set up realtime subscription
  useEffect(() => {
    if (!isAuthenticated()) return;
    
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (data) setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    
    // Initial load
    fetchTasks();
    
    // Set up realtime subscription
    const channel = subscribeToTable('tasks', (payload) => {
      // Handle realtime updates
      if (payload.eventType === 'INSERT') {
        setTasks(prev => [payload.new as Task, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setTasks(prev => 
          prev.map(task => task.id === payload.new.id ? payload.new as Task : task)
        );
      } else if (payload.eventType === 'DELETE') {
        setTasks(prev => 
          prev.filter(task => task.id !== payload.old.id)
        );
      }
    });
    
    subscriptionRef.current = channel;
    
    // Cleanup subscription on unmount
    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }
    };
  }, [navigate]);

  // Handler for adding new task
  const handleAddTask = async () => {
    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const taskData: InsertTask = {
        title: newTask.title,
        description: newTask.description || null,
        due_date: newTask.due_date || null,
        assigned_to: newTask.assigned_to || null,
        status: 'not_started',
        created_by: username || 'unknown',
      };
      
      const { data, error } = await supabase
        .from('tasks')
        .insert(taskData)
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Manually update the tasks state with the new task
      if (data) {
        setTasks(prev => [data as Task, ...prev]);
      }
      
      // Reset form
      setNewTask({
        title: '',
        description: '',
        due_date: '',
        assigned_to: '',
      });
      
      setIsAddingTask(false);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If not authenticated, don't render the dashboard
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <>
      <SEO
        title="Task Checklist | 3D Print Wiki Admin"
        description="Admin task checklist for 3D Print Wiki"
        keywords="admin, checklist, tasks"
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Admin Header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="/logo/logo.svg" alt="3D Print Wiki Logo" className="h-8 w-8 mr-2" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Shared Checklist
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
              className="px-6 py-3 font-medium text-sm text-blue-600 border-b-2 border-blue-600"
            >
              Checklist
            </a>
            <a
              href="/admin/notes"
              className="px-6 py-3 font-medium text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks</h2>
              <button 
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                {isAddingTask ? 'Cancel' : 'Add New Task'}
              </button>
            </div>
            
            <div className="p-6">
              {isAddingTask && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-3">New Task</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                        placeholder="Enter task title"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                        rows={3}
                        placeholder="Enter task description (optional)"
                        disabled={isLoading}
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={newTask.due_date}
                          onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Assigned To
                        </label>
                        <select
                          value={newTask.assigned_to}
                          onChange={(e) => setNewTask({...newTask, assigned_to: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
                          disabled={isLoading}
                        >
                          <option value="">Unassigned</option>
                          <option value="admin">Admin</option>
                          <option value="partner">Partner</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-3">
                      <button
                        onClick={handleAddTask}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Adding...' : 'Add Task'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-1">
                {/* Filter/View options */}
                <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                    All Tasks
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    My Tasks
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Completed
                  </button>
                </div>
                
                {/* Task list */}
                {tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No tasks found. Add a new task to get started.</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      currentUser={username || 'unknown'} 
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
