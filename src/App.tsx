import React, { useState } from 'react';
import { FileSpreadsheet, Upload, LogIn } from 'lucide-react';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStep, setCurrentStep] = useState<'login' | 'upload' | 'results'>('login');

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    if (email && password) {
      setIsLoggedIn(true);
      setCurrentStep('upload');
    }
  };

  const handleFileUpload = () => {
    setCurrentStep('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FileSpreadsheet className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-800">ExcelAnalyzer</span>
            </div>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentStep('login');
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'login' && <Login onLogin={handleLogin} />}
        {currentStep === 'upload' && <FileUpload onUploadComplete={handleFileUpload} />}
        {currentStep === 'results' && <Results />}
      </main>
    </div>
  );
}

export default App;