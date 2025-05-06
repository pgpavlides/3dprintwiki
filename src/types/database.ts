// Type definitions for our database models
// Simplified version that doesn't require Supabase

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: 'not_started' | 'in_progress' | 'completed';
  due_date: string | null;
  assigned_to: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type UpdateTask = Partial<Omit<Task, 'id' | 'created_at'>>;

// Add InsertTask type
export type InsertTask = Omit<Task, 'id' | 'created_at' | 'updated_at'>;

export type Note = {
  id: string;
  title: string;
  content: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type UpdateNote = Partial<Omit<Note, 'id' | 'created_at'>>;

export type AdminMessage = {
  id: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type UpdateAdminMessage = Partial<Omit<AdminMessage, 'id' | 'created_at'>>;

// For future remote sync implementation
export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: Task;
        Insert: InsertTask;
        Update: UpdateTask;
      };
      notes: {
        Row: Note;
        Insert: Omit<Note, 'id' | 'created_at' | 'updated_at'>;
        Update: UpdateNote;
      };
      admin_messages: {
        Row: AdminMessage;
        Insert: Omit<AdminMessage, 'id' | 'created_at' | 'updated_at'>;
        Update: UpdateAdminMessage;
      };
      links: {
        Row: {
          id: string;
          title: string;
          url: string;
          description: string | null;
          category: string;
          tags: string[] | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<{
          id: string;
          title: string;
          url: string;
          description: string | null;
          category: string;
          tags: string[] | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        }, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<{
          id: string;
          title: string;
          url: string;
          description: string | null;
          category: string;
          tags: string[] | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        }, 'id' | 'created_at'>>;
      };
    };
  };
};
