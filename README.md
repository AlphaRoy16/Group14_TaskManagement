# Task Management System

A modern, responsive task management application built with React and TypeScript. This system allows organizations to manage tasks efficiently with role-based access control and team collaboration features.

![Task Management Dashboard](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072)

## Features

### Authentication
- Secure user authentication system
- Role-based access (Admin/User)
- Protected routes and authorized access
- Persistent login state

### Task Management
- Create, Read, Update, and Delete (CRUD) operations
- Priority levels (High, Medium, Low)
- Task status tracking (Todo, Active, Completed)
- Due date management
- Task assignment to multiple team members

### Role-Based Permissions
- **Admin Users:**
  - Create and assign tasks
  - Delete tasks
  - View all tasks they created
  - Manage task status
  
- **Regular Users:**
  - View assigned tasks
  - Update task status
  - Track task progress

### User Interface
- Clean and modern design
- Fully responsive layout
- Interactive task cards
- Status-based task filtering
- Real-time updates

## Technology Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context
- **Build Tool:** Vite
- **Package Manager:** npm

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/task-management-system.git
```

2. Navigate to the project directory
```bash
cd task-management-system
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.tsx
│   │   └── SignupForm.tsx
│   └── Tasks/
│       ├── TaskForm.tsx
│       └── TaskList.tsx
├── context/
│   ├── AuthContext.tsx
│   └── TaskContext.tsx
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Usage

1. **Sign Up**
   - Create a new account with email and password
   - Select role (Admin/User)

2. **Login**
   - Use registered email and password
   - Access role-specific features

3. **Task Management**
   - Admins can create new tasks
   - Assign tasks to team members
   - Set priority and due dates
   - Track task status

4. **Task Updates**
   - Users can view assigned tasks
   - Update task status
   - Track progress

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/AlphaRoy16/Group14_TaskManagement](https://github.com/AlphaRoy16/Group14_TaskManagement)

## Acknowledgments

- [React Documentation](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
