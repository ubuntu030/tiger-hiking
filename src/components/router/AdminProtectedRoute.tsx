// src/components/router/AdminProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

const AdminProtectedRoute: React.FC = () => {
  const { isLoggedIn, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or a global spinner
  }

  // Redirect to admin login if not logged in or user is not an admin
  // I will assume the `user` object has a `role` property.
  if (!isLoggedIn || user?.role !== 'ADMIN') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If logged in as an admin, render the nested routes
  return <Outlet />;
};

export default AdminProtectedRoute;