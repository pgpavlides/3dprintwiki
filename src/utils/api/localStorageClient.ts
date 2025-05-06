import { Task, Note, UpdateTask, UpdateNote } from '../../types/database';

// Use localStorage as a temporary database for collaborative features
// This will work without any external dependencies

// Storage keys
const STORAGE_KEYS = {
  TASKS: 'admin_tasks',
  NOTES: 'admin_notes',
  ACTIVITIES: 'admin_activities',
  LAST_SYNC: 'admin_last_sync'
};

// Activity types
export type ActivityType = 'task_added' | 'task_completed' | 'note_added' | 'note_updated';

// Activity item
export type ActivityItem = {
  id: string;
  type: ActivityType;
  timestamp: string;
  user: string;
  title: string;
  objectId: string;
};

// Generate a UUID (simplified version)
const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Initialize local storage with empty arrays if not already set
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.TASKS)) {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.NOTES)) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify([]));
  }
};

// Task methods
export const getTasks = (): Task[] => {
  initializeStorage();
  const tasksJson = localStorage.getItem(STORAGE_KEYS.TASKS) || '[]';
  return JSON.parse(tasksJson);
};

// Base task operations
export const _createTask = (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Task => {
  const tasks = getTasks();
  const now = new Date().toISOString();
  
  const newTask: Task = {
    id: generateId(),
    ...task,
    created_at: now,
    updated_at: now
  };
  
  tasks.unshift(newTask);
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  
  // Add activity
  addActivity({
    id: `task-${newTask.id}`,
    type: 'task_added',
    timestamp: now,
    user: newTask.created_by,
    title: newTask.title,
    objectId: newTask.id
  });
  
  return newTask;
};

export const _updateTask = (id: string, updates: UpdateTask): Task | null => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) return null;
  
  const task = tasks[taskIndex];
  const now = new Date().toISOString();
  
  const updatedTask: Task = {
    ...task,
    ...updates,
    updated_at: now
  };
  
  tasks[taskIndex] = updatedTask;
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  
  // Check if task was completed in this update
  if (task.status !== 'completed' && updatedTask.status === 'completed') {
    addActivity({
      id: `task-complete-${updatedTask.id}`,
      type: 'task_completed',
      timestamp: now,
      user: updatedTask.created_by,
      title: updatedTask.title,
      objectId: updatedTask.id
    });
  }
  
  return updatedTask;
};

export const _deleteTask = (id: string): boolean => {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(t => t.id !== id);
  
  if (updatedTasks.length === tasks.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(updatedTasks));
  return true;
};

// Note methods
export const getNotes = (): Note[] => {
  initializeStorage();
  const notesJson = localStorage.getItem(STORAGE_KEYS.NOTES) || '[]';
  return JSON.parse(notesJson);
};

// Base note operations
export const _createNote = (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Note => {
  const notes = getNotes();
  const now = new Date().toISOString();
  
  const newNote: Note = {
    id: generateId(),
    ...note,
    created_at: now,
    updated_at: now
  };
  
  notes.unshift(newNote);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  
  // Add activity
  addActivity({
    id: `note-${newNote.id}`,
    type: 'note_added',
    timestamp: now,
    user: newNote.created_by,
    title: newNote.title,
    objectId: newNote.id
  });
  
  return newNote;
};

export const _updateNote = (id: string, updates: UpdateNote): Note | null => {
  const notes = getNotes();
  const noteIndex = notes.findIndex(n => n.id === id);
  
  if (noteIndex === -1) return null;
  
  const note = notes[noteIndex];
  const now = new Date().toISOString();
  
  const updatedNote: Note = {
    ...note,
    ...updates,
    updated_at: now
  };
  
  notes[noteIndex] = updatedNote;
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  
  // Add activity for note update
  addActivity({
    id: `note-update-${updatedNote.id}-${Date.now()}`,
    type: 'note_updated',
    timestamp: now,
    user: updatedNote.created_by,
    title: updatedNote.title,
    objectId: updatedNote.id
  });
  
  return updatedNote;
};

export const _deleteNote = (id: string): boolean => {
  const notes = getNotes();
  const updatedNotes = notes.filter(n => n.id !== id);
  
  if (updatedNotes.length === notes.length) return false;
  
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(updatedNotes));
  return true;
};

