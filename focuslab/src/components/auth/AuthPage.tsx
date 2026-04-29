import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  return <Navigate to="/login" replace />;
};

export default AuthPage;