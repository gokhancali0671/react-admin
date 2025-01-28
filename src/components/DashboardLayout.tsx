import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Layers, FileText, Menu, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => navigate('/dashboard/users')}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Users size={20} className="mr-3" />
              <span>Users</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/levels')}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <Layers size={20} className="mr-3" />
              <span>Levels</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/content')}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <FileText size={20} className="mr-3" />
              <span>Content</span>
            </button>
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-red-600"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`transition-all duration-200 ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-4">
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="fixed top-4 left-4 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-100 z-50"
            >
              <Menu size={20} />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;