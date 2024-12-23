import React from 'react';
import { Bell, LogOut, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex-1" />
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-0 right-0 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="flex items-center gap-2 border-l pl-4">
          <User className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium">Admin Usuario</span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <LogOut className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;