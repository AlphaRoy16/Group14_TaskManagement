import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../types';
import { useAuth } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdBy'>) => void;
  updateTask: (taskId: string, task: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  getTasksByStatus: (status: Task['status']) => Task[];
  getVisibleTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdBy'>) => {
    if (!user) return;

    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdBy: user.id
    };

    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId: string, updatedData: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    // Only admin can delete tasks
    if (user?.role === 'admin') {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return getVisibleTasks().filter(task => task.status === status);
  };

  const getVisibleTasks = () => {
    if (!user) return [];
    
    // Admin can see all tasks they created
    if (user.role === 'admin') {
      return tasks.filter(task => task.createdBy === user.id);
    }
    
    // Users can only see tasks assigned to them
    return tasks.filter(task => task.assignedTo.includes(user.email));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTasksByStatus, getVisibleTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};