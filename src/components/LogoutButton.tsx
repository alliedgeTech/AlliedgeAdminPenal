/* eslint-disable */
// All code here will not be checked by ESLint
import React from 'react'
import Button from './Button';

const LogoutButton: React.FC = () => {
    const handleLogout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/'; // Redirect to Login
    };
  
    return <Button
    onClick={handleLogout}
    children='Logout'
    className={` py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4`}
  /> 
  };

export default LogoutButton
