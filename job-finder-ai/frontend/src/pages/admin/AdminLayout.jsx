// src/pages/admin/AdminLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/AdminSidebar';
import Header from './components/Header';

const AdminLayout = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('w-20');

  useEffect(() => {
    setSidebarWidth(isHovered ? 'w-64' : 'w-20');
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />
      
      {/* Content area - margin left thay đổi theo sidebar */}
      <div className={`transition-all duration-300 ease-in-out ${isHovered ? 'ml-64' : 'ml-20'}`}>
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;