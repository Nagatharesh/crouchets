import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminSidebar } from '../components/AdminSidebar';

export const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) return null;
  
  // If not admin, maybe redirect to login or home. 
  // Let's redirect to /login
  if (!user || user.email !== 'admin@crouchets.com') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <div className="flex-1 p-10 overflow-x-hidden overflow-y-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};