// Activity methods
export const getActivities = (): ActivityItem[] => {
  initializeStorage();
  const activitiesJson = localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]';
  return JSON.parse(activitiesJson);
};

export const addActivity = (activity: ActivityItem): void => {
  const activities = getActivities();
  activities.unshift(activity);
  
  // Limit to 50 most recent activities
  const limitedActivities = activities.slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(limitedActivities));
};

// Event system to simulate real-time updates
const eventTarget = new EventTarget();

// Event names
export const EVENTS = {
  TASK_CREATED: 'task_created',
  TASK_UPDATED: 'task_updated',
  TASK_DELETED: 'task_deleted',
  NOTE_CREATED: 'note_created',
  NOTE_UPDATED: 'note_updated',
  NOTE_DELETED: 'note_deleted',
  ACTIVITY_ADDED: 'activity_added'
};

// Subscribe to events
export const subscribe = (event: string, callback: (data: any) => void) => {
  const handler = (e: Event) => {
    if (e instanceof CustomEvent) {
      callback(e.detail);
    }
  };
  
  eventTarget.addEventListener(event, handler);
  
  // Return unsubscribe function
  return () => {
    eventTarget.removeEventListener(event, handler);
  };
};

// Helper to dispatch events
const dispatchEvent = (name: string, data: any) => {
  eventTarget.dispatchEvent(new CustomEvent(name, { detail: data }));
};

// Event-dispatching versions of the methods
export const createTaskWithEvents = (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Task => {
  const newTask = _createTask(task);
  dispatchEvent(EVENTS.TASK_CREATED, newTask);
  dispatchEvent(EVENTS.ACTIVITY_ADDED, null);
  return newTask;
};

export const updateTaskWithEvents = (id: string, updates: UpdateTask): Task | null => {
  const updatedTask = _updateTask(id, updates);
  if (updatedTask) {
    dispatchEvent(EVENTS.TASK_UPDATED, updatedTask);
    if (updates.status === 'completed') {
      dispatchEvent(EVENTS.ACTIVITY_ADDED, null);
    }
  }
  return updatedTask;
};

export const deleteTaskWithEvents = (id: string): boolean => {
  const result = _deleteTask(id);
  if (result) {
    dispatchEvent(EVENTS.TASK_DELETED, { id });
  }
  return result;
};

export const createNoteWithEvents = (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>): Note => {
  const newNote = _createNote(note);
  dispatchEvent(EVENTS.NOTE_CREATED, newNote);
  dispatchEvent(EVENTS.ACTIVITY_ADDED, null);
  return newNote;
};

export const updateNoteWithEvents = (id: string, updates: UpdateNote): Note | null => {
  const updatedNote = _updateNote(id, updates);
  if (updatedNote) {
    dispatchEvent(EVENTS.NOTE_UPDATED, updatedNote);
    dispatchEvent(EVENTS.ACTIVITY_ADDED, null);
  }
  return updatedNote;
};

export const deleteNoteWithEvents = (id: string): boolean => {
  const result = _deleteNote(id);
  if (result) {
    dispatchEvent(EVENTS.NOTE_DELETED, { id });
  }
  return result;
};

// Export the event-dispatching versions as the default API
export const createTask = createTaskWithEvents;
export const updateTask = updateTaskWithEvents;
export const deleteTask = deleteTaskWithEvents;
export const createNote = createNoteWithEvents;
export const updateNote = updateNoteWithEvents;
export const deleteNote = deleteNoteWithEvents;
