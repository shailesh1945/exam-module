import React, { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/exam');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div 
      className="d-flex align-items-center justify-content-center min-vh-100" 
      style={{ background: 'linear-gradient(to right, #43e97b, #38f9d7)' }}
    >
      <div className="card shadow-lg p-4 rounded-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4" style={{ fontWeight: '600' }}>Register</h2>
        {msg && <div className="alert alert-danger">{msg}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              name="name" 
              value={form.name} 
              onChange={onChange} 
              className="form-control rounded-pill px-3 py-2" 
              placeholder="Enter your name"
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={onChange} 
              className="form-control rounded-pill px-3 py-2" 
              placeholder="Enter your email"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input 
              name="password" 
              type="password" 
              value={form.password} 
              onChange={onChange} 
              className="form-control rounded-pill px-3 py-2" 
              placeholder="Enter your password"
              required 
            />
          </div>
          <button 
            className="btn btn-primary w-100 py-2 rounded-pill" 
            type="submit"
            style={{ fontWeight: '500', fontSize: '16px' }}
          >
            Register
          </button>
        </form>
        <p className="text-center mt-3 text-muted" style={{ fontSize: '14px' }}>
          Already have an account? <a href="/login" className="text-decoration-none">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
