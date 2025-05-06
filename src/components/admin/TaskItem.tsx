import React, { useState } from 'react';
import { Task, UpdateTask } from '../../types/database';
import { supabase } from '../../utils/supabase/client';

interface TaskItemProps {
  task: Task;
  currentUser: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  const [isLoading, setIsLoading] = useState(false);

  const statusColors = {
    not_started: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    if (name === 'admin') return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300';
    if (name === 'partner') return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300';
    return 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300';
  };

  const handleToggleStatus = async () => {
    setIsLoading(true);
    
    const newStatus = task.status === 'completed' 
      ? 'not_started' 
      : task.status === 'not_started' 
        ? 'in_progress' 
        : 'completed';
    
    try {
      const updateData: UpdateTask = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', task.id);
      
      if (error) throw error;
      
      // The UI will be updated automatically via the realtime subscription
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTask = async () => {
    setIsLoading(true);
    
    try {
      const updateData: UpdateTask = {
        title: updatedTask.title,
        description: updatedTask.description,
        due_date: updatedTask.due_date,
        assigned_to: updatedTask.assigned_to,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', task.id);
      
      if (error) throw error;
      
      setIsEditing(false);
      // The UI will be updated automatically via the realtime subscription
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id);
      
      if (error) throw error;
      
      // The UI will be updated automatically via the realtime subscription
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={updatedTask.title}
              onChange={(e) => setUpdatedTask({...updatedTask, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={updatedTask.description || ''}
              onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
              rows={3}
              disabled={isLoading}
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={updatedTask.due_date ? new Date(updatedTask.due_date).toISOString().split('T')[0] : ''}
              onChange={(e) => setUpdatedTask({...updatedTask, due_date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assigned To
            </label>
            <select
              value={updatedTask.assigned_to || ''}
              onChange={(e) => setUpdatedTask({...updatedTask, assigned_to: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700"
              disabled={isLoading}
            >
              <option value="">Unassigned</option>
              <option value="admin">Admin</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={() => {
                setIsEditing(false);
                setUpdatedTask(task);
              }}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTask}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-3">
      <input 
        type="checkbox" 
        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        checked={task.status === 'completed'}
        onChange={handleToggleStatus}
        disabled={isLoading}
      />
      <div className="ml-3 flex-1">
        <h3 className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
            {task.description}
          </p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Due: {formatDate(task.due_date)}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 ${statusColors[task.status]} text-xs rounded-full`}>
          {task.status === 'not_started' ? 'Not Started' : 
           task.status === 'in_progress' ? 'In Progress' : 'Complete'}
        </span>
        {task.assigned_to && (
          <span className={`${getAvatarColor(task.assigned_to)} rounded-full w-6 h-6 flex items-center justify-center`}>
            <span className="text-xs">{getInitial(task.assigned_to)}</span>
          </span>
        )}
        <div className="ml-1 flex space-x-1">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            title="Edit Task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            onClick={handleDeleteTask}
            className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            title="Delete Task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
