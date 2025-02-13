import React from 'react';
import { Task } from '../../types';
import { Clock, Flag, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

const statusColors = {
  todo: 'bg-gray-100 text-gray-800',
  active: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800'
};

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {task.title}
              </h3>
              <p className="text-gray-600 mb-4">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                className={`${statusColors[task.status]} px-3 py-1 rounded-full text-sm font-medium border-0`}
              >
                <option value="todo">To Do</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Flag size={16} className="text-gray-400" />
              <span className={`${priorityColors[task.priority]} px-2 py-1 rounded-full text-xs font-medium`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} className="text-gray-400" />
              <span>{formatDate(task.dueDate)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Users size={16} className="text-gray-400" />
              <span>{task.assignedTo.length} assignee(s)</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
            <button
              onClick={() => onEdit(task)}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Edit
            </button>
            {isAdmin && (
              <button
                onClick={() => onDelete(task.id)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};