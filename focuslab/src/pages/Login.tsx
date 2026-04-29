import React, { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isLoggedIn) navigate('/');
  }, [isLoggedIn, navigate]);

  const onSubmit = () => {
    if (!form.email.trim() || !form.password.trim()) {
      setError('Email and password are required.');
      return;
    }
    const res = login(form.email, form.password);
    if (!res.ok) setError(res.message || 'Login failed.');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to continue</p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm(s => ({ ...s, email: e.target.value }));
                if (error) setError(null);
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => {
                  setForm(s => ({ ...s, password: e.target.value }));
                  if (error) setError(null);
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-linear-to-r from-gray-900 to-gray-700 text-white py-3.5 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600"
          >
            Sign in
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-gray-700 font-medium hover:text-gray-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
