import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, ExternalLink, CheckCircle, Copy, AlertCircle, Building2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../config/supabase';
import Modal from '../components/Modal';
import './Pipedrive.css';

const Pipedrive = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    apiKey: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  
  const [submittedData, setSubmittedData] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear errors when user types
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!formData.businessName.trim()) {
  //     setError('Please enter your business name');
  //     return;
  //   }
    
  //   if (!formData.apiKey.trim()) {
  //     setError('Please enter your Pipedrive API key');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     setError('');

  //     // Insert data into Supabase
  //     const { data, error: supabaseError } = await supabase
  //       .from('user_integrations')
  //       .insert([
  //         {
  //           user_id: currentUser.uid,
  //           user_email: currentUser.email,
  //           business_name: formData.businessName.trim(),
  //           pipedrive_api_key: formData.apiKey.trim(),
  //           created_at: new Date().toISOString(),
  //           updated_at: new Date().toISOString()
  //         }
  //       ])
  //       .select();

  //     if (supabaseError) {
  //       throw supabaseError;
  //     }

  //     console.log('Data saved successfully:', data);
      


  //   // After successful insert
  //   setSubmittedData({
  //     businessName: formData.businessName,
  //     apiKey: formData.apiKey,
  //   });
  //     // Clear form and show success
  //     setFormData({ businessName: '', apiKey: '' });
  //     setShowModal(true);
      
  //   } catch (error) {
      
  //       console.log("currentUser:", currentUser);
  //     console.error('Error saving to Supabase:', error);
  //     setError(error.message || 'Failed to save API key. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.businessName.trim()) {
    setError('Please enter your business name');
    return;
  }
  
  if (!formData.apiKey.trim()) {
    setError('Please enter your Pipedrive API key');
    return;
  }

  try {
    setLoading(true);
    setError('');

    // 1️⃣ Insert into Supabase
    const { data, error: supabaseError } = await supabase
      .from('user_integrations')
      .insert([
        {
          user_id: currentUser.uid,
          user_email: currentUser.email,
          business_name: formData.businessName.trim(),
          pipedrive_api_key: formData.apiKey.trim(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select();

    if (supabaseError) {
      throw supabaseError;
    }

    console.log('Data saved successfully:', data);

    // 2️⃣ Send data to your n8n webhook
    await fetch("https://n8n.srv976667.hstgr.cloud/webhook/businessname-pipedriveapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: formData.businessName.trim(),
        pipedriveApiKey: formData.apiKey.trim(),
        userId: currentUser.uid,
        userEmail: currentUser.email
      }),
    });

    // 3️⃣ After successful insert + webhook call
    setSubmittedData({
      businessName: formData.businessName,
      apiKey: formData.apiKey,
    });

    setFormData({ businessName: '', apiKey: '' });
    setShowModal(true);
    
  } catch (error) {
    console.log("currentUser:", currentUser);
    console.error('Error saving to Supabase or webhook:', error);
    setError(error.message || 'Failed to save API key. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handlePasteApiKey = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setFormData(prev => ({ ...prev, apiKey: text }));
    } catch (error) {
      console.error('Failed to paste from clipboard:', error);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Login to Pipedrive",
      description: "Go to your Pipedrive account and log in with your credentials.",
      action: "Login to Pipedrive",
      link: "https://app.pipedrive.com/auth/login"
    },
    {
      number: 2,
      title: "Navigate Personal Preferences",
      description: "Click on your profile picture in the top right corner, then select 'Personal Preferences'.",
      action: "Go to Personal Preferences"
    },
    {
      number: 3,
      title: "Find API Section",
      description: "In Personal Preferences, look for 'API' section and click on it.",
      action: "Open API Settings"
    },
    {
      number: 4,
      title: "Generate API Token",
      description: "Click on 'Generate new token'.",
      action: "Generate Token"
    },
    {
      number: 5,
      title: "Copy Your API Key",
      description: "Copy the generated API token.",
      action: "Copy API Key"
    }
  ];


  return (
    <div className="Pipedrive-container">
      {/* Header */}
      <div className="Pipedrive-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <ArrowLeft className="back-icon" />
          Back to Dashboard
        </button>
        <h1 className="Pipedrive-title">Project Setup</h1>
      </div>

      <div className="Pipedrive-content">
        {/* Step-by-step guide */}
        <div className="guide-section">
          <div className="guide-header">
            <Key className="guide-icon" />
            <div>
              <h2 className="guide-title">Connect Your Pipedrive Account</h2>
              <p className="guide-subtitle">Follow these steps to get your Pipedrive API key</p>
            </div>
          </div>

          <div className="steps-container">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className={`step-card ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
                onClick={() => setCurrentStep(step.number)}
              >
                <div className="step-number">
                  {currentStep > step.number ? (
                    <CheckCircle className="step-check" />
                  ) : (
                    step.number
                  )}
                </div>
                
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                  
                  {step.link && (
                    <a 
                      href={step.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="step-link"
                    >
                      <span>{step.action}</span>
                      <ExternalLink className="link-icon" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pro tip */}
          <div className="pro-tip">
            <AlertCircle className="tip-icon" />
            <div>
              <h4 className="tip-title">Pro Tip</h4>
              <p className="tip-text">
                Your API key is like a password - keep it secure and never share it publicly. 
                We encrypt and store it safely in our secure database.
              </p>
            </div>
          </div>
        </div>

        {/* API Key submission form */}
        <div className="form-section">
          <div className="form-card">
            <div className="form-header">
              <h3 className="form-title">Connect Your Business</h3>
              <p className="form-subtitle">Enter your business details and Pipedrive API key to get started</p>
            </div>

            {/* Error display */}
            {error && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="api-form">
              {/* Business Name Input */}
              <div className="input-group">
                <Building2 className="input-icon" />
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Your Business Name"
                  className="form-input"
                  required
                  disabled={loading}
                />
              </div>

              {/* API Key Input */}
              <div className="input-group">
                <Key className="input-icon" />
                <input
                  type="password"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleInputChange}
                  placeholder="Pipedrive API key here..."
                  className="api-input"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handlePasteApiKey}
                  className="paste-btn"
                  title="Paste from clipboard"
                  disabled={loading}
                >
                  <Copy className="paste-icon" />
                </button>
              </div>

              <button 
                type="submit" 
                className="submit-btn" 
                disabled={!formData.businessName.trim() || !formData.apiKey.trim() || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="submit-icon spinning" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <span>Connect Pipedrive</span>
                    <ArrowLeft className="submit-icon" style={{ transform: 'rotate(180deg)' }} />
                  </>
                )}
              </button>
            </form>

            <div className="security-note">
              <div className="security-icon">🔒</div>
              <p>Your API key and business data are encrypted and stored securely. We never share your information with third parties.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle className="check-icon" />
          </div>
          <h3 className="success-title">API Key Submitted Successfully!</h3>
          <p className="success-message">
            Your Pipedrive API Key for <strong>{submittedData?.businessName || 'your business'}</strong> has been submitted successfully. 
          
          </p>
          <div className="success-details">
            <div className="detail-item">
              <Building2 className="detail-icon" />
              <span>Business: {submittedData?.businessName}</span>
            </div>
            <div className="detail-item">
              <CheckCircle className="detail-icon" />
              <span>Pipedrive: {submittedData?.apiKey}</span>
            </div>
          </div>
          <button 
            onClick={() => {
              setShowModal(false);
              navigate('/dashboard');
            }}
            className="success-btn"
          >
            Continue to Dashboard
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Pipedrive;