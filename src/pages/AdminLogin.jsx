import React, { useState, useEffect } from 'react';
import { Shield, Lock, User, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60 * 1000; // 1 minute

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Already logged in
    if (localStorage.getItem('lt_admin_auth') === 'true') {
      navigate('/Admin/Site', { replace: true });
      return;
    }

    // Check lockout
    const lockoutUntil = parseInt(sessionStorage.getItem('admin_lockout') || '0');
    if (Date.now() < lockoutUntil) {
      navigate('/Rankings', { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check lockout
    const lockoutUntil = parseInt(sessionStorage.getItem('admin_lockout') || '0');
    if (Date.now() < lockoutUntil) {
      navigate('/Rankings', { replace: true });
      return;
    }

    setLoading(true);

    const isCorrect =
      (username === 'admin' && password === 'lifetiers2024') ||
      (username === 'TierListManager' && password === 'TierListManager');

    if (isCorrect) {
      sessionStorage.removeItem('admin_attempts');
      sessionStorage.removeItem('admin_lockout');
      localStorage.setItem('lt_admin_auth', 'true');
      navigate('/Admin/Site', { replace: true });
    } else {
      const attempts = parseInt(sessionStorage.getItem('admin_attempts') || '0') + 1;
      sessionStorage.setItem('admin_attempts', String(attempts));

      if (attempts >= MAX_ATTEMPTS) {
        sessionStorage.setItem('admin_lockout', String(Date.now() + LOCKOUT_DURATION));
        sessionStorage.removeItem('admin_attempts');
        navigate('/Rankings', { replace: true });
        return;
      }

      setError(`Incorrect username or password. (${MAX_ATTEMPTS - attempts} attempt${MAX_ATTEMPTS - attempts === 1 ? '' : 's'} remaining)`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0f1117' }}>
      <div className="w-full max-w-sm rounded-xl p-8" style={{ background: '#161924', border: '1px solid #2a2d3a' }}>
        {/* Logo */}
        <div className="text-center mb-1">
          <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            LifeTiers
          </span>
        </div>
        <p className="text-center text-sm mb-6" style={{ color: '#8b8fa8' }}>Admin Login</p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8b8fa8' }} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg text-white outline-none"
              style={{ background: '#0f1117', border: '1px solid #2a2d3a' }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8b8fa8' }} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-3 rounded-lg text-white outline-none"
              style={{ background: '#0f1117', border: '1px solid #2a2d3a' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: '#8b8fa8' }}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}