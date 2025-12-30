// src/pages/admin/AdminOtpPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/auth.context';

const AdminOtpPage = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { verifyOtp, loading, isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    // If the user is logged in as an admin, redirect to the dashboard.
    if (isLoggedIn && user?.role === 'ADMIN') {
      navigate('/admin/dashboard', { replace: true });
    }
    // If there's no email in the state (e.g., direct navigation), redirect to login.
    if (!email) {
      navigate('/admin/login', { replace: true });
    }
  }, [isLoggedIn, user, email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await verifyOtp(email, otp);
      // The useEffect above will handle the redirect
    } catch (err: any) {
      setError(err.message || 'Failed to verify OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Enter Verification Code
        </h1>
        <p className="text-sm text-center text-gray-600">
          A one-time password has been sent to{' '}
          <span className="font-medium">{email}</span>.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          <div>
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              OTP Code
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={loading}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminOtpPage;

