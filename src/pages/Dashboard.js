import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, FolderOpen, BarChart3, Settings, HelpCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const dashboardItems = [
    {
      title: 'Pipe Drive',
      description: 'Whatsapp to Pipedrive Workflow',
      icon: FolderOpen,
      onClick: () => navigate('/pipedrive')
    },
    // {
    //   title: 'Analytics',
    //   description: 'View your usage statistics',
    //   icon: BarChart3,
    //   onClick: () => console.log('Analytics clicked')
    // },
    // {
    //   title: 'Settings',
    //   description: 'Configure your account',
    //   icon: Settings,
    //   onClick: () => console.log('Settings clicked')
    // },
    // {
    //   title: 'Support',
    //   description: 'Get help and documentation',
    //   icon: HelpCircle,
    //   onClick: () => console.log('Support clicked')
    // }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Welcome to NeuralFlow</h1>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="logout-icon" />
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="user-card">
          <div className="user-avatar">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" className="avatar-image" />
            ) : (
              <User className="avatar-icon" />
            )}
          </div>
          
          <div className="user-info">
            <h2 className="user-name">
              {currentUser.displayName || 'User'}
            </h2>
            <div className="user-email">
              <Mail className="email-icon" />
              {currentUser.email}
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {dashboardItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="dashboard-card clickable"
                onClick={item.onClick}
              >
                <div className="card-icon">
                  <IconComponent className="icon" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;