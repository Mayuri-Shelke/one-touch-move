import { useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function AuthModal({ onClose, mode = 'login' }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(mode);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Create user document if new user
      if (result._tokenResponse.isNewUser) {
        await setDoc(doc(db, 'users', result.user.uid), {
          name: result.user.displayName || 'User',
          email: result.user.email,
          role: 'user',
          createdAt: new Date(),
          serviceType: localStorage.getItem('serviceType') || null
        });
      }

      handleAuthSuccess();
    } catch (err) {
      setError(formatErrorMessage(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      if (activeTab === 'login') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const result = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        );
        
        await setDoc(doc(db, 'users', result.user.uid), {
          name: formData.name,
          email: formData.email,
          role: 'user',
          createdAt: new Date(),
          serviceType: localStorage.getItem('serviceType') || null
        });
      }
      
      handleAuthSuccess();
    } catch (err) {
      setError(formatErrorMessage(err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    const serviceType = localStorage.getItem('serviceType');
    onClose();
    
    if (serviceType) {
      navigate('/find-physio', { state: { serviceType } });
      localStorage.removeItem('serviceType');
    } else {
      navigate('/');
    }
  };

  const formatErrorMessage = (message) => {
    return message
      .replace('Firebase: ', '')
      .replace(/\(auth.*?\)\.?/, '')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={isLoading}
          >
            &times;
          </button>
        </div>

        <div className="p-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 mb-4 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-70"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5 mr-3" 
            />
            Continue with Google
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSubmit}>
            {activeTab === 'signup' && (
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            )}

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                minLength="6"
              />
              {activeTab === 'signup' && (
                <p className="text-xs text-gray-500 mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition ${
                isLoading ? 'opacity-70' : ''
              }`}
            >
              {isLoading ? 'Processing...' : activeTab === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              disabled={isLoading}
            >
              {activeTab === 'login' 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}