import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import AuthPage from './pages/AuthPage';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Dashboard from './pages/Dashboard';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        {/* Auth Route - redirect to analyzer if logged in */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/analyzer" replace /> : <AuthPage />} 
        />
        
        {/* Resume Analyzer - protected route */}
        <Route 
          path="/analyzer" 
          element={user ? <ResumeAnalyzer userId={user.uid} /> : <Navigate to="/" replace />} 
        />
        
        {/* Dashboard - protected route */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard userId={user.uid} /> : <Navigate to="/" replace />} 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;