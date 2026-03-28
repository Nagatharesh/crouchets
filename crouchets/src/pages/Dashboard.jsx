import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AdminDashboardView } from '../components/admin/AdminDashboardView';

export const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <AdminDashboardView />;
};
