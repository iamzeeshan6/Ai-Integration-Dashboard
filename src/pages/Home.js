import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Zap, Shield, Cpu, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const { signup, login, signInWithGoogle, signInWithGithub, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    clearError(); // Clear errors when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      setLoading(true);
      clearError();

      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      clearError();
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      clearError();
      await signInWithGithub();
      navigate('/dashboard');
    } catch (error) {
      console.error('GitHub sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Background elements */}
      <div className="background-elements">
        <div className="bg-blob bg-blob-1"></div>
        <div className="bg-blob bg-blob-2"></div>
        <div className="bg-blob bg-blob-3"></div>
      </div>

      <div className="main-content">
        {/* Left side - Company branding */}
        <div className="branding-section">
          <div className="branding-content">
            {/* Logo and company name */}
            <div className="logo-section">
              <div className="logo-container">
                <Cpu className="logo-icon" />
              </div>
              <h1 className="company-name">NeuralFlow</h1>
            </div>

            {/* Hero content */}
            <h2 className="hero-title">
              The Future of
              <span className="hero-subtitle">AI Development</span>
            </h2>

            <p className="hero-description">
              Revolutionize your workflow with our cutting-edge neural processing platform. 
              Build, deploy, and scale AI solutions that adapt to tomorrow's challenges.
            </p>

            {/* Feature highlights */}
            <div className="features-list">
              <div className="feature-item">
                <Zap className="feature-icon feature-icon-cyan" />
                <span className="feature-text">Lightning-fast neural processing</span>
              </div>
              <div className="feature-item">
                <Shield className="feature-icon feature-icon-purple" />
                <span className="feature-text">Enterprise-grade security</span>
              </div>
              <div className="feature-item">
                <Sparkles className="feature-icon feature-icon-pink" />
                <span className="feature-text">Intelligent automation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="auth-section">
          <div className="auth-container">
            <div className="auth-card">
              {/* Form header */}
              <div className="auth-header">
                <h3 className="auth-title">
                  {isLogin ? 'Welcome Back' : 'Join NeuralFlow'}
                </h3>
                <p className="auth-subtitle">
                  {isLogin ? 'Sign in to your account' : 'Create your account today'}
                </p>
              </div>

              {/* Error display */}
              {error && (
                <div className="error-message">
                  <AlertCircle className="error-icon" />
                  <span>{error}</span>
                </div>
              )}

              {/* Toggle buttons */}
              <div className="auth-toggle">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    clearError();
                  }}
                  className={`toggle-btn ${isLogin ? 'active' : ''}`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    clearError();
                  }}
                  className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <div className="auth-form">
                {!isLogin && (
                  <div className="input-group">
                    <User className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required={!isLogin}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="input-group">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="input-group">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
                  </button>
                </div>

                {!isLogin && (
                  <div className="input-group">
                    <Lock className="input-icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input"
                      required={!isLogin}
                      disabled={loading}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={loading}
                >
                  <span>{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                  {!loading && <ArrowRight className="submit-icon" />}
                </button>
              </div>

              {/* Social login options */}
              <div className="social-login">
                <div className="divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">Or continue with</span>
                  <div className="divider-line"></div>
                </div>

                <div className="social-buttons">
                  <button 
                    className="social-btn" 
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                  >
                    <svg className="social-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button 
                    className="social-btn" 
                    onClick={handleGithubSignIn}
                    disabled={loading}
                  >
                    <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
