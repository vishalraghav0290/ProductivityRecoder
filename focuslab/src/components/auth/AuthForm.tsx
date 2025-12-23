import React, { useState } from 'react';

type Mode = 'login' | 'signup';

type Props = {
  mode?: Mode;
};

const AuthForm: React.FC<Props> = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // navigation: this simple app uses window.location by default.
  const navigate: any = null;

  const handleSignup = () => {
    setError(null);
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }
    const users = JSON.parse(localStorage.getItem('focuslab_users') || '{}');
    if (users[email]) {
      setError('User already exists. Please login.');
      return;
    }
    users[email] = { password };
    localStorage.setItem('focuslab_users', JSON.stringify(users));
    setSuccess('Account created. You can now login.');
    setEmail('');
    setPassword('');
  if (navigate) navigate('/login'); else window.location.href = '/login';
  };

  const handleLogin = () => {
    setError(null);
    if (!email || !password) {
      setError('Please provide email and password');
      return;
    }
    const users = JSON.parse(localStorage.getItem('focuslab_users') || '{}');
    if (!users[email] || users[email].password !== password) {
      setError('Invalid credentials');
      return;
    }
    // mock login: set current user
    localStorage.setItem('focuslab_current_user', JSON.stringify({ email }));
    setSuccess('Logged in');
    setError(null);
  if (navigate) navigate('/'); else window.location.href = '/';
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    if (mode === 'login') handleLogin(); else handleSignup();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-green-600">{success}</div>}
      <label className="text-sm text-gray-700">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <label className="text-sm text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <div className="flex items-center justify-between mt-2">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          {mode === 'login' ? 'Log in' : 'Create account'}
        </button>
        <button type="button" className="text-sm text-gray-600" onClick={() => {
          if (mode === 'login') {
            if (navigate) navigate('/signup');
          } else {
            if (navigate) navigate('/login');
          }
        }}>
          {mode === 'login' ? 'Create account' : 'Have an account? Log in'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
