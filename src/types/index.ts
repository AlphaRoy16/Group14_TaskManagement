export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'active' | 'completed';
  dueDate: string;
  assignedTo: string[];
  createdBy: string;
  attachments: string[];
}