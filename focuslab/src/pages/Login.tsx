import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthForm from '../components/auth/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout title="Log in to Focus Labs">
      <AuthForm mode="login" />
    </AuthLayout>
  );
};

export default LoginPage;
