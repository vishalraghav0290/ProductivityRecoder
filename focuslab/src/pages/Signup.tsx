import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthForm from '../components/auth/AuthForm';

const SignupPage: React.FC = () => {
  return (
    <AuthLayout title="Create your Focus Labs account">
      <AuthForm mode="signup" />
    </AuthLayout>
  );
};

export default SignupPage;
