export interface Contact {
  id?: number;
  name: string;
  email: string;
  telephone: string;
  color_pattern?: string;
}

export interface Category {
  id?: number;
  title: string;
}

export interface Subtask {
  id?: number;
  description: string;
  is_completed?: boolean;
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  due_date: string;
  priority?: string;
  category: string;
  task_group?: string;
  subtasks: Subtask[];
  assigned_to: Contact[];
}
export interface User {
  id?: number;
  username?: string;
  email: string;
  first_name: string;
  last_name: string;
  contacts: Contact[];
  tasks: Task[];
}
