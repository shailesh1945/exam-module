import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Exam from './components/Exam/Exam';
import ResultPage from './components/Results/ResultPage';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #4facfe, #00f2fe)' }}>
      <BrowserRouter>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg shadow-sm sticky-top" 
             style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
          <div className="container">
            <Link className="navbar-brand fw-bold" to="/">Exam System</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item me-2">
                      <Link className="btn btn-outline-primary rounded-pill" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-primary rounded-pill" to="/register">Register</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item me-2">
                      <Link className="btn btn-success rounded-pill" to="/exam">Start Exam</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-danger rounded-pill" onClick={logout}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Page Content (no white box now) */}
        <div style={{ padding: "40px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/result/:id" element={<ResultPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
