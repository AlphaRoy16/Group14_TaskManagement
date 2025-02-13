import React, { useState } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { TaskForm } from './components/Tasks/TaskForm';
import { TaskList } from './components/Tasks/TaskList';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import { PlusCircle, LogOut } from 'lucide-react';
import { Task } from './types';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Created By</h3>
            <ul className="space-y-2">
              <li>Arindam Roy</li>
              <li>Aashvita</li>
              <li>Mayank Sharma</li>
              <li>Sankar Narayanan</li>
              <li>Rajnish</li>
              <li>Nick</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: group14zidio@outlook.com</li>
              <li>Phone: +91 xxxxxxxxxx</li>
              <li>Address: India</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>Twitter: @group14zidio</li>
              <li>LinkedIn: group14zidio</li>
              <li>GitHub: Group14_TaskManagement</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2024 Task Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, getTasksByStatus } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Task['status']>('todo');

  const filteredTasks = getTasksByStatus(selectedStatus);
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Management Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedStatus('todo')}
              className={`px-4 py-2 rounded-md ${
                selectedStatus === 'todo'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              To Do
            </button>
            <button
              onClick={() => setSelectedStatus('active')}
              className={`px-4 py-2 rounded-md ${
                selectedStatus === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setSelectedStatus('completed')}
              className={`px-4 py-2 rounded-md ${
                selectedStatus === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Completed
            </button>
          </div>
          
          {isAdmin && (
            <button
              onClick={() => setShowTaskForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <PlusCircle size={20} />
              New Task
            </button>
          )}
        </div>

        <TaskList
          tasks={filteredTasks}
          onEdit={(task) => {
            // Implement edit functionality
            console.log('Edit task:', task);
          }}
          onDelete={deleteTask}
          onStatusChange={(taskId, status) => updateTask(taskId, { status })}
        />

        {showTaskForm && (
          <TaskForm
            onSubmit={addTask}
            onClose={() => setShowTaskForm(false)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

const AuthPages: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <LoginForm />
          <SignupForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AuthPages />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
